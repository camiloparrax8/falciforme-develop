/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm } from 'react-hook-form'
import Button from '@/components/ui/Button'
import { useState } from 'react'
import validationRedPrimaria from '../../../../validation/validationRedPrimaria'
import SelectDepartment from '@/views/common/form/SelectDepartment'
import SelectCity from '@/views/common/form/SelectCity'
import SectionTitle from '@/views/common/form/SectionTitle'
import InputForm from '@/views/common/form/InputForm'
import InputDatePickerForm from '@/views/common/form/InputDate'
import { Dialog } from '@/components/ui'
import {crearRedPrimaria} from '@/customService/services/redPrimariaService'
import { useToken, useSessionUser } from '@/store/authStore'


function FormRedPrimaria({ isOpen, onClose, onRequestClose, setMensajes }) {
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        defaultValues: {
            fecha: '',
            hospital: '',
            correo: '',
            telefono: '',
            telefono_urgencias: '',
            departamento: '',
            municipio: ''
        },
    })
    const [selectedDepartment, setSelectedDepartment] = useState(null)
    const [loading, setLoading] = useState(false)
    const { token } = useToken()
    const { user } = useSessionUser()
    

    const onSubmit = async (data) => {
        try {
            setLoading(true)
            setMensajes([])

            const response = await crearRedPrimaria(token, user.id, data)

            setMensajes({ status: 'success', message: response.message || 'Red primaria creada con éxito.' })
            onClose() 
        } catch (error) {
            setMensajes({
                status: 'error',
                message: error.response?.data?.message || 'Error al asignar el acompañante.',
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog
            width={1200}
            height={500}
            isOpen={isOpen}
            onClose={onClose}
            onRequestClose={onRequestClose}
        >
            <form
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full"
                onSubmit={handleSubmit(onSubmit)}
            >
                {/* Sección Información Básica */}
                <SectionTitle
                    text="Información Básica"
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

                {/* Botón */}
                <div className="col-span-4 flex justify-end mt-6">
                    <Button type="submit">Guardar</Button>
                </div>
            </form>
        </Dialog>
            
    )
}

export default FormRedPrimaria
