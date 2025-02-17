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
import InputSelect from '@/views/common/form/InputSelect'
import { useToken } from '@/store/authStore'
import { crearPaciente } from '@/customService/services/pacienteService'
import Alert from '@/components/ui/Alert'
import { useSessionUser } from '@/store/authStore'

import {
    optionsEstrato,
    optionsRegimen,
    optionsSexo,
    optionsIdentidadGenero,
    optionsIdentidadSexual,
} from './dataSelectPaciente'
function PatientForm() {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            nombre: '',
            apellido: '',
            tipo_identificacion: '',
            identificacion: '',
            fecha_nacimiento: '',
            sexo: '',
            identidad_genero: '',
            identidad_sexual: '',
            estrato: '',
            ocupacion: '',
            residente: '',
            direccion: '',
            procedente: '',
            regimen: '',
            celular: '',
            correo: '',
            municipio: '',
            departamento: '',
        },
    })

    const [selectedDepartment, setSelectedDepartment] = useState(null)
    const { token } = useToken()
    const [loading, setLoading] = useState(false)
    const [mensajes, setMensajes] = useState<{ status: string; message: string }[]>([])
    const [idPaciente, setidPaciente] = useState([])
    const { user } = useSessionUser()

    const onSubmit = async (data) => {
        try {
            setLoading(true)
            setMensajes([]) // Limpia los mensajes anteriores

            const usuarioId = user.id

            const response = await crearPaciente(token, usuarioId, data)
            if (response.data?.status === 'error') {
                const errores = response.data.errors.map((err) => ({
                    status: 'error',
                    message: `${err.msg}, Campo: ${err.path}`, // Agrega el campo al mensaje
                }))
                setMensajes(errores)
            } else {
                setMensajes([
                    {
                        status: 'success',
                        message:
                            response.data.message ||
                            'Paciente creado con éxito',
                    },
                ])
                setidPaciente(response)
              
            }
        } catch (error) {
            const errores = error.response?.data?.errors?.map((err) => ({
                status: 'error',
                message: `${err.msg}, Campo: ${err.path}`, // Agrega el campo al mensaje
            })) || [
                {
                    status: 'error',
                    message:
                        'Error al guardar el paciente. Inténtalo de nuevo.',
                },
            ]

            setMensajes(errores)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            {mensajes.length > 0 && (
                <div className="mb-4">
                    {mensajes.map((msg, index) => (
                        <Alert
                            key={index}
                            title={
                                msg.status === 'error' ? 'Atención' : 'Correcto'
                            }
                            showIcon
                            type={msg.status === 'error' ? 'danger' : 'success'}
                            closable // Muestra el botón de cierre
                            duration={60000}
                        >
                            {msg.message}
                        </Alert>
                    ))}
                </div>
            )}

            <form
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full"
                onSubmit={handleSubmit(onSubmit)}
            >
                {/* Sección Información Básica */}
                <SectionTitle
                    text="Información Básica"
                    className="col-span-1 md:col-span-2 lg:col-span-4"
                />
                <InputForm
                    control={control}
                    name="nombre"
                    rules={validationPaciente.nombre}
                    errors={errors}
                    label="Nombre"
                    inputPlaceholder="Nombre del paciente"
                    className="col-span-1"
                    value=""
                />

                <InputForm
                    control={control}
                    name="apellido"
                    rules={validationPaciente.apellido}
                    errors={errors}
                    label="Apellido"
                    inputPlaceholder="Nombre del paciente"
                    className="col-span-1"
                    value=""
                />
                <SelectDocumentType
                    control={control}
                    name="tipo_identificacion"
                    rules={validationPaciente.tipo_identificacion}
                    errors={errors}
                    className="col-span-1"
                />
                <InputForm
                    control={control}
                    name="identificacion"
                    rules={validationPaciente.identificacion}
                    errors={errors}
                    label="Identificación"
                    inputPlaceholder="Número de identificación"
                    className="col-span-1"
                    value=""
                />
                <InputDatePickerForm
                    control={control}
                    name="fecha_nacimiento"
                    rules={validationPaciente.fecha_nacimiento}
                    errors={errors}
                    label="Fecha de Nacimiento"
                    placeholder="Seleccione una fecha"
                    className="col-span-1"
                />
                <InputSelect
                    control={control}
                    name="sexo"
                    options={optionsSexo}
                    validation={validationPaciente.sexo}
                    errors={errors}
                    label="Sexo"
                    placeholder="Sexo"
                    className="col-span-1"
                />

                <InputSelect
                    control={control}
                    name="identidad_genero"
                    options={optionsIdentidadGenero}
                    validation={validationPaciente.identidad_genero}
                    errors={errors}
                    label="Identidad genero"
                    placeholder="Identidad genero"
                    className="col-span-1"
                />

                <InputSelect
                    control={control}
                    name="identidad_sexual"
                    options={optionsIdentidadSexual}
                    validation={validationPaciente.identidad_sexual}
                    errors={errors}
                    label="Identidad Sexual"
                    placeholder="Identidad Sexual"
                    className="col-span-1"
                />

                {/* Sección Ubicación */}
                <SectionTitle
                    text="Ubicación"
                    className="col-span-1 md:col-span-2 lg:col-span-4"
                />
                <SelectDepartment
                    control={control}
                    errors={errors}
                    validation={validationPaciente.departamento}
                    onDepartmentChange={setSelectedDepartment}
                    className="col-span-1"
                />
                <SelectCity
                    control={control}
                    selectedDepartment={selectedDepartment}
                    errors={errors}
                    validation={validationPaciente.municipio}
                    className="col-span-1"
                />
                <InputForm
                    control={control}
                    name="direccion"
                    rules={validationPaciente.direccion}
                    errors={errors}
                    label="Dirección"
                    inputPlaceholder="Dirección completa"
                    className="col-span-2"
                    value=""
                />
                <InputForm
                    control={control}
                    name="residente"
                    rules={validationPaciente.residente}
                    errors={errors}
                    label="Residente"
                    inputPlaceholder="Ejemplo: Lore impun"
                    className="col-span-1"
                    value=""
                />
                <InputForm
                    control={control}
                    name="procedente"
                    rules={validationPaciente.procedente}
                    errors={errors}
                    label="Procedente"
                    inputPlaceholder="Ejemplo: Lore impun"
                    className="col-span-1"
                    value=""
                />

                {/* Sección Contacto */}
                <SectionTitle
                    text="Contacto"
                    className="col-span-1 md:col-span-2 lg:col-span-4"
                />
                <InputForm
                    control={control}
                    name="celular"
                    rules={validationPaciente.celular}
                    errors={errors}
                    label="Celular"
                    inputPlaceholder="Número de celular"
                    className="col-span-1"
                    value=""
                />
                <InputForm
                    control={control}
                    name="correo"
                    rules={validationPaciente.correo}
                    errors={errors}
                    label="Correo Electrónico"
                    inputPlaceholder="Ingrese su correo electrónico"
                    className="col-span-1"
                    value=""
                />

                {/* Sección Socioeconómica */}
                <SectionTitle
                    text="Socioeconómico"
                    className="col-span-1 md:col-span-2 lg:col-span-4"
                />
                <InputSelect
                    control={control}
                    name="estrato"
                    options={optionsEstrato}
                    validation={validationPaciente.estrato}
                    errors={errors}
                    label="Estrato"
                    placeholder="Ejemplo: 1"
                    className="col-span-1"
                />
                <InputForm
                    control={control}
                    name="ocupacion"
                    rules={validationPaciente.ocupacion}
                    errors={errors}
                    label="Ocupación"
                    inputPlaceholder="Ejemplo: Estudiante"
                    className="col-span-1"
                    value=""
                />
                <InputSelect
                    control={control}
                    name="regimen"
                    options={optionsRegimen}
                    validation={validationPaciente.regimen}
                    errors={errors}
                    label="Régimen"
                    placeholder="Ejemplo: Contributivo"
                    className="col-span-1"
                />

                {/* Botón */}
                <div className="col-span-4 flex justify-end mt-6">
                    <Button type="submit">
                        {loading ? 'Guardando...' : 'Guardar'}
                    </Button>
                </div>
            </form>
        </>
    )
}

export default PatientForm
