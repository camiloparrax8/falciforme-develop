/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm } from 'react-hook-form'
import Button from '@/components/ui/Button'
import validationPrimeraConsulta from '@/validation/validationIngreso'
import SectionTitle from '@/views/common/form/SectionTitle'
import InputForm from '@/views/common/form/InputForm'
import InputDatePickerForm from '@/views/common/form/InputDate'
import {
    crearPrimeraConsulta,
    BuscarIngreso,
    // La función actualizarPrimeraConsulta se usa a través del hook useUpdatePrimeraConsulta
} from '@/customService/services/ingresoService'
import { useToken, useSessionUser } from '@/store/authStore'
import { useEffect, useState, useCallback } from 'react'
import Alert from '@/components/ui/Alert'
import Tag from '@/components/ui/Tag'
import { useUpdatePrimeraConsulta } from '@/hooks/useUpdatePrimeraConsulta'

// Para depuración
/* eslint-disable @typescript-eslint/no-unused-vars */

// Configuración de síntomas, igual que en InfoDatosIngreso
const sintomasConfig = {
    anemia: { nombre: 'Anemia', color: 'indigo' },
    fatiga: { nombre: 'Fatiga', color: 'gray' },
    palidez: { nombre: 'Palidez', color: 'gray' },
    dolor_oseo: { nombre: 'Dolor óseo', color: 'indigo' },
    dactilitis: { nombre: 'Dactilitis', color: 'indigo' },
    infecciones: { nombre: 'Infecciones', color: 'red' },
    dificultad_respiratoria: {
        nombre: 'Dificultad respiratoria',
        color: 'yellow',
    },
    ictericia: { nombre: 'Ictericia', color: 'red' },
    ictericia_osea: { nombre: 'Ictericia ósea', color: 'red' },
}

interface EditPrimeraConsultaProps {
    idPaciente: number
    onClose?: () => void
}

