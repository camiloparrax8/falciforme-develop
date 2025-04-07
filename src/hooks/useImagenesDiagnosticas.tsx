import { useState, useCallback, useEffect } from 'react'
import { useToken, useSessionUser } from '@/store/authStore'
import {
    crearImagenDiagnostica,
    obtenerImagenesDiagnosticasPorPaciente,
    eliminarLogicamenteImagenDiagnostica,
} from '@/customService/services/imagenDiagnosticaService'

interface ImagenDiagnostica {
    id: number;
    Registro: number;
    imagenDiagnostica: string;
    fecha: string;
    tipoResultado: string;
    resultado: string;
}

interface ImagenDiagnosticaResponse {
    id: number;
    imagenes_diagnosticas: string;
    fecha: string;
    tipo_resultado: string;
    resultado: string;
}

interface Mensaje {
    tipo: 'success' | 'error';
    texto: string;
}

interface ImagenDiagnosticaHookProps {
    id_paciente: string;
}

interface FormData {
    imagenes_diagnosticas: string;
    fecha: string;
    tipo_resultado: string;
    resultado: string;
}

export const useImagenesDiagnosticas = ({ id_paciente }: ImagenDiagnosticaHookProps) => {
    const { token } = useToken()
    const { user } = useSessionUser()
    const [loading, setLoading] = useState<boolean>(false)
    const [imagenes, setImagenes] = useState<ImagenDiagnostica[]>([])
    const [mensaje, setMensaje] = useState<Mensaje | null>(null)
    const [mostrarMensaje, setMostrarMensaje] = useState<boolean>(false)

    const cargarImagenes = useCallback(async () => {
        try {
            setLoading(true)
            const resultado = await obtenerImagenesDiagnosticasPorPaciente(token, id_paciente)

            if (resultado.status === 'success' && resultado.data) {
                const imagenesFormateadas = Array.isArray(resultado.data)
                    ? resultado.data.map((img: ImagenDiagnosticaResponse, index: number) => {
                          const fechaOriginal = img.fecha
                          let fechaFormateada: string

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
                texto: 'Error al cargar imágenes diagnósticas'
            })
            setMostrarMensaje(true)
        } finally {
            setLoading(false)
        }
    }, [token, id_paciente])

    useEffect(() => {
        cargarImagenes()
    }, [cargarImagenes])

    const handleFormSubmit = async (data: FormData) => {
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
                    texto: 'Imagen diagnóstica guardada correctamente'
                })
                cargarImagenes()
            } else {
                setMensaje({
                    tipo: 'error',
                    texto: resultado.message || 'Error al guardar la imagen diagnóstica'
                })
            }
            setMostrarMensaje(true)
        } catch (error) {
            console.error('Error al guardar imagen diagnóstica:', error)
            setMensaje({
                tipo: 'error',
                texto: 'Error al guardar la imagen diagnóstica'
            })
            setMostrarMensaje(true)
        } finally {
            setLoading(false)
        }
    }

    const handleEliminarImagen = async (imagen: ImagenDiagnostica) => {
        try {
            setLoading(true)
            const resultado = await eliminarLogicamenteImagenDiagnostica(
                token,
                imagen.id
            )

            if (resultado.status === 'success') {
                await cargarImagenes()
                setMensaje({
                    tipo: 'success',
                    texto: 'Imagen diagnóstica eliminada correctamente'
                })
                setMostrarMensaje(true)
            } else {
                setMensaje({
                    tipo: 'error',
                    texto: resultado.message || 'Error al eliminar la imagen diagnóstica'
                })
                setMostrarMensaje(true)
            }
        } catch (error) {
            console.error('Error al eliminar imagen diagnóstica:', error)
            setMensaje({
                tipo: 'error',
                texto: 'Error al eliminar la imagen diagnóstica'
            })
            setMostrarMensaje(true)
        } finally {
            setLoading(false)
        }
    }

    const handleCloseAlert = () => {
        setMostrarMensaje(false)
    }

    const headers = [
        'Registro',
        'imagenDiagnostica',
        'fecha',
        'tipoResultado',
        'resultado',
    ]

    return {
        // Estados
        loading,
        imagenes,
        mensaje,
        mostrarMensaje,
        headers,
        
        // Métodos
        handleFormSubmit,
        handleEliminarImagen,
        handleCloseAlert
    }
}
