import { useForm } from 'react-hook-form'
import Button from '@/components/ui/Button'
import validationEstadoHBS from '@/validation/validationAntecedentesFamiliares'
import SectionTitle from '@/views/common/form/SectionTitle'
import InputSelect from '@/views/common/form/InputSelect'
import {
    crearEstadoHBS,
    BuscarEstadosHBS,
    actualizarEstadoHBS,
} from '@/customService/services/estadoHbsService'
import { useToken } from '@/store/authStore'
import { useEffect, useState } from 'react'
import Alert from '@/components/ui/Alert'
import { useUpdateEstadoHBS } from '@/hooks/useUpdateEstadoHBS'

interface EditEstadoHBSProps {
    idPaciente: number
    onClose?: () => void
}

function EditEstadoHBS({ idPaciente, onClose }: EditEstadoHBSProps) {
    const { token } = useToken()
    const { user } = useSessionUser()
    const [loading, setLoading] = useState(false)
    const [mensajes, setMensajes] = useState([])
    const [existeEstadoHBS, setExisteEstadoHBS] = useState(false)
    const [estadoHBSData, setEstadoHBSData] = useState(null)

    const { actualizarEstadoHbs } = useUpdateEstadoHBS({
        onSuccess: () => {
            // Recargar datos después de actualizar
            cargarEstadoHBS()
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
            parentesco: '',
            linea_parentesco: '',
            estado: '',
        },
    })

    // Cargar estado HBS existente
    const cargarEstadoHBS = async () => {
        try {
            setLoading(true)
            const response = await BuscarEstadosHBS(token, idPaciente)

            if (response && response.data && response.data.length > 0) {
                setExisteEstadoHBS(true)
                setEstadoHBSData(response.data[0])

                // Actualizar el formulario con los datos existentes
                reset({
                    parentesco: response.data[0].parentesco || '',
                    linea_parentesco: response.data[0].linea_parentesco || '',
                    estado: response.data[0].estado || '',
                })
            } else {
                setExisteEstadoHBS(false)
                setEstadoHBSData(null)
            }
        } catch (error) {
            console.error('Error al cargar estado HBS:', error)
            setMensajes([
                { status: 'error', message: 'Error al cargar el estado HBS' },
            ])
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (idPaciente) {
            cargarEstadoHBS()
        }
    }, [idPaciente, token])

    const onSubmit = async (data) => {
        try {
            setLoading(true)
            setMensajes([])

            if (!idPaciente) {
                setMensajes([
                    { status: 'error', message: 'ID de paciente no válido' },
                ])
                return
            }

            const datos = {
                parentesco: data.parentesco?.trim() || '',
                linea_parentesco: data.linea_parentesco?.trim() || '',
                estado: data.estado?.trim() || '',
            }

            let response

            if (existeEstadoHBS && estadoHBSData) {
                // Actualizar estado HBS existente
                response = await actualizarEstadoHbs({
                    id: estadoHBSData.id,
                    ...datos,
                })

                // El manejo de mensajes lo hace el hook useUpdateEstadoHBS
            } else {
                // Crear nuevo estado HBS
                response = await crearEstadoHBS(
                    token,
                    user.id,
                    idPaciente,
                    datos,
                )

                if (response.status === 'success') {
                    setMensajes([
                        {
                            status: 'success',
                            message: 'Estado HBS agregado con éxito',
                        },
                    ])
                    cargarEstadoHBS() // Recargar datos

                    if (onClose) {
                        setTimeout(() => onClose(), 1500)
                    }
                } else {
                    setMensajes([
                        {
                            status: 'error',
                            message:
                                response.message ||
                                'Error al guardar el estado HBS',
                        },
                    ])
                }
            }
        } catch (error) {
            setMensajes([
                { status: 'error', message: 'Error al procesar el estado HBS' },
            ])
        } finally {
            setLoading(false)
        }
    }

    const optionsParentesco = [
        { value: 'Padre', label: 'Padre' },
        { value: 'Madre', label: 'Madre' },
        { value: 'Hermano/a', label: 'Hermano/a' },
        { value: 'Abuelo/a', label: 'Abuelo/a' },
        { value: 'Tío/a', label: 'Tío/a' },
        { value: 'Primo/a', label: 'Primo/a' },
    ]

    const optionsLineaParentesco = [
        { value: 'Paterno', label: 'Paterno' },
        { value: 'Materno', label: 'Materno' },
    ]

    const optionsEstado = [
        { value: 'Desconocido', label: 'Desconocido' },
        { value: 'AA', label: 'AA' },
        { value: 'AS', label: 'AS' },
        { value: 'SS', label: 'SS' },
    ]

    return (
        <form
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full"
            onSubmit={handleSubmit(onSubmit)}
        >
            <SectionTitle
                text={
                    existeEstadoHBS
                        ? 'Actualizar Estado HBS'
                        : 'Registrar Estado HBS'
                }
                className="col-span-1 md:col-span-2 lg:col-span-3"
            />

            {/* Alertas */}
            {mensajes.length > 0 && (
                <div className="col-span-3 mb-4">
                    {mensajes.map((msg, index) => (
                        <Alert
                            key={index}
                            title={
                                msg.status === 'error' ? 'Atención' : 'Correcto'
                            }
                            showIcon
                            type={msg.status === 'error' ? 'danger' : 'success'}
                            closable
                            duration={60000}
                        >
                            {msg.message}
                        </Alert>
                    ))}
                </div>
            )}

            <InputSelect
                control={control}
                name="parentesco"
                validation={validationEstadoHBS?.parentesco}
                errors={errors}
                label="Parentesco"
                placeholder="Seleccione parentesco"
                className="col-span-1"
                options={optionsParentesco}
            />

            <InputSelect
                control={control}
                name="linea_parentesco"
                validation={validationEstadoHBS?.lineaParentesco}
                errors={errors}
                label="Línea de parentesco"
                placeholder="Seleccione línea"
                className="col-span-1"
                options={optionsLineaParentesco}
            />

            <InputSelect
                control={control}
                name="estado"
                validation={validationEstadoHBS?.estado}
                errors={errors}
                label="Estado"
                placeholder="Seleccione estado"
                className="col-span-1"
                options={optionsEstado}
            />

            {/* Botón */}
            <div className="col-span-3 flex justify-end mt-6">
                <Button type="submit" disabled={loading}>
                    {loading
                        ? 'Procesando...'
                        : existeEstadoHBS
                          ? 'Actualizar'
                          : 'Guardar'}
                </Button>
            </div>
        </form>
    )
}

export default EditEstadoHBS
