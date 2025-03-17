import { Button } from '@/components/ui'
import InputForm from '@/views/common/form/InputForm'
import InputSelect from '@/views/common/form/InputSelect'
import SectionTitle from '@/views/common/form/SectionTitle'
import { useForm } from 'react-hook-form'
import validationExamenes from '../../.././../validation/validationExamenesFisicos'
import defaultValues from './defaultValues'
import { crearExamenFisico } from '@/customService/services/examenesFisicosService'
import { useToken, useSessionUser } from '@/store/authStore'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useExamenFisico } from '@/hooks/useExamenFisico'
import { ExamenFisicoData } from '@/context/ExamenFisicoContext'

interface FormExamenesFisicosProps {
    examenExistente?: ExamenFisicoData | null
}

function FormExamenesFisicos({ examenExistente }: FormExamenesFisicosProps) {
    const { id_paciente } = useParams()
    const { token } = useToken()
    const { user } = useSessionUser() // Obtén el usuario logueado
    const [isLoading, setIsLoading] = useState(false)
    const [mensaje, setMensaje] = useState<{
        tipo: 'success' | 'error'
        texto: string
    } | null>(null)
    const { setIdExamenFisico } = useExamenFisico() // Usar el contexto

    // Preparar valores iniciales basados en el examen existente o los valores por defecto
    const initialValues = examenExistente
        ? {
              frecuencia_cardiaca:
                  examenExistente.frecuencia_cardiaca?.toString() || '',
              frecuencia_respiratoria:
                  examenExistente.frecuencia_respiratoria?.toString() || '',
              saturacion_oxigeno:
                  examenExistente.saturacion_oxigeno?.toString() || '',
              tension_arterial: examenExistente.tension_arterial || '',
              peso: examenExistente.peso?.toString() || '',
              talla: examenExistente.talla?.toString() || '',
              percentil: examenExistente.percentil?.toString() || '',
              imc: examenExistente.imc?.toString() || '',
              deficit_zinc: examenExistente.deficit_zinc ? 'true' : 'false',
              deficit_acido_folico: examenExistente.deficit_acido_folico
                  ? 'true'
                  : 'false',
              deficit_vitamina_d: examenExistente.deficit_vitamina_d
                  ? 'true'
                  : 'false',
              desnutricion: examenExistente.desnutricion ? 'true' : 'false',
              obesidad: examenExistente.obesidad ? 'true' : 'false',
          }
        : defaultValues

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
        setValue,
    } = useForm({
        defaultValues: initialValues,
    })

    // Observar los cambios en peso y talla para calcular el IMC
    const peso = watch('peso')
    const talla = watch('talla')

    // Calcular IMC cuando cambie el peso o la talla
    useEffect(() => {
        if (peso && talla) {
            // Convertir valores a números
            const pesoNum = parseFloat(peso)
            const tallaNum = parseFloat(talla)

            if (!isNaN(pesoNum) && !isNaN(tallaNum) && tallaNum > 0) {
                // Calcular IMC: peso (kg) / (altura (m))²
                // La talla está en cm, por lo que dividimos por 100 para convertir a metros
                const tallaMetros = tallaNum / 100
                const imcCalculado = pesoNum / (tallaMetros * tallaMetros)

                // Redondear a 2 decimales y establecer el valor
                setValue('imc', imcCalculado.toFixed(2))
            }
        }
    }, [peso, talla, setValue])

    // Cuando cambie el examen existente, actualizar el formulario
    useEffect(() => {
        if (examenExistente) {
            reset({
                frecuencia_cardiaca:
                    examenExistente.frecuencia_cardiaca?.toString() || '',
                frecuencia_respiratoria:
                    examenExistente.frecuencia_respiratoria?.toString() || '',
                saturacion_oxigeno:
                    examenExistente.saturacion_oxigeno?.toString() || '',
                tension_arterial: examenExistente.tension_arterial || '',
                peso: examenExistente.peso?.toString() || '',
                talla: examenExistente.talla?.toString() || '',
                percentil: examenExistente.percentil?.toString() || '',
                imc: examenExistente.imc?.toString() || '',
                deficit_zinc: examenExistente.deficit_zinc ? 'true' : 'false',
                deficit_acido_folico: examenExistente.deficit_acido_folico
                    ? 'true'
                    : 'false',
                deficit_vitamina_d: examenExistente.deficit_vitamina_d
                    ? 'true'
                    : 'false',
                desnutricion: examenExistente.desnutricion ? 'true' : 'false',
                obesidad: examenExistente.obesidad ? 'true' : 'false',
            })

            // Si ya existe un examen, asegúrese de que el ID esté en el contexto
            if (examenExistente.id) {
                setIdExamenFisico(examenExistente.id)
            }
        }
    }, [examenExistente, reset, setIdExamenFisico])

    const onSubmit = async (data) => {
        setIsLoading(true)
        setMensaje(null)

        try {
            if (!id_paciente) {
                throw new Error('ID del paciente no proporcionado')
            }

            // Si ya existe un examen físico, mostrar mensaje informativo
            if (examenExistente) {
                setMensaje({
                    tipo: 'success',
                    texto: 'Ya existe un examen físico para este paciente. Utilice las secciones específicas para actualizar cada parte.',
                })
                setIsLoading(false)
                return
            }

            const formData = {
                ...data,
                id_paciente: id_paciente,
                id_user_create: user.id,
            }
            const result = await crearExamenFisico(token, formData)
            console.log('Examen físico creado:', result)

            // Guardar el ID del examen físico en el contexto
            if (result && result.data && result.data.id) {
                setIdExamenFisico(result.data.id)
                setMensaje({
                    tipo: 'success',
                    texto: 'Examen físico creado correctamente',
                })
                console.log(
                    'ID del examen físico guardado en el contexto:',
                    result.data.id,
                )
            }
        } catch (error) {
            console.error('Error al crear el examen físico:', error)
            setMensaje({
                tipo: 'error',
                texto:
                    'Error al crear el examen físico: ' +
                    (error.message || 'Error desconocido'),
            })
        } finally {
            setIsLoading(false)
        }
    }

    console.log('ID del paciente recibido:', id_paciente)
    console.log('Examen existente:', examenExistente)

    const options = [
        { value: 'true', label: 'Sí' },
        { value: 'false', label: 'No' },
    ]

    // Determinar si los campos deben estar deshabilitados
    const isDisabled = examenExistente !== null

    return (
        <form
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full"
            onSubmit={handleSubmit(onSubmit)}
        >
            {mensaje && (
                <div
                    className={`col-span-1 md:col-span-2 lg:col-span-4 p-3 mb-3 rounded
                    ${mensaje.tipo === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                >
                    {mensaje.texto}
                </div>
            )}

            {examenExistente && (
                <div className="col-span-1 md:col-span-2 lg:col-span-4 p-3 mb-3 rounded bg-blue-100 text-blue-800">
                    Examen físico existente. Los cambios se aplicarán a las
                    secciones específicas a través de los modales.
                </div>
            )}

            <div
                className={`col-span-full ${isDisabled ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
                {/* Sección Signos Vitales */}
                <SectionTitle
                    text="Signos Vitales"
                    className="col-span-1 md:col-span-2 lg:col-span-4"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                    <InputForm
                        control={control}
                        name="frecuencia_cardiaca"
                        rules={validationExamenes.frecuencia_cardiaca}
                        errors={errors}
                        label="Frecuencia Cardiaca (lpm)"
                        inputPlaceholder="Ingrese la frecuencia cardiaca"
                        className="col-span-1"
                        value=""
                        disabled={isDisabled}
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
                        disabled={isDisabled}
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
                        disabled={isDisabled}
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
                        disabled={isDisabled}
                    />
                </div>

                {/* Sección Peso y Talla */}
                <SectionTitle
                    text="Peso y Talla"
                    className="col-span-1 md:col-span-2 lg:col-span-4 mt-4"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                    <InputForm
                        control={control}
                        name="peso"
                        rules={validationExamenes.peso}
                        errors={errors}
                        label="Peso (kg)"
                        inputPlaceholder="Ingrese el peso"
                        className="col-span-1"
                        value=""
                        disabled={isDisabled}
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
                        disabled={isDisabled}
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
                        disabled={isDisabled}
                    />
                    <InputForm
                        control={control}
                        name="imc"
                        rules={validationExamenes.imc}
                        errors={errors}
                        label="Índice de Masa Corporal (IMC)"
                        inputPlaceholder="Se calcula automáticamente"
                        className="col-span-1"
                        value=""
                        disabled={true} // Siempre deshabilitado porque se calcula automáticamente
                    />
                </div>

                {/* Sección Estado Nutricional */}
                <SectionTitle
                    text="Estado Nutricional"
                    className="col-span-1 md:col-span-2 lg:col-span-4 mt-4"
                />
                <div
                    className={`${isDisabled ? 'opacity-70 pointer-events-none' : ''}`}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
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
                    </div>
                </div>
            </div>

            {/* Botón */}
            <div className="col-span-4 flex justify-end mt-6">
                <Button
                    type="submit"
                    disabled={isLoading || examenExistente !== null}
                >
                    {isLoading
                        ? 'Guardando...'
                        : examenExistente
                          ? 'Examen existente'
                          : 'Guardar'}
                </Button>
            </div>
        </form>
    )
}

export default FormExamenesFisicos