function EditPrimeraConsulta({
    idPaciente,
    onClose,
}: EditPrimeraConsultaProps) {
    const { token } = useToken()
    const { user } = useSessionUser()
    const [loading, setLoading] = useState(false)
    const [mensajes, setMensajes] = useState([])
    const [existePrimeraConsulta, setExistePrimeraConsulta] = useState(false)
    const [primeraConsultaData, setPrimeraConsultaData] = useState(null)
    const [errorConsulta, setErrorConsulta] = useState(null)

    const { actualizarConsulta } = useUpdatePrimeraConsulta({
        onSuccess: () => {
            // Recargar datos después de actualizar
            cargarPrimeraConsulta()
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
        setValue,
    } = useForm({
        defaultValues: {
            fecha_hematologica: '',
            edad_consulta: '',
            fecha_inicio_sintoma: '',
            parentescos_multiples: [],
        },
    })

    // Cargar primera consulta existente
    const cargarPrimeraConsulta = useCallback(async () => {
        if (!idPaciente || !token) {
            console.log('No se puede buscar sin ID de paciente o token')
            return
        }

        try {
            setLoading(true)
            setErrorConsulta(null)
            // Buscar primera consulta para paciente
            const response = await BuscarIngreso(token, idPaciente)
            // Procesar respuesta

            // Verificar si tenemos datos, ya sea como objeto o como array
            const tieneConsulta =
                response &&
                response.data &&
                // Si es un objeto con ID
                ((typeof response.data === 'object' &&
                    !Array.isArray(response.data) &&
                    response.data.id) ||
                    // O si es un array con elementos
                    (Array.isArray(response.data) && response.data.length > 0))

            if (tieneConsulta) {
                // Determinar los datos dependiendo de si es objeto o array
                const datos = Array.isArray(response.data)
                    ? response.data[0]
                    : response.data

                // Primera consulta encontrada
                setExistePrimeraConsulta(true)
                setPrimeraConsultaData(datos)

                // Formatear fechas para el componente DatePicker
                // El DatePicker espera objetos Date para funcionar correctamente
                let fechaHematologica = null
                let fechaInicioSintoma = null

                // Si hay fecha_hematologica, convertirla a objeto Date
                if (datos.fecha_hematologica) {
                    try {
                        fechaHematologica = new Date(datos.fecha_hematologica)
                        if (isNaN(fechaHematologica.getTime())) {
                            // Fecha hematológica inválida
                            fechaHematologica = null
                        }
                    } catch (e) {
                        // Error al convertir fecha_hematologica
                        fechaHematologica = null
                    }
                }

                // Si hay fecha_inicio_sintoma, convertirla a objeto Date
                if (datos.fecha_inicio_sintoma) {
                    try {
                        fechaInicioSintoma = new Date(
                            datos.fecha_inicio_sintoma,
                        )
                        if (isNaN(fechaInicioSintoma.getTime())) {
                            // Fecha inicio síntoma inválida
                            fechaInicioSintoma = null
                        }
                    } catch (e) {
                        // Error al convertir fecha_inicio_sintoma
                        fechaInicioSintoma = null
                    }
                }

                // Procesar edad_consulta
                const edadConsulta = datos.edad_consulta
                    ? datos.edad_consulta.toString()
                    : ''

                // Procesar parentescos_multiples (asegurarse de que sea un array)
                let parentescos = []
                if (datos.parentescos_multiples) {
                    if (Array.isArray(datos.parentescos_multiples)) {
                        parentescos = datos.parentescos_multiples
                    } else if (
                        typeof datos.parentescos_multiples === 'string'
                    ) {
                        // Intentar parsear si es un string JSON
                        try {
                            parentescos = JSON.parse(
                                datos.parentescos_multiples,
                            )
                        } catch (e) {
                            // Error al parsear parentescos_multiples
                            parentescos = [datos.parentescos_multiples] // Convertir a array si es un string simple
                        }
                    } else if (
                        typeof datos.parentescos_multiples === 'object'
                    ) {
                        // Si es un objeto pero no un array, convertirlo a array
                        parentescos = [datos.parentescos_multiples]
                    }
                }

                // Actualizar formulario con datos procesados

                // Actualizar el formulario con los datos existentes
                reset({
                    fecha_hematologica: fechaHematologica,
                    edad_consulta: edadConsulta,
                    fecha_inicio_sintoma: fechaInicioSintoma,
                    parentescos_multiples: parentescos,
                })

                // Mostrar mensaje de éxito
                setMensajes([
                    {
                        status: 'success',
                        message:
                            'Datos de primera consulta cargados correctamente',
                    },
                ])

                // Ocultar mensaje después de 3 segundos
                setTimeout(() => {
                    setMensajes([])
                }, 3000)
            } else {
                // No se encontró primera consulta
                setExistePrimeraConsulta(false)
                setPrimeraConsultaData(null)

                // Mostrar mensaje informativo
                setMensajes([
                    {
                        status: 'error',
                        message:
                            'No existe una primera consulta para este paciente',
                    },
                ])

                // Eliminar mensaje automáticamente después de 3 segundos
                setTimeout(() => {
                    setMensajes([])
                }, 3000)

                // Reiniciar el formulario
                reset({
                    fecha_hematologica: '',
                    edad_consulta: '',
                    fecha_inicio_sintoma: '',
                    parentescos_multiples: [],
                })
            }
        } catch (e) {
            // Error al cargar primera consulta
            setErrorConsulta(e)
            setMensajes([
                {
                    status: 'error',
                    message: 'Error al cargar los datos de la primera consulta',
                },
            ])

            // Eliminar mensaje automáticamente
            setTimeout(() => {
                setMensajes([])
            }, 2000)
        } finally {
            setLoading(false)
        }
    }, [idPaciente, token, reset])

    // Forzar carga cada vez que cambia idPaciente
    useEffect(() => {
        if (idPaciente) {
            cargarPrimeraConsulta()
        }
    }, [idPaciente, cargarPrimeraConsulta])

    // Agregar las líneas necesarias para obtener watchedValues pero eliminar toda la depuración
    const watchedValues = watch()

    const onSubmit = async (data) => {
        try {
            setLoading(true)
            setMensajes([])

            if (!idPaciente) {
                setMensajes([
                    { status: 'error', message: 'ID de paciente no válido' },
                ])

                // Eliminar mensaje automáticamente
                setTimeout(() => {
                    setMensajes([])
                }, 2000)
                return
            }

            const datos = {
                fecha_hematologica: data.fecha_hematologica || null,
                edad_consulta: data.edad_consulta
                    ? parseInt(data.edad_consulta)
                    : null,
                fecha_inicio_sintoma: data.fecha_inicio_sintoma || null,
                parentescos_multiples: data.parentescos_multiples || [],
            }

            if (existePrimeraConsulta && primeraConsultaData) {
                // Actualizar primera consulta existente
                await actualizarConsulta({
                    id: primeraConsultaData.id,
                    ...datos,
                })

                // El manejo de mensajes lo hace el hook useUpdatePrimeraConsulta
            } else {
                // Crear nueva primera consulta
                const response = await crearPrimeraConsulta(
                    token,
                    user.id,
                    idPaciente,
                    datos,
                )

                if (response.status === 'success') {
                    setMensajes([
                        {
                            status: 'success',
                            message: 'Primera consulta agregada con éxito',
                        },
                    ])

                    // Mensaje desaparecerá automáticamente
                    setTimeout(() => {
                        setMensajes([])
                    }, 2000)

                    cargarPrimeraConsulta()

                    if (onClose) {
                        setTimeout(() => onClose(), 1500)
                    }
                } else {
                    setMensajes([
                        {
                            status: 'error',
                            message:
                                response.message ||
                                'Error al guardar la primera consulta',
                        },
                    ])

                    // Eliminar mensaje automáticamente
                    setTimeout(() => {
                        setMensajes([])
                    }, 2000)
                }
            }
        } catch (e) {
            // Error al procesar la primera consulta
            setMensajes([
                {
                    status: 'error',
                    message: 'Error al procesar la primera consulta',
                },
            ])

            // Eliminar mensaje automáticamente
            setTimeout(() => {
                setMensajes([])
            }, 2000)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col h-full">
            <SectionTitle
                text={
                    existePrimeraConsulta
                        ? 'Actualizar Primera Consulta'
                        : 'Registrar Primera Consulta'
                }
                className="mb-4"
            />

            <form
                className="flex flex-col h-full"
                onSubmit={handleSubmit(onSubmit)}
            >
                {/* Alertas */}
                {mensajes.length > 0 && (
                    <div className="mb-4">
                        {mensajes.map((msg, index) => (
                            <Alert
                                key={index}
                                showIcon
                                closable
                                title={
                                    msg.status === 'error'
                                        ? 'Atención'
                                        : 'Correcto'
                                }
                                type={
                                    msg.status === 'error'
                                        ? 'danger'
                                        : 'success'
                                }
                                duration={3000}
                            >
                                {msg.message}
                            </Alert>
                        ))}
                    </div>
                )}

                <div className="max-h-96 overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                        <InputDatePickerForm
                            control={control}
                            name="fecha_hematologica"
                            rules={validationPrimeraConsulta?.fechaHematologica}
                            errors={errors}
                            label="Fecha Hematológica"
                            placeholder="Seleccione fecha"
                            className="col-span-1"
                            disabled={false}
                        />

                        <InputForm
                            control={control}
                            name="edad_consulta"
                            rules={validationPrimeraConsulta?.edadConsulta}
                            errors={errors}
                            label="Edad en la consulta (años)"
                            inputPlaceholder="Edad"
                            className="col-span-1"
                            value=""
                        />

                        <InputDatePickerForm
                            control={control}
                            name="fecha_inicio_sintoma"
                            rules={
                                validationPrimeraConsulta?.fechaInicioSintoma
                            }
                            errors={errors}
                            label="Fecha de inicio de síntomas"
                            placeholder="Seleccione fecha"
                            className="col-span-1"
                            disabled={false}
                        />

                        <div className="col-span-2">
                            <label className="block text-sm font-bold mb-1">
                                Síntomas
                            </label>

                            <div className="mt-2">
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {Object.keys(sintomasConfig).map((key) => {
                                        const config = sintomasConfig[key]
                                        const isSelected =
                                            Array.isArray(
                                                watchedValues.parentescos_multiples,
                                            ) &&
                                            watchedValues.parentescos_multiples.includes(
                                                key,
                                            )

                                        return (
                                            <div
                                                key={key}
                                                className={`cursor-pointer ${
                                                    isSelected
                                                        ? 'ring-2 ring-blue-500 rounded-md'
                                                        : ''
                                                }`}
                                                onClick={() => {
                                                    // Obtener el valor actual de parentescos_multiples
                                                    const currentValues =
                                                        Array.isArray(
                                                            watchedValues.parentescos_multiples,
                                                        )
                                                            ? [
                                                                  ...watchedValues.parentescos_multiples,
                                                              ]
                                                            : []

                                                    // Agregar o quitar el valor dependiendo de si ya está seleccionado
                                                    let newValues
                                                    if (isSelected) {
                                                        newValues =
                                                            currentValues.filter(
                                                                (item) =>
                                                                    item !==
                                                                    key,
                                                            )
                                                    } else {
                                                        newValues = [
                                                            ...currentValues,
                                                            key,
                                                        ]
                                                    }

                                                    // Actualizar el formulario
                                                    setValue(
                                                        'parentescos_multiples',
                                                        newValues,
                                                    )
                                                }}
                                            >
                                                <Tag
                                                    className={`text-${config.color}-600 bg-${config.color}-100 dark:text-${config.color}-100 dark:bg-${config.color}-500/20 border-0`}
                                                >
                                                    {config.nombre}
                                                    {isSelected && ' ✓'}
                                                </Tag>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Botón */}
                <div className="flex justify-end mt-6">
                    <Button type="submit" disabled={loading}>
                        {loading
                            ? 'Procesando...'
                            : existePrimeraConsulta
                              ? 'Actualizar'
                              : 'Guardar'}
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default EditPrimeraConsulta
