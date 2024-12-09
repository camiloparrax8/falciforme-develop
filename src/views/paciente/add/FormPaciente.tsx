import { useForm } from 'react-hook-form'
import Button from '@/components/ui/Button'
import { useState } from 'react'
import validationPaciente from '../../../validation/validationPaciente'
import SelectDepartment from '@/views/common/form/SelectDepartment'
import SelectCity from '@/views/common/form/SelectCity'
import SelectDocumentType from '@/views/common/form/SelectDocumentType'
import SectionTitle from '@/views/common/form/SectionTitle'
import InputForm from '@/views/common/form/InputForm'
import InputDatePickerForm from '@/views/common/form/InputDate'

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
            birthdate: '',
            gender: '',
            sexualIdentity: '',
            department: '',
            city: '',
            address: '',
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
      <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full" onSubmit={handleSubmit(onSubmit)}>
      {/* Sección Información Básica */}
      <SectionTitle text="Información Básica" className="col-span-1 md:col-span-2 lg:col-span-4" />
      <InputForm
          control={control}
          name="fullName"
          rules={validationPaciente.fullName}
          errors={errors}
          label="Nombre completo"
          inputPlaceholder="Nombre del paciente"
          className="col-span-1"
          value=""

      />
      <SelectDocumentType
          control={control}
          name="documentType"
          rules={validationPaciente.documentType}
          errors={errors}
          className="col-span-1"
      />
      <InputForm
          control={control}
          name="identification"
          rules={validationPaciente.identification}
          errors={errors}
          label="Identificación"
          inputPlaceholder="Número de identificación"
          className="col-span-1"
          value=""


      />
      <InputDatePickerForm
          control={control}
          name="birthDate"
          rules={validationPaciente.birthDate}
          errors={errors}
          label="Fecha de Nacimiento"
          placeholder="Seleccione una fecha"
          className="col-span-1"

      />
  
      {/* Sección Ubicación */}
      <SectionTitle text="Ubicación" className="col-span-1 md:col-span-2 lg:col-span-4" />
      <SelectDepartment
          control={control}
          errors={errors}
          validation={validationPaciente.department}
          onDepartmentChange={setSelectedDepartment}
          className="col-span-1"
      />
      <SelectCity
          control={control}
          selectedDepartment={selectedDepartment}
          errors={errors}
          validation={validationPaciente.city}
          className="col-span-1"
      />
      <InputForm
          control={control}
          name="address"
          rules={validationPaciente.address}
          errors={errors}
          label="Dirección"
          inputPlaceholder="Dirección completa"
          className="col-span-2"
          value=""


      />
      <InputForm
          control={control}
          name="resident"
          rules={validationPaciente.residency}
          errors={errors}
          label="Residente"
          inputPlaceholder="Ejemplo: Lore impun"
          className="col-span-1"
          value=""
          
      />
      <InputForm
          control={control}
          name="source"
          rules={validationPaciente.provenance}
          errors={errors}
          label="Procedente"
          inputPlaceholder="Ejemplo: Lore impun"
          className="col-span-1"
          value=""


      />
  
      {/* Sección Contacto */}
      <SectionTitle text="Contacto" className="col-span-1 md:col-span-2 lg:col-span-4" />
      <InputForm
          control={control}
          name="phone"
          rules={validationPaciente.phone}
          errors={errors}
          label="Celular"
          inputPlaceholder="Número de celular"
          className="col-span-1"
          value=""


      />
      <InputForm
          control={control}
          name="email"
          rules={validationPaciente.email}
          errors={errors}
          label="Correo Electrónico"
          inputPlaceholder="Ingrese su correo electrónico"
          className="col-span-1"
          value=""


      />
  
      {/* Sección Socioeconómica */}
      <SectionTitle text="Socioeconómico" className="col-span-1 md:col-span-2 lg:col-span-4" />
      <InputForm
          control={control}
          name="socialStratum"
          rules={validationPaciente.stratum}
          errors={errors}
          label="Estrato"
          inputPlaceholder="Ejemplo: 1"
          className="col-span-1"
          value=""

      />
      <InputForm
          control={control}
          name="occupation"
          rules={validationPaciente.occupation}
          errors={errors}
          label="Ocupación"
          inputPlaceholder="Ejemplo: Estudiante"
          className="col-span-1"
          value=""



      />
      <InputForm
          control={control}
          name="regime"
          rules={validationPaciente.regime}
          errors={errors}
          label="Régimen"
          inputPlaceholder="Ejemplo: Contributivo"
          className="col-span-1"
          value=""


      />
  
      {/* Botón */}
      <div className="col-span-4 flex justify-end mt-6">
          <Button type="submit">Guardar</Button>
      </div>
  </form>
    )
}

export default PatientForm
