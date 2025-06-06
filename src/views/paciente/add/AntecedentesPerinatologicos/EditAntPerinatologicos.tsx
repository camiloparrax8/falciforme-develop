import { useForm } from 'react-hook-form'
import Button from '@/components/ui/Button'
import validationAntecedentesPerinatologicos from '@/validation/validationAntecedentesPerinatologicos'
import SectionTitle from '@/views/common/form/SectionTitle'
import InputForm from '@/views/common/form/InputForm'
import InputSelect from '@/views/common/form/InputSelect'
import {
    CrearPerinatologico,
    BuscarPerinatologicos,
} from '@/customService/services/perinatologicasService'
import { useToken, useSessionUser } from '@/store/authStore'
import { useEffect, useState, useCallback } from 'react'
import Alert from '@/components/ui/Alert'
import { useUpdateAntecedentesPerinatologicos } from '@/hooks/useUpdateAntecedentesPerinatologicos'

interface EditAntPerinatologicosProps {
    idPaciente: number
    onClose?: () => void
}

function EditAntPerinatologicos({
    idPaciente,
    onClose,
}: EditAntPerinatologicosProps) {
    const { token } = useToken()
    const { user } = useSessionUser()
    const [loading, setLoading] = useState(false)
    const [mensajes, setMensajes] = useState([])
    const [existeAntecedente, setExisteAntecedente] = useState(false)
    const [antecedenteData, setAntecedenteData] = useState(null)

    const { actualizarAntecedente } = useUpdateAntecedentesPerinatologicos({
        onSuccess: () => {
            cargarAntecedentePerinatologico()
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
    } = useForm({
        defaultValues: {
            peso_al_nacer: '',
            talla_al_nacer: '',
            nota: '',
            condicion_al_nacer: '',
            cuidado_neonatal: '',
            etirico_neonatal: '',
        },
    })

    const cargarAntecedentePerinatologico = useCallback(async () => {
        try {
            setLoading(true)
            const response = await BuscarPerinatologicos(token, idPaciente)

            if (response && response.data && response.data.length > 0) {
                setExisteAntecedente(true)
                setAntecedenteData(response.data[0])

                reset({
                    peso_al_nacer: response.data[0].peso_al_nacer || '',
                    talla_al_nacer: response.data[0].talla_al_nacer || '',
                    nota: response.data[0].nota || '',
                    condicion_al_nacer:
                        response.data[0].condicion_al_nacer || '',
                    cuidado_neonatal: response.data[0].cuidado_neonatal || '',
                    etirico_neonatal: response.data[0].etirico_neonatal || '',
                })
            } else {
                setExisteAntecedente(false)
                setAntecedenteData(null)
            }
        } catch (e) {
            console.error('Error al cargar antecedente perinatológico:', e)
            setMensajes([
                {
                    status: 'error',
                    message:
                        'No existe un antecedente perinatológico para este paciente',
                },
            ])

            setTimeout(() => {
                setMensajes([])
            }, 2000)
        } finally {
            setLoading(false)
        }
    }, [idPaciente, token, reset])

    useEffect(() => {
        if (idPaciente) {
            cargarAntecedentePerinatologico()
        }
    }, [idPaciente, token, cargarAntecedentePerinatologico])

    const onSubmit = async (data) => {
        try {
            setLoading(true)
            setMensajes([])

            if (!idPaciente) {
                setMensajes([
                    { status: 'error', message: 'ID de paciente no válido' },
                ])

                setTimeout(() => {
                    setMensajes([])
                }, 2000)
                return
            }

            const datos = {
                peso_al_nacer: data.peso_al_nacer?.trim() || '',
                talla_al_nacer: data.talla_al_nacer?.trim() || '',
                nota: data.nota?.trim() || '',
                condicion_al_nacer: data.condicion_al_nacer?.trim() || '',
                cuidado_neonatal: data.cuidado_neonatal?.trim() || '',
                etirico_neonatal: data.etirico_neonatal?.trim() || '',
            }

            let response

            if (existeAntecedente && antecedenteData) {
                response = await actualizarAntecedente({
                    id: antecedenteData.id,
                    ...datos,
                })

            } else {
                response = await CrearPerinatologico(
                    token,
                    user.id,
                    idPaciente,
                    datos,
                )

                if (response.status === 'success') {
                    setMensajes([
                        {
                            status: 'success',
                            message:
                                'Antecedente perinatológico agregado con éxito',
                        },
                    ])

                    setTimeout(() => {
                        setMensajes([])
                    }, 2000)

                    cargarAntecedentePerinatologico()

                    if (onClose) {
                        setTimeout(() => onClose(), 1500)
                    }
                } else {
                    setMensajes([
                        {
                            status: 'error',
                            message:
                                response.message ||
                                'Error al guardar el antecedente perinatológico',
                        },
                    ])

                    setTimeout(() => {
                        setMensajes([])
                    }, 2000)
                }
            }
        } catch (e) {
            console.error('Error en el proceso:', e)
            setMensajes([
                {
                    status: 'error',
                    message: 'Error al procesar el antecedente perinatológico',
                },
            ])

            setTimeout(() => {
                setMensajes([])
            }, 2000)
        } finally {
            setLoading(false)
        }
    }

    const optionsCondicionAlNacer = [
        { value: 'Saludable', label: 'Saludable' },
        { value: 'Sin complicaciones', label: 'Sin complicaciones' },
        { value: 'Nacido a término', label: 'Nacido a término' },
        { value: 'Prematuro', label: 'Prematuro' },
        { value: 'Postérmino', label: 'Postérmino' },
    ]

    const optionsCuidadoNeoNatal = [
        { value: 'No requerido', label: 'No requerido' },
        {
            value: 'Observación en incubadora',
            label: 'Observación en incubadora',
        },
        {
            value: 'Fototerapia por ictericia',
            label: 'Fototerapia por ictericia',
        },
        {
            value: 'Monitoreo de signos vitales',
            label: 'Monitoreo de signos vitales',
        },
        { value: 'Observación estándar', label: 'Observación estándar' },
    ]

    const optionEtiricoNeonatal = [
        { value: 'Sí', label: 'Sí' },
        { value: 'No', label: 'No' },
    ]

    return (
        <form
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full"
            onSubmit={handleSubmit(onSubmit)}
        >
            {/* Sección Información Básica */}
            <SectionTitle
                text={
                    existeAntecedente
                        ? 'Actualizar Antecedentes Perinatológicos'
                        : 'Registrar Antecedentes Perinatológicos'
                }
                className="col-span-1 md:col-span-2 lg:col-span-4"
            />

            {/* Alertas */}
            {mensajes.length > 0 && (
                <div className="col-span-4 mb-4">
                    {mensajes.map((msg, index) => (
                        <Alert
                            key={index}
                            showIcon
                            closable
                            title={
                                msg.status === 'error' ? 'Atención' : 'Correcto'
                            }
                            type={msg.status === 'error' ? 'danger' : 'success'}
                            duration={3000}
                        >
                            {msg.message}
                        </Alert>
                    ))}
                </div>
            )}

            <InputForm
                control={control}
                name="peso_al_nacer"
                rules={validationAntecedentesPerinatologicos.pesoAlNacer}
                errors={errors}
                label="Peso al nacer (kg)"
                inputPlaceholder="Peso"
                className="col-span-1"
                value=""
            />

            <InputForm
                control={control}
                name="talla_al_nacer"
                rules={validationAntecedentesPerinatologicos.tallaAlNacer}
                errors={errors}
                label="Talla al nacer (cm)"
                inputPlaceholder="Talla CM"
                className="col-span-1"
                value=""
            />

            <InputForm
                control={control}
                name="nota"
                rules={validationAntecedentesPerinatologicos.nota}
                errors={errors}
                label="Nota"
                inputPlaceholder="Nota"
                className="col-span-1"
                value=""
            />

            <InputSelect
                control={control}
                name="condicion_al_nacer"
                validation={
                    validationAntecedentesPerinatologicos.condicionAlNacer
                }
                errors={errors}
                label="Condición del nacimiento"
                placeholder="Condición al nacer"
                className="col-span-1"
                options={optionsCondicionAlNacer}
            />

            <InputSelect
                control={control}
                name="cuidado_neonatal"
                validation={
                    validationAntecedentesPerinatologicos.cuidadoNeonatal
                }
                errors={errors}
                label="Cuidado neonatal"
                placeholder="Cuidado neonatal"
                className="col-span-1"
                options={optionsCuidadoNeoNatal}
            />

            <InputSelect
                control={control}
                name="etirico_neonatal"
                validation={
                    validationAntecedentesPerinatologicos.etiricoNeonatal
                }
                errors={errors}
                label="Etirico neonatal"
                placeholder="Etirico neonatal"
                className="col-span-1"
                options={optionEtiricoNeonatal}
            />

            {/* Botón */}
            <div className="col-span-4 flex justify-end mt-6">
                <Button type="submit" disabled={loading}>
                    {loading
                        ? 'Procesando...'
                        : existeAntecedente
                          ? 'Actualizar'
                          : 'Guardar'}
                </Button>
            </div>
        </form>
    )
}

export default EditAntPerinatologicos
