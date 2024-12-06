import { useForm } from 'react-hook-form'
import Button from '@/components/ui/Button'
import { useState } from 'react'
import validationPaciente from '../../../validation/validationPaciente'
import SelectDepartment from '@/views/common/form/SelectDepartment'
import SelectCity from '@/views/common/form/SelectCity'
import SelectDocumentType from '@/views/common/form/SelectDocumentType'
import SectionTitle from '@/views/common/form/SectionTitle'
import InputForm from '@/views/common/form/InputForm'

function PatientForm() {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            fullName: '',
            documentType: '',
            identification: '',
            department: '',
            city: '',
            address: '',
            phone: '',
            email: '',
        },
    })

    const [selectedDepartment, setSelectedDepartment] = useState(null)

    const onSubmit = (data) => {
        console.log('Datos enviados:', data)
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-4 gap-4"
        >
            <SectionTitle text="Información Básica" />
            <div className="col-span-2">
                <InputForm
                    control={control}
                    name="fullName"
                    rules={validationPaciente.fullName}
                    errors={errors}
                    label="Nombre completo"
                    inputPlaceholder="Nombre del paciente"
                />
            </div>
            <div className="col-span-1">
                <SelectDocumentType
                    control={control}
                    name="documentType"
                    rules={validationPaciente.documentType}
                    errors={errors}
                />
            </div>
            <div className="col-span-1">
                <InputForm
                    control={control}
                    name="identification"
                    rules={validationPaciente.identification}
                    errors={errors}
                    label="Identificación"
                    inputPlaceholder="Número de identificación"
                />
            </div>
            <SectionTitle text="Ubicación" />
            <div className="col-span-2">
                <SelectDepartment
                    control={control}
                    errors={errors}
                    validation={validationPaciente.department}
                    onDepartmentChange={setSelectedDepartment}
                />
            </div>
            <div className="col-span-2">
                <SelectCity
                    control={control}
                    selectedDepartment={selectedDepartment}
                    errors={errors}
                    validation={validationPaciente.city}
                />
            </div>
            <div className="col-span-4">
                <InputForm
                    control={control}
                    name="fullName"
                    rules={validationPaciente.address}
                    errors={errors}
                    label="Dirección"
                    inputPlaceholder="Dirección completa"
                />
            </div>
            <SectionTitle text="Contacto" />
            <div className="col-span-2">
                <InputForm
                    control={control}
                    name="phone"
                    rules={validationPaciente.phone}
                    errors={errors}
                    label="Celular"
                    inputPlaceholder="Número de celular"
                />
            </div>
            <div className="col-span-2">
                <InputForm
                    control={control}
                    name="fullName"
                    rules={validationPaciente.email}
                    errors={errors}
                    label="Correo Electrónico"
                    inputPlaceholder="Ingrese su correo electrónico"
                />
            </div>
            {/* Botón */}
            <div className="col-span-4 flex justify-end mt-6">
                <Button type="submit">Guardar</Button>
            </div>
        </form>
    )
}

export default PatientForm
