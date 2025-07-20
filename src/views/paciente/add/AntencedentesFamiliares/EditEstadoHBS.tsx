/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm } from 'react-hook-form'
import Button from '@/components/ui/Button'
import validationAntecedentesFamiliares from '@/validation/validationAntecedentesFamiliares'
import SectionTitle from '@/views/common/form/SectionTitle'
import InputSelect from '@/views/common/form/InputSelect'
import SelectParentesco from '@/views/common/form/SelectParentesco'
import SelectLinea from '@/views/common/form/SelectLinea'
import {
    crearEstadoHBS,
    BuscarEstadosHBS,
} from '@/customService/services/estadoHbsService'
import { useSessionUser, useToken } from '@/store/authStore'
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

    const {
        control,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            parentesco: '',
            linea_parentesco: '',
            estado: '',
        },
    })

    const selectedParentesco = watch('parentesco')

    const { actualizarEstadoHbs } = useUpdateEstadoHBS({
        onSuccess: () => {
            cargarEstadoHBS()
            if (onClose) {
                setTimeout(() => onClose(), 1500)
            }
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
                    cargarEstadoHBS()

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
            console.error('Error al procesar el estado HBS:', error)
            setMensajes([
                { status: 'error', message: 'Error al procesar el estado HBS' },
            ])
        } finally {
            setLoading(false)
        }
    }

    const optionsEstado = [
        { value: 'Portador', label: 'Portador' },
        { value: 'No portador', label: 'No Portador' },
        { value: 'Desconocido', label: 'Desconocido' },
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
                            type={msg.status === 'error' ? 'danger' : 'success'}
                            duration={60000}
                            closable
                            showIcon
                        >
                            {msg.message}
                        </Alert>
                    ))}
                </div>
            )}

            <SelectParentesco
                control={control}
                errors={errors}
                validation={
                    validationAntecedentesFamiliares.estadoHBS.parentesco
                }
                className="col-span-1"
            />

            <SelectLinea
                control={control}
                errors={errors}
                validation={validationAntecedentesFamiliares.estadoHBS.linea}
                selectedParentesco={selectedParentesco}
                className="col-span-1"
            />

            <InputSelect
                control={control}
                name="estado"
                validation={validationAntecedentesFamiliares.estadoHBS.estado}
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
