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

function FormRedPrimaria({ isOpen, onClose, onRequestClose }) {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            fullName: '',
            documentType: '',
            identification: '',
            birthdate: '',
            gender: '',
            sexualIdentity: '',
            departamento: '',
            city: '',
            resident: '',
            source: '',
            phone: '',
            email: '',
            socialStratum: '',
            occupation: '',
            regime: '',
        },
    })
    const [selectedDepartment, setSelectedDepartment] = useState(null)

    const onSubmit = (data) => {
        console.log('Datos enviados:', data)
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
                    name="date"
                    rules={validationRedPrimaria.date}
                    errors={errors}
                    label="Fecha"
                    placeholder="Seleccione una fecha"
                    className="col-span-1"
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
                    onDepartmentChange={setSelectedDepartment}
                    className="col-span-1"
                />
                <SelectCity
                    control={control}
                    selectedDepartment={selectedDepartment}
                    errors={errors}
                    validation={validationRedPrimaria.city}
                    className="col-span-1"
                />

                {/* Sección Contacto */}
                <SectionTitle
                    text="Contacto"
                    className="col-span-1 md:col-span-2 lg:col-span-4"
                />
                <InputForm
                    control={control}
                    name="phone"
                    rules={validationRedPrimaria.phone}
                    errors={errors}
                    label="Celular"
                    inputPlaceholder="Número de celular"
                    className="col-span-1"
                    value=""
                />
                <InputForm
                    control={control}
                    name="phoneUrgency"
                    rules={validationRedPrimaria.emergencyPhone}
                    errors={errors}
                    label="Número de Urgencia"
                    inputPlaceholder="Número de Urgencia"
                    className="col-span-1"
                    value=""
                />
                <InputForm
                    control={control}
                    name="email"
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
