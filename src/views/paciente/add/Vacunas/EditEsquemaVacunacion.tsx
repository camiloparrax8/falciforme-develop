/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm } from 'react-hook-form'
import Button from '@/components/ui/Button'
import validationVacunas from '@/validation/validationVacunas'
import SectionTitle from '@/views/common/form/SectionTitle'
import InputForm from '@/views/common/form/InputForm'
import InputSelect from '@/views/common/form/InputSelect'
import InputDatePickerForm from '@/views/common/form/InputDate'
import {
    crearEsquemaVacunas,
    obtenerVacunasPaciente,
    inputVacunas,
} from '@/customService/services/vacunasService'
import { useToken, useSessionUser } from '@/store/authStore'
import { useEffect, useState, useRef } from 'react'
import Alert from '@/components/ui/Alert'
import { useUpdateEsquemaVacunacion } from '@/hooks/useUpdateEsquemaVacunacion'

interface EditEsquemaVacunacionProps {
    idPaciente: number
    onClose?: () => void
}

function EditEsquemaVacunacion({
    idPaciente,
    onClose,
}: EditEsquemaVacunacionProps) {
    const { token } = useToken()
    const { user } = useSessionUser()
    const [loading, setLoading] = useState(false)
    const [mensaje, setMensaje] = useState(null)
    const [vacunasOptions, setVacunasOptions] = useState([])
    const [esquemaVacunacion, setEsquemaVacunacion] = useState([])
    const [modoEdicion, setModoEdicion] = useState(false)
    const [esquemaEditando, setEsquemaEditando] = useState(null)

    // Referencias para scroll
    const formRef = useRef(null)
    const tablaRef = useRef(null)
    const containerRef = useRef(null)

    const { actualizarEsquema, loading: loadingUpdate } =
        useUpdateEsquemaVacunacion({
            onSuccess: () => {
                cargarDatos()
                resetearFormulario()
                if (onClose) {
                    setTimeout(() => onClose(), 1500)
                }
            },
        })

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
        watch,
    } = useForm({
        defaultValues: {
            id_vacunacion: '',
            estado: 'completado',
            fecha_vacunacion: '',
            dosis: '',
        },
    })

    const idVacunacionActual = watch('id_vacunacion')

    const resetearFormulario = () => {
        reset({
            id_vacunacion: '',
            estado: 'completado',
            fecha_vacunacion: '',
            dosis: '',
        })
        setModoEdicion(false)
        setEsquemaEditando(null)
    }

    // Cargar esquema de vacunación y lista de vacunas
    const cargarDatos = async () => {
        try {
            setLoading(true)

            // Obtener lista de vacunas
            const vacunasResponse = await inputVacunas(token)

            if (vacunasResponse && vacunasResponse.data) {
                // Los datos ya vienen en formato de opciones para el select
                setVacunasOptions(vacunasResponse.data)
            } else {
                console.log('No se pudieron cargar las vacunas')
            }

            // Obtener esquema de vacunación del paciente
            const esquemaResponse = await obtenerVacunasPaciente(
                token,
                idPaciente,
            )

            if (esquemaResponse && esquemaResponse.data) {
                // Comprobar si la respuesta es un array
                if (Array.isArray(esquemaResponse.data)) {
                    setEsquemaVacunacion(esquemaResponse.data)
                } else {
                    console.error(
                        'Esquema recibido no es un array:',
                        esquemaResponse.data,
                    )
                    setEsquemaVacunacion([])
                }
            } else {
                setEsquemaVacunacion([])
            }

            // Mostrar mensaje cuando no hay esquema de vacunación
            if (!esquemaResponse.data || esquemaResponse.data.length === 0) {
                setMensaje({
                    status: 'error',
                    message:
                        'No existe un esquema de vacunación para este paciente',
                })

                // Eliminar mensaje automáticamente después de 3 segundos
                setTimeout(() => {
                    setMensaje(null)
                }, 3000)
            }
        } catch (error) {
            console.error('Error al cargar datos:', error)
            // Error al cargar datos de vacunación
            setMensaje({
                status: 'error',
                message: 'Error al cargar datos de vacunación',
            })

            // Eliminar mensaje automáticamente
            setTimeout(() => {
                setMensaje(null)
            }, 3000)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (idPaciente && token) {
            cargarDatos()
        }
    }, [idPaciente, token])

    // Formatear fecha en formato YYYY-MM-DD para el backend
    // No necesitamos compensar porque el problema está en el back (línea 64-70 de esquemaVacunacionService.js)
    const formatearFechaParaAPI = (fecha) => {
        if (!fecha) return null

        try {
            // Si es objeto Date, convertir a YYYY-MM-DD
            if (fecha instanceof Date) {
                const year = fecha.getFullYear()
                const month = String(fecha.getMonth() + 1).padStart(2, '0')
                const day = String(fecha.getDate()).padStart(2, '0')
                return `${year}-${month}-${day}`
            }

            // Si ya es string en formato YYYY-MM-DD, devolverlo tal cual
            if (
                typeof fecha === 'string' &&
                fecha.match(/^\d{4}-\d{2}-\d{2}$/)
            ) {
                return fecha
            }

            console.error('Formato de fecha no soportado:', fecha)
            return null
        } catch (error) {
            console.error('Error al formatear fecha:', error)
            return null
        }
    }

    const onSubmit = async (data) => {
        try {
            setLoading(true)
            setMensaje(null)

            if (!idPaciente) {
                setMensaje({
                    status: 'error',
                    message: 'ID de paciente no válido',
                })
                setTimeout(() => setMensaje(null), 3000)
                return
            }

            // Convertir la fecha al formato correcto para la API (YYYY-MM-DD)
            const fechaFormateada = formatearFechaParaAPI(data.fecha_vacunacion)

            // Convertir dosis a número entero
            const dosisNumerica = data.dosis ? parseInt(data.dosis, 10) : null

            if (modoEdicion && esquemaEditando) {
                // Verificar que el esquema tenga un ID válido
                if (!esquemaEditando.id) {
                    console.error(
                        'Error: ID de esquema no válido',
                        esquemaEditando,
                    )
                    setMensaje({
                        status: 'error',
                        message: 'Error: ID de esquema no válido',
                    })
                    setTimeout(() => setMensaje(null), 3000)
                    return
                }

                // Actualizar esquema existente
                const datosActualizacion = {
                    id: esquemaEditando.id,
                    estado: 'completado',
                    fecha_vacunacion: fechaFormateada,
                    dosis: dosisNumerica,
                    id_user_update: user.id,
                    id_vacunacion: data.id_vacunacion
                        ? parseInt(data.id_vacunacion, 10)
                        : undefined,
                }

                try {
                    const resultado =
                        await actualizarEsquema(datosActualizacion)

                    // Verificar si la respuesta es válida
                    if (resultado && resultado.status === 'success') {
                        setMensaje({
                            status: 'success',
                            message:
                                'Esquema de vacunación actualizado con éxito',
                        })
                        setTimeout(() => setMensaje(null), 3000)
                        await cargarDatos()
                        resetearFormulario()
                    } else {
                        // Si no hay éxito, mostrar mensaje de error
                        setMensaje({
                            status: 'error',
                            message:
                                resultado?.message ||
                                'Error desconocido al actualizar',
                        })
                        setTimeout(() => setMensaje(null), 3000)
                    }
                } catch (errorActualizar) {
                    console.error(
                        'Error al actualizar esquema:',
                        errorActualizar,
                    )
                    setMensaje({
                        status: 'error',
                        message: 'Error al actualizar el esquema de vacunación',
                    })
                    setTimeout(() => setMensaje(null), 3000)
                }
            } else {
                // Crear nuevo esquema
                const datosCreacion = {
                    id_paciente: idPaciente,
                    id_vacunacion: data.id_vacunacion,
                    estado: 'completado', // Valor fijo
                    fecha_vacunacion: fechaFormateada,
                    dosis: dosisNumerica,
                    id_user_create: user.id,
                }

                const response = await crearEsquemaVacunas(
                    token,
                    user.id,
                    datosCreacion,
                )

                if (response.status === 'success') {
                    setMensaje({
                        status: 'success',
                        message: 'Esquema de vacunación agregado con éxito',
                    })

                    // Eliminar mensaje automáticamente
                    setTimeout(() => {
                        setMensaje(null)
                    }, 3000)

                    cargarDatos()
                    resetearFormulario()
                } else {
                    setMensaje({
                        status: 'error',
                        message:
                            response.message ||
                            'Error al guardar el esquema de vacunación',
                    })

                    // Eliminar mensaje automáticamente
                    setTimeout(() => {
                        setMensaje(null)
                    }, 3000)
                }
            }
        } catch (error) {
            console.error('Error en submit:', error)
            setMensaje({
                status: 'error',
                message: 'Error al procesar el esquema de vacunación',
            })

            // Eliminar mensaje automáticamente
            setTimeout(() => {
                setMensaje(null)
            }, 3000)
        } finally {
            setLoading(false)
        }
    }

    // Comprobar si las opciones de vacunas son válidas
    const opcionesVacunasValidas =
        Array.isArray(vacunasOptions) && vacunasOptions.length > 0

    // Función para seleccionar una vacuna para editar
    const seleccionarVacunaParaEditar = (esquema) => {
        if (!esquema) return

        setEsquemaEditando(esquema)
        setModoEdicion(true)

        // Convertir fecha de string a objeto Date para el datepicker
        let fechaVacunacion = null

        if (esquema.fecha) {
            try {
                // La fecha viene como DD/MM/YYYY del backend
                if (esquema.fecha.includes('/')) {
                    const [dia, mes, anio] = esquema.fecha.split('/')
                    fechaVacunacion = new Date(
                        parseInt(anio),
                        parseInt(mes) - 1,
                        parseInt(dia),
                    )
                } else {
                    fechaVacunacion = new Date(esquema.fecha)
                }

                if (isNaN(fechaVacunacion.getTime())) {
                    console.error('Fecha inválida:', esquema.fecha)
                    fechaVacunacion = null
                }
            } catch (e) {
                console.error('Error al parsear fecha:', e)
                fechaVacunacion = null
            }
        }

        // Actualizar el formulario con los datos existentes
        reset({
            id_vacunacion: esquema.id_vacunacion
                ? esquema.id_vacunacion.toString()
                : '',
            estado: 'completado', // Valor fijo
            fecha_vacunacion: fechaVacunacion,
            dosis: esquema.dosis ? esquema.dosis.toString() : '',
        })
    }

    // Función para cancelar la edición
    const cancelarEdicion = () => {
        resetearFormulario()
    }

    // Función para scroll hacia el formulario
    const scrollToForm = () => {
        if (containerRef.current) {
            containerRef.current.scrollTop = 0
        }
    }

    // Función para scroll hacia la tabla
    const scrollToTable = () => {
        if (tablaRef.current && containerRef.current) {
            const offset = tablaRef.current.offsetTop
            containerRef.current.scrollTop = offset - 20 // 20px de margen para mejor visualización
        }
    }

    return (
        <div
            ref={containerRef}
            style={{
                height: '520px' /* Altura fija en lugar de maxHeight */,
                overflowY: 'scroll' /* Forzar scroll vertical */,
                display: 'flex',
                flexDirection: 'column',
                padding: '4px',
            }}
        >
            {mensaje && (
                <Alert
                    showIcon
                    closable
                    title={mensaje.status === 'error' ? 'Atención' : 'Correcto'}
                    type={mensaje.status === 'error' ? 'danger' : 'success'}
                    duration={3000}
                    onClose={() => setMensaje(null)}
                >
                    {mensaje.message}
                </Alert>
            )}

            {/* Formulario ultra-compacto */}
            <div ref={formRef} style={{ flexShrink: 0, marginBottom: '8px' }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div
                        style={{
                            marginBottom: '8px',
                            fontWeight: 'bold',
                            fontSize: '14px',
                        }}
                    >
                        {modoEdicion
                            ? 'Editar Esquema de Vacunación'
                            : 'Gestión de Esquema de Vacunación'}
                    </div>

                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: '8px',
                            marginBottom: '8px',
                        }}
                    >
                        <div>
                            <InputSelect
                                control={control}
                                name="id_vacunacion"
                                validation={validationVacunas?.idVacunacion}
                                errors={errors}
                                label="Vacuna"
                                placeholder="Seleccione vacuna"
                                className=""
                                options={
                                    opcionesVacunasValidas ? vacunasOptions : []
                                }
                                disabled={!opcionesVacunasValidas}
                            />
                        </div>

                        <div>
                            <InputDatePickerForm
                                control={control}
                                name="fecha_vacunacion"
                                rules={validationVacunas?.fechaVacunacion}
                                errors={errors}
                                label="Fecha de Vacunación"
                                placeholder="Seleccione fecha"
                                className=""
                                disabled={false}
                            />
                        </div>

                        <div>
                            <InputForm
                                control={control}
                                name="dosis"
                                rules={{
                                    ...validationVacunas?.dosis,
                                    pattern: {
                                        value: /^[0-9]+$/,
                                        message: 'Ingrese solo números enteros',
                                    },
                                }}
                                errors={errors}
                                label="Dosis"
                                inputPlaceholder="Número de dosis"
                                className=""
                                value=""
                            />
                        </div>
                    </div>

                    {/* Botones */}
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            gap: '8px',
                            marginBottom: '8px',
                        }}
                    >
                        {modoEdicion && (
                            <Button
                                variant="default"
                                type="button"
                                disabled={loading || loadingUpdate}
                                onClick={cancelarEdicion}
                            >
                                Cancelar
                            </Button>
                        )}
                        <Button
                            type="submit"
                            disabled={
                                loading ||
                                loadingUpdate ||
                                (!modoEdicion && !opcionesVacunasValidas)
                            }
                        >
                            {loading || loadingUpdate
                                ? 'Procesando...'
                                : modoEdicion
                                  ? 'Actualizar'
                                  : 'Guardar'}
                        </Button>
                    </div>
                </form>
            </div>

            {/* Tabla ultra-compacta */}
            <div
                ref={tablaRef}
                style={{
                    marginBottom: '8px',
                    fontWeight: 'bold',
                    fontSize: '14px',
                }}
            >
                Esquema de Vacunación Actual
            </div>

            <div
                style={{
                    flexGrow: 1,
                    overflow: 'auto',
                    maxHeight: '200px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '4px',
                }}
            >
                {esquemaVacunacion && esquemaVacunacion.length > 0 ? (
                    <table
                        style={{ width: '100%', borderCollapse: 'collapse' }}
                    >
                        <thead
                            style={{
                                position: 'sticky',
                                top: 0,
                                backgroundColor: '#f9fafb',
                                zIndex: 1,
                            }}
                        >
                            <tr>
                                <th
                                    style={{
                                        padding: '6px 8px',
                                        textAlign: 'left',
                                        borderBottom: '1px solid #e5e7eb',
                                        fontSize: '12px',
                                    }}
                                >
                                    Vacuna
                                </th>
                                <th
                                    style={{
                                        padding: '6px 8px',
                                        textAlign: 'left',
                                        borderBottom: '1px solid #e5e7eb',
                                        fontSize: '12px',
                                    }}
                                >
                                    Estado
                                </th>
                                <th
                                    style={{
                                        padding: '6px 8px',
                                        textAlign: 'left',
                                        borderBottom: '1px solid #e5e7eb',
                                        fontSize: '12px',
                                    }}
                                >
                                    Fecha
                                </th>
                                <th
                                    style={{
                                        padding: '6px 8px',
                                        textAlign: 'left',
                                        borderBottom: '1px solid #e5e7eb',
                                        fontSize: '12px',
                                    }}
                                >
                                    Dosis
                                </th>
                                <th
                                    style={{
                                        padding: '6px 8px',
                                        textAlign: 'center',
                                        borderBottom: '1px solid #e5e7eb',
                                        fontSize: '12px',
                                    }}
                                >
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {esquemaVacunacion.map((esquema) => {
                                if (!esquema) return null

                                const estaEditando =
                                    modoEdicion &&
                                    esquemaEditando &&
                                    esquemaEditando.id === esquema.id

                                return (
                                    <tr
                                        key={esquema.id || 'unknown'}
                                        style={{
                                            backgroundColor: estaEditando
                                                ? '#eff6ff'
                                                : 'white',
                                        }}
                                    >
                                        <td
                                            style={{
                                                padding: '6px 8px',
                                                borderBottom:
                                                    '1px solid #e5e7eb',
                                                fontSize: '12px',
                                            }}
                                        >
                                            {esquema.nombre || 'Desconocida'}
                                        </td>
                                        <td
                                            style={{
                                                padding: '6px 8px',
                                                borderBottom:
                                                    '1px solid #e5e7eb',
                                                fontSize: '12px',
                                            }}
                                        >
                                            {'Aplicada'}
                                        </td>
                                        <td
                                            style={{
                                                padding: '6px 8px',
                                                borderBottom:
                                                    '1px solid #e5e7eb',
                                                fontSize: '12px',
                                            }}
                                        >
                                            {esquema.fecha || 'N/A'}
                                        </td>
                                        <td
                                            style={{
                                                padding: '6px 8px',
                                                borderBottom:
                                                    '1px solid #e5e7eb',
                                                fontSize: '12px',
                                            }}
                                        >
                                            {esquema.dosis || 'N/A'}
                                        </td>
                                        <td
                                            style={{
                                                padding: '6px 8px',
                                                borderBottom:
                                                    '1px solid #e5e7eb',
                                                textAlign: 'center',
                                            }}
                                        >
                                            <Button
                                                size="sm"
                                                disabled={estaEditando}
                                                onClick={() =>
                                                    seleccionarVacunaParaEditar(
                                                        esquema,
                                                    )
                                                }
                                            >
                                                {estaEditando
                                                    ? 'Editando...'
                                                    : 'Editar'}
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                ) : (
                    <div
                        style={{
                            padding: '16px',
                            textAlign: 'center',
                            color: '#6b7280',
                        }}
                    >
                        No hay esquema de vacunación registrado para este
                        paciente
                    </div>
                )}
            </div>
        </div>
    )
}

export default EditEsquemaVacunacion
