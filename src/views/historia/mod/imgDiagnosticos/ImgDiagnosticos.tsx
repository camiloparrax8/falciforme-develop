import { useState, useEffect, useCallback } from 'react'
import FormImgDiagnosticos from './FormImgDiagnosticos'
import SectionTitle from '@/views/common/form/SectionTitle'
import TableCustom from '@/views/common/TableCustom'
import { useToken, useSessionUser } from '@/store/authStore'
import { useParams } from 'react-router-dom'
import Alert from '@/components/ui/Alert'
import {
    crearImagenDiagnostica,
    obtenerImagenesDiagnosticasPorPaciente,
    eliminarLogicamenteImagenDiagnostica,
} from '@/customService/services/imagenDiagnosticaService'

/**
 * Componente principal para la gestión de imágenes diagnósticas.
 * Maneja la visualización, creación y eliminación de registros de imágenes diagnósticas.
 */
function ImgDiagnosticos() {
    // Estados para manejar la interfaz y datos
    const { token } = useToken()
    const { user } = useSessionUser()
    const { id_paciente } = useParams()
    const [loading, setLoading] = useState(false)
    const [imagenes, setImagenes] = useState([])
    const [mensaje, setMensaje] = useState(null)
    const [mostrarMensaje, setMostrarMensaje] = useState(false)

    /**
     * Carga las imágenes diagnósticas del paciente desde el servidor.
     * Formatea las fechas y estructura los datos para la tabla.
     */
    const cargarImagenes = useCallback(async () => {
        try {
            setLoading(true)
            const resultado = await obtenerImagenesDiagnosticasPorPaciente(
                token,
                id_paciente,
            )

            if (resultado.status === 'success' && resultado.data) {
                const imagenesFormateadas = Array.isArray(resultado.data)
                    ? resultado.data.map((img, index) => {
                          const fechaOriginal = img.fecha

                          let fechaFormateada
                          if (fechaOriginal) {
                              const [año, mes, dia] = fechaOriginal
                                  .split('T')[0]
                                  .split('-')
                              fechaFormateada = `${dia}/${mes}/${año}`
                          } else {
                              fechaFormateada = 'Fecha no disponible'
                          }

                          return {
                              id: img.id,
                              Registro: resultado.data.length - index,
                              imagenDiagnostica: img.imagenes_diagnosticas,
                              fecha: fechaFormateada,
                              tipoResultado: img.tipo_resultado,
                              resultado: img.resultado,
                          }
                      })
                    : []
                setImagenes(imagenesFormateadas)
            } else {
                setImagenes([])
            }
        } catch (error) {
            console.error('Error al cargar imágenes diagnósticas:', error)
            setMensaje({
                tipo: 'error',
                texto: 'Error al cargar imágenes diagnósticas',
            })
            setMostrarMensaje(true)
        } finally {
            setLoading(false)
        }
    }, [token, id_paciente])

    useEffect(() => {
        cargarImagenes()
    }, [cargarImagenes])

    /**
     * Maneja el envío del formulario para crear una nueva imagen diagnóstica.
     * @param {Object} data - Datos del formulario
     */
    const handleFormSubmit = async (data) => {
        try {
            setLoading(true)
            const resultado = await crearImagenDiagnostica(token, {
                ...data,
                id_paciente: id_paciente,
                id_user_create: user.id,
            })

            if (resultado.status === 'success') {
                setMensaje({
                    tipo: 'success',
                    texto: 'Imagen diagnóstica guardada correctamente',
                })
                cargarImagenes()
            } else {
                setMensaje({
                    tipo: 'error',
                    texto:
                        resultado.message ||
                        'Error al guardar la imagen diagnóstica',
                })
            }
            setMostrarMensaje(true)
        } catch (error) {
            console.error('Error al guardar imagen diagnóstica:', error)
            setMensaje({
                tipo: 'error',
                texto: 'Error al guardar la imagen diagnóstica',
            })
            setMostrarMensaje(true)
        } finally {
            setLoading(false)
        }
    }

    /**
     * Maneja la eliminación lógica de una imagen diagnóstica.
     * @param {Object} imagen - Registro de imagen a eliminar
     */
    const handleEliminarImagen = async (imagen) => {
        try {
            setLoading(true)
            const resultado = await eliminarLogicamenteImagenDiagnostica(
                token,
                imagen.id,
            )

            if (resultado.status === 'success') {
                await cargarImagenes()
                setMensaje({
                    tipo: 'success',
                    texto: 'Imagen diagnóstica eliminada correctamente',
                })
                setMostrarMensaje(true)
            } else {
                setMensaje({
                    tipo: 'error',
                    texto:
                        resultado.message ||
                        'Error al eliminar la imagen diagnóstica',
                })
                setMostrarMensaje(true)
            }
        } catch (error) {
            console.error('Error al eliminar imagen diagnóstica:', error)
            setMensaje({
                tipo: 'error',
                texto: 'Error al eliminar la imagen diagnóstica',
            })
            setMostrarMensaje(true)
        } finally {
            setLoading(false)
        }
    }

    const handleCloseAlert = () => {
        setMostrarMensaje(false)
    }

    // Definición de las columnas de la tabla
    const headers = [
        'Registro',
        'imagenDiagnostica',
        'fecha',
        'tipoResultado',
        'resultado',
    ]

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            {mensaje && mostrarMensaje && (
                <div className="mb-4">
                    <Alert
                        showIcon
                        closable
                        title={
                            mensaje.tipo === 'success' ? 'Correcto' : 'Atención'
                        }
                        type={mensaje.tipo === 'success' ? 'success' : 'danger'}
                        duration={5000}
                        onClose={handleCloseAlert}
                    >
                        {mensaje.texto}
                    </Alert>
                </div>
            )}

            {/* Formulario */}
            <FormImgDiagnosticos
                loading={loading}
                onSubmit={handleFormSubmit}
            />

            {/* Tabla */}
            <section className="mt-6">
                <SectionTitle
                    text="Imágenes Cargadas"
                    className="col-span-1 md:col-span-2 lg:col-span-4"
                />

                {loading ? (
                    <div className="p-4 text-center">
                        Cargando imágenes diagnósticas...
                    </div>
                ) : imagenes.length > 0 ? (
                    <TableCustom
                        className={'mt-4'}
                        data={imagenes}
                        header={headers}
                        showDeleteOption={true}
                        onDelete={handleEliminarImagen}
                    />
                ) : (
                    <div className="p-4 text-center text-gray-500">
                        No hay imágenes diagnósticas registradas
                    </div>
                )}
            </section>
        </div>
    )
}

export default ImgDiagnosticos
