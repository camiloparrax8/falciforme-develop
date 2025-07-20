/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/newline-after-import */
/* eslint-disable react/jsx-sort-props */
import { useForm } from 'react-hook-form'
import Button from '@/components/ui/Button'
import { useEffect, useState } from 'react'
import validationPaciente from '../../../validation/validationPaciente'
import SelectDepartment from '@/views/common/form/SelectDepartment'
import SelectCity from '@/views/common/form/SelectCity'
import SelectDocumentType from '@/views/common/form/SelectDocumentType'
import SectionTitle from '@/views/common/form/SectionTitle'
import InputForm from '@/views/common/form/InputForm'
import InputDatePickerForm from '@/views/common/form/InputDate'
import InputSelect from '@/views/common/form/InputSelect'
import { useToken, useSessionUser } from '@/store/authStore'
import { actualizarPaciente } from '@/customService/services/pacienteService'
import Alert from '@/components/ui/Alert'

import {
    optionsEstrato,
    optionsRegimen,
    optionsSexo,
    optionsIdentidadGenero,
    optionsIdentidadSexual,
} from './dataSelectPaciente'

interface EditFormPacienteProps {
    pacienteData: any
    onClose?: () => void
}

function EditFormPaciente({ pacienteData, onClose }: EditFormPacienteProps) {
    const {
        control,
        handleSubmit,
        reset,
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
            departamento: '',
            municipio: '',
            direccion: '',
            residente: '',
            procedente: '',
            celular: '',
            correo: '',
            estrato: '',
            ocupacion: '',
            regimen: '',
        },
    })

    const [selectedDepartment, setSelectedDepartment] = useState(null)
    const { token } = useToken()
    const [loading, setLoading] = useState(false)
    const [mensajes, setMensajes] = useState<
        { status: string; message: string }[]
    >([])
    const { user } = useSessionUser()

    // Cargar datos del paciente al montar el componente
    useEffect(() => {
        if (pacienteData) {
            setSelectedDepartment(pacienteData.departamento)
            reset({
                nombre: pacienteData.nombre || '',
                apellido: pacienteData.apellido || '',
                tipo_identificacion: pacienteData.tipo_identificacion || '',
                identificacion: pacienteData.identificacion || '',
                fecha_nacimiento: pacienteData.fecha_nacimiento || '',
                sexo: pacienteData.sexo || '',
                identidad_genero: pacienteData.identidad_genero || '',
                identidad_sexual: pacienteData.identidad_sexual || '',
                departamento: pacienteData.departamento || '',
                municipio: pacienteData.municipio || '',
                direccion: pacienteData.direccion || '',
                residente: pacienteData.residente || '',
                procedente: pacienteData.procedente || '',
                celular: pacienteData.celular || '',
                correo: pacienteData.correo || '',
                estrato: pacienteData.estrato || '',
                ocupacion: pacienteData.ocupacion || '',
                regimen: pacienteData.regimen || '',
            })
        }
    }, [pacienteData, reset])

    const onSubmit = async (data) => {
        try {
            setLoading(true)
            setMensajes([]) // Limpia los mensajes anteriores

            if (!pacienteData?.id) {
                console.error('No se encontró el ID del paciente')
                return
            }

            const response = await actualizarPaciente(
                token,
                user.id,
                pacienteData.id,
                data,
            )

            if (response.status === 'error') {
                setMensajes([
                    {
                        status: 'error',
                        message:
                            response.message ||
                            'Error al actualizar el paciente',
                    },
                ])
            } else {
                setMensajes([
                    {
                        status: 'success',
                        message: 'Paciente actualizado con éxito',
                    },
                ])

                // Cerrar el diálogo después de un breve delay
                setTimeout(() => {
                    if (onClose) onClose()
                }, 1500)
            }
        } catch (error) {
            setMensajes([
                {
                    status: 'error',
                    message:
                        'Error al actualizar el paciente. Inténtalo de nuevo.',
                },
            ])
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-h-[60vh] overflow-y-auto p-4">
            {mensajes.length > 0 && (
                <div className="mb-4">
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

            <form
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full"
                onSubmit={handleSubmit(onSubmit)}
            >
                {/* Sección Información Básica */}
                <SectionTitle
                    text="Información Básica del Paciente"
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
                    inputPlaceholder="Apellido del paciente"
                    className="col-span-1"
                    value=""
                />
                <SelectDocumentType
                    control={control}
                    name="tipo_identificacion"
                    rules={validationPaciente.tipo_identificacion}
                    errors={errors}
                    className="col-span-1"
                    disabled={false}
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
                    disabled={false}
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
                    disabled={false}
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
                    disabled={false}
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
                    disabled={false}
                />

                {/* Sección Ubicación y Contacto */}
                <SectionTitle
                    text="Ubicación y Contacto"
                    className="col-span-1 md:col-span-2 lg:col-span-4"
                />
                <SelectDepartment
                    control={control}
                    errors={errors}
                    validation={validationPaciente.departamento}
                    className="col-span-1"
                    disabled={false}
                    onDepartmentChange={setSelectedDepartment}
                />
                <SelectCity
                    control={control}
                    selectedDepartment={selectedDepartment}
                    errors={errors}
                    validation={validationPaciente.municipio}
                    className="col-span-1"
                    disabled={false}
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
                    inputPlaceholder="Lugar de residencia"
                    className="col-span-1"
                    value=""
                />
                <InputForm
                    control={control}
                    name="procedente"
                    rules={validationPaciente.procedente}
                    errors={errors}
                    label="Procedente"
                    inputPlaceholder="Lugar de procedencia"
                    className="col-span-1"
                    value=""
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
                    disabled={false}
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
                    disabled={false}
                />

                {/* Botones */}
                <div className="col-span-4 flex justify-end gap-2 mt-6">
                    {onClose && (
                        <Button
                            type="button"
                            variant="plain"
                            onClick={onClose}
                            disabled={loading}
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

export default EditFormPaciente
