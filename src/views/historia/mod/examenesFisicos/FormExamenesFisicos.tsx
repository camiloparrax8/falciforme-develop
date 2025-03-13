import { Button } from '@/components/ui'
import InputForm from '@/views/common/form/InputForm'
import InputSelect from '@/views/common/form/InputSelect'
import SectionTitle from '@/views/common/form/SectionTitle'
import { useForm } from 'react-hook-form'
import validationExamenes from '../../.././../validation/validationExamenesFisicos'
import defaultValues from './defaultValues'
import { crearExamenFisico } from '@/customService/services/examenesFisicosService'
import { useToken, useSessionUser } from '@/store/authStore'
import { useState } from 'react'
import { useParams } from 'react-router-dom'


function FormExamenesFisicos() {
    const { id_paciente } = useParams()
    const { token } = useToken()
    const { user } = useSessionUser() // Obtén el usuario logueado
    const [isLoading, setIsLoading] = useState(false)
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: defaultValues,
    })

    const onSubmit = async (data) => {
        setIsLoading(true)
        try {
            const formData = {
                ...data,
                id_paciente: id_paciente,
                id_user_create: user.id,
            }
            const result = await crearExamenFisico(token, formData)
            console.log('Examen físico creado:', result)
        } catch (error) {
            console.error('Error al crear el examen físico:', error)
        } finally {
            setIsLoading(false)
        }
    }

    console.log('ID del paciente recibido:', id_paciente)

    const options = [
        { value: 'true', label: 'Sí' },
        { value: 'false', label: 'No' },
    ]
    return (
        <form
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full"
            onSubmit={handleSubmit(onSubmit)}
        >
            {/* Sección Signos Vitales */}
            <SectionTitle
                text="Signos Vitales"
                className="col-span-1 md:col-span-2 lg:col-span-4"
            />
            <InputForm
                control={control}
                name="frecuencia_cardiaca"
                rules={validationExamenes.frecuencia_cardiaca}
                errors={errors}
                label="Frecuencia Cardiaca (lpm)"
                inputPlaceholder="Ingrese la frecuencia cardiaca"
                className="col-span-1"
                value=""
            />
            <InputForm
                control={control}
                name="frecuencia_respiratoria"
                rules={validationExamenes.frecuencia_respiratoria}
                errors={errors}
                label="Frecuencia Respiratoria (rpm)"
                inputPlaceholder="Ingrese la frecuencia respiratoria"
                className="col-span-1"
                value=""
            />
            <InputForm
                control={control}
                name="saturacion_oxigeno"
                rules={validationExamenes.saturacion_oxigeno}
                errors={errors}
                label="Saturación de Oxígeno (%)"
                inputPlaceholder="Ingrese la saturación de oxígeno"
                className="col-span-1"
                value=""
            />
            <InputForm
                control={control}
                name="tension_arterial"
                rules={validationExamenes.tension_arterial}
                errors={errors}
                label="Tensión Arterial (mmHg)"
                inputPlaceholder="Ingrese la tensión arterial"
                className="col-span-1"
                value=""
            />

            {/* Sección Peso y Talla */}
            <SectionTitle
                text="Peso y Talla"
                className="col-span-1 md:col-span-2 lg:col-span-4"
            />
            <InputForm
                control={control}
                name="peso"
                rules={validationExamenes.peso}
                errors={errors}
                label="Peso (kg)"
                inputPlaceholder="Ingrese el peso"
                className="col-span-1"
                value=""
            />
            <InputForm
                control={control}
                name="talla"
                rules={validationExamenes.talla}
                errors={errors}
                label="Talla (cm)"
                inputPlaceholder="Ingrese la talla"
                className="col-span-1"
                value=""
            />
            <InputForm
                control={control}
                name="percentil"
                rules={validationExamenes.percentil}
                errors={errors}
                label="Percentil"
                inputPlaceholder="Ingrese el percentil"
                className="col-span-1"
                value=""
            />
            <InputForm
                control={control}
                name="imc"
                rules={validationExamenes.imc}
                errors={errors}
                label="Índice de Masa Corporal (IMC)"
                inputPlaceholder="Ingrese el IMC"
                className="col-span-1"
                value=""
            />

            {/* Sección Estado Nutricional */}
            <SectionTitle
                text="Estado Nutricional"
                className="col-span-1 md:col-span-2 lg:col-span-4"
            />
            <InputSelect
                control={control}
                name="deficit_zinc"
                validation={validationExamenes.deficit_zinc}
                errors={errors}
                label="Déficit de Zinc"
                options={options}
                className="col-span-1"
            />
            <InputSelect
                control={control}
                name="deficit_acido_folico"
                validation={validationExamenes.deficit_acido_folico}
                errors={errors}
                label="Déficit de Ácido Fólico"
                options={options}
                className="col-span-1"
            />
            <InputSelect
                control={control}
                name="deficit_vitamina_d"
                validation={validationExamenes.deficit_vitamina_d}
                errors={errors}
                label="Déficit de Vitamina D"
                options={options}
                className="col-span-1"
            />
            <InputSelect
                control={control}
                name="desnutricion"
                validation={validationExamenes.desnutricion}
                errors={errors}
                label="Desnutrición"
                options={options}
                className="col-span-1"
            />
            <InputSelect
                control={control}
                name="obesidad"
                validation={validationExamenes.obesidad}
                errors={errors}
                label="Obesidad"
                options={options}
                className="col-span-1"
            />
            {/* Botón */}
            <div className="col-span-4 flex justify-end mt-6">
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Guardando...' : 'Guardar'}
                </Button>
            </div>
        </form>
    )
}

export default FormExamenesFisicos
