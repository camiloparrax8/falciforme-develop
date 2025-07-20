/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm } from 'react-hook-form'
import Button from '@/components/ui/Button'
import { useState, useEffect } from 'react'
import validationRedPrimaria from '../../../../validation/validationRedPrimaria'
import SelectDepartment from '@/views/common/form/SelectDepartment'
import SelectCity from '@/views/common/form/SelectCity'
import SectionTitle from '@/views/common/form/SectionTitle'
import InputForm from '@/views/common/form/InputForm'
import InputDatePickerForm from '@/views/common/form/InputDate'
import { actualizarRedPrimaraPaciente } from '@/customService/services/redPrimariaService'
import { useToken, useSessionUser } from '@/store/authStore'

interface EditFormRedPrimariaProps {
    idPaciente: number
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    redPrimariaData?: any
    onClose?: () => void
}

function EditFormRedPrimaria({
    idPaciente,
    redPrimariaData,
    onClose,
}: EditFormRedPrimariaProps) {
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            fecha: '',
            hospital: '',
            correo: '',
            telefono: '',
            telefono_urgencias: '',
            departamento: '',
            municipio: '',
        },
    })

    const [selectedDepartment, setSelectedDepartment] = useState(null)
    const [loading, setLoading] = useState(false)
    const { token } = useToken()
    const { user } = useSessionUser()

    // Cargar datos de la red primaria al montar el componente
    useEffect(() => {
        if (redPrimariaData) {
            setSelectedDepartment(redPrimariaData.departamento)
            reset({
                fecha: redPrimariaData.fecha || '',
                hospital: redPrimariaData.hospital || '',
                correo: redPrimariaData.correo || '',
                telefono: redPrimariaData.telefono || '',
                telefono_urgencias: redPrimariaData.telefono_urgencias || '',
                departamento: redPrimariaData.departamento || '',
                municipio: redPrimariaData.municipio || '',
            })
        }
    }, [redPrimariaData, reset])

    const onSubmit = async (data) => {
        try {
            setLoading(true)

            if (!redPrimariaData?.id) {
                console.error('No se encontró el ID de la red primaria')
                return
            }

            // Preparar los datos para el servicio
            const formDataToSend = {
                idPaciente: idPaciente,
                idRedPrimaria: redPrimariaData.id,
                ...data,
                id_user_update: user.id,
            }

            const response = await actualizarRedPrimaraPaciente(
                token,
                formDataToSend,
            )


            if (onClose) onClose()
        } catch (error) {
            console.error('Error al actualizar red primaria:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-h-[60vh] overflow-y-auto p-4">
            <form
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full"
                onSubmit={handleSubmit(onSubmit)}
            >
                {/* Sección Información Básica */}
                <SectionTitle
                    text="Información Básica de la Red Primaria"
                    className="col-span-1 md:col-span-2 lg:col-span-4"
                />
                <InputDatePickerForm
                    control={control}
                    name="fecha"
                    rules={validationRedPrimaria.date}
                    errors={errors}
                    label="Fecha"
                    placeholder="Seleccione una fecha"
                    className="col-span-1"
                    disabled={false}
                />
                <InputForm
                    control={control}
                    name="hospital"
                    rules={validationRedPrimaria.hospital}
                    errors={errors}
                    label="Hospital"
                    inputPlaceholder="Hospital remetido"
                    className="col-span-1"
                    value=""
                />

                <SelectDepartment
                    control={control}
                    errors={errors}
                    validation={validationRedPrimaria.department}
                    className="col-span-1"
                    disabled={false}
                    onDepartmentChange={setSelectedDepartment}
                />
                <SelectCity
                    control={control}
                    selectedDepartment={selectedDepartment}
                    errors={errors}
                    validation={validationRedPrimaria.city}
                    className="col-span-1"
                    disabled={false}
                />

                {/* Sección Contacto */}
                <SectionTitle
                    text="Contacto"
                    className="col-span-1 md:col-span-2 lg:col-span-4"
                />
                <InputForm
                    control={control}
                    name="telefono"
                    rules={validationRedPrimaria.phone}
                    errors={errors}
                    label="Celular"
                    inputPlaceholder="Número de celular"
                    className="col-span-1"
                    value=""
                />
                <InputForm
                    control={control}
                    name="telefono_urgencias"
                    rules={validationRedPrimaria.emergencyPhone}
                    errors={errors}
                    label="Número de Urgencia"
                    inputPlaceholder="Número de Urgencia"
                    className="col-span-1"
                    value=""
                />
                <InputForm
                    control={control}
                    name="correo"
                    rules={validationRedPrimaria.email}
                    errors={errors}
                    label="Correo Electrónico"
                    inputPlaceholder="Ingrese su correo electrónico"
                    className="col-span-1"
                    value=""
                />

                {/* Botones */}
                <div className="col-span-4 flex justify-end gap-2 mt-4">
                    {onClose && (
                        <Button
                            type="button"
                            variant="plain"
                            disabled={loading}
                            onClick={onClose}
                        >
                            Cancelar
                        </Button>
                    )}
                    <Button type="submit" variant="solid" disabled={loading}>
                        {loading ? 'Actualizando...' : 'Actualizar'}
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default EditFormRedPrimaria
