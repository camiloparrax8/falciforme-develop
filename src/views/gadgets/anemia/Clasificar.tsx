import { useState, type MouseEvent } from 'react'
import axios from 'axios'
import AdaptiveCard from '@/components/shared/AdaptiveCard'
import Container from '@/components/shared/Container'
import { useForm } from 'react-hook-form'
import InputForm from '@/views/common/form/InputForm'
import Button from '@/components/ui/Button'
import validationFormAnemia from '../../../validation/validationFormAnemia'
import SelectSexo from '@/views/common/form/SelectSexo'
import Dialog from '@/components/ui/Dialog'
import { FaInfoCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const recomendaciones = {
    'Anemia Normocitica': {
        title: 'Anemia Normocítica - Tratamiento y Prevención',
        message: (
            <>
                <h6 className="text-lg font-bold">⚠️ Prevención</h6>
                <ul className="list-disc ml-5">
                    <li>
                        Consumir alimentos ricos en hierro: carne roja,
                        espinacas, lentejas.
                    </li>
                    <li>
                        Asegurar niveles adecuados de vitamina B12 y ácido
                        fólico.
                    </li>
                    <li>
                        Controlar enfermedades subyacentes como insuficiencia
                        renal o inflamación crónica.
                    </li>
                </ul>

                <h6 className="text-lg font-bold mt-3">💉 Tratamiento</h6>
                <ul className="list-disc ml-5">
                    <li>Suplementos de hierro si hay deficiencia.</li>
                    <li>Inyecciones de eritropoyetina en casos graves.</li>
                    <li>Tratar la enfermedad de base que causa la anemia.</li>
                </ul>

                <h6 className="text-lg font-bold mt-3">👨‍⚕️ Recomendaciones</h6>
                <ul className="list-disc ml-5">
                    <li>
                        Chequeos médicos periódicos con hemogramas completos.
                    </li>
                    <li>
                        Consultar con un especialista si hay fatiga extrema o
                        mareos frecuentes.
                    </li>
                </ul>
            </>
        ),
        className: 'text-red-600 font-bold',
    },
    'Anemia Falciforme': {
        title: 'Anemia Falciforme - Cuidados y Tratamiento',
        message: (
            <>
                <h6 className="text-lg font-bold">🚨 Prevención</h6>
                <ul className="list-disc ml-5">
                    <li>
                        Mantenerse hidratado (mínimo 2-3 litros de agua al día).
                    </li>
                    <li>
                        Evitar temperaturas extremas y actividades de alto
                        esfuerzo.
                    </li>
                    <li>Recibir vacunas para prevenir infecciones.</li>
                </ul>

                <h6 className="text-lg font-bold mt-3">💊 Tratamiento</h6>
                <ul className="list-disc ml-5">
                    <li>
                        Hidroxiurea para reducir crisis dolorosas y necesidad de
                        transfusiones.
                    </li>
                    <li>Transfusiones sanguíneas en casos graves.</li>
                    <li>
                        Posible trasplante de médula ósea en pacientes
                        seleccionados.
                    </li>
                </ul>

                <h6 className="text-lg font-bold mt-3">👩‍⚕️ Recomendaciones</h6>
                <ul className="list-disc ml-5">
                    <li>Evitar estrés físico y emocional extremo.</li>
                    <li>
                        Controlar la fiebre y acudir al médico si hay signos de
                        infección.
                    </li>
                    <li>Seguimiento constante con un hematólogo.</li>
                </ul>
            </>
        ),
        className: 'text-red-600 font-bold',
    },
    'No Anemia': {
        title: 'Negativo para anemia',
        className: 'text-green-600 font-bold',
    },
}

const Formulario = () => {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            edad: '',
            sexo: '',
            rbc: '',
            pcv: '',
            mcv: '',
            mch: '',
            mchc: '',
            rdw: '',
            tlc: '',
            plt: '',
            hgb: '',
        },
    })

    const [diagnostico, setDiagnostico] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [dialogIsOpen, setIsOpen] = useState(false)

    const onSubmit = async (data) => {
        setLoading(true)
        setError(null)

        const formattedData = {
            edad: Number(data.edad),
            sexo: Number(data.sexo),
            rbc: Number(data.rbc),
            pcv: Number(data.pcv),
            mcv: Number(data.mcv),
            mch: Number(data.mch),
            mchc: Number(data.mchc),
            rdw: Number(data.rdw),
            tlc: Number(data.tlc),
            plt: Number(data.plt),
            hgb: Number(data.hgb),
        }

        try {
            const response = await axios.post(
                'https://anemia-classifier-back-production.up.railway.app/api/v1/predict',
                formattedData,
            )
            setDiagnostico(response.data)
            reset()
        } catch (err) {
            setError('Error al realizar el diagnóstico.')
        } finally {
            setLoading(false)
        }
    }

    const openDialog = () => {
        setIsOpen(true)
    }

    const onDialogCloseHC = (e: MouseEvent) => {
        setIsOpen(false)
    }

    return (
        <Container>
            <div className="flex flex-col md:flex-row gap-4 w-full">
                {/* Formulario */}
                <AdaptiveCard className="w-full md:w-2/3">
                    <div className="flex flex-col gap-4">
                        <h5>Datos para la clasificación de anemia</h5>
                    </div>

                    <form
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full mt-4"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <InputForm
                            control={control}
                            name="edad"
                            rules={validationFormAnemia.edad}
                            errors={errors}
                            label="Edad"
                            inputPlaceholder="Ej: 35"
                            className="col-span-1"
                            value=""
                        />
                        <SelectSexo
                            control={control}
                            name="sexo"
                            rules={validationFormAnemia.decimales}
                            errors={errors}
                            className="col-span-1"
                        />
                        <InputForm
                            control={control}
                            name="rbc"
                            rules={validationFormAnemia.decimales}
                            errors={errors}
                            label="Glóbulos Rojos (RBC)"
                            inputPlaceholder="Ej: 4.7"
                            className="col-span-1"
                            value=""
                        />
                        <InputForm
                            control={control}
                            name="pcv"
                            rules={validationFormAnemia.decimales}
                            errors={errors}
                            label="Hematocrito (PCV)"
                            inputPlaceholder="Ej: 42.0"
                            className="col-span-1"
                            value=""
                        />
                        <InputForm
                            control={control}
                            name="mcv"
                            rules={validationFormAnemia.decimales}
                            errors={errors}
                            label="Vol. Corpuscular Medio (MCV)"
                            inputPlaceholder="Ej: 88.0"
                            className="col-span-1"
                            value=""
                        />
                        <InputForm
                            control={control}
                            name="mch"
                            rules={validationFormAnemia.decimales}
                            errors={errors}
                            label="Hem. Corpuscular Media (MCH)"
                            inputPlaceholder="Ej: 29.5"
                            className="col-span-1"
                            value=""
                        />
                        <InputForm
                            control={control}
                            name="mchc"
                            rules={validationFormAnemia.decimales}
                            errors={errors}
                            label="C. Media Hemoglobina Corpuscular (MCHC)"
                            inputPlaceholder="Ej: 33.2"
                            className="col-span-1"
                            value=""
                        />
                        <InputForm
                            control={control}
                            name="rdw"
                            rules={validationFormAnemia.decimales}
                            errors={errors}
                            label="Distribución Glóbulos Rojos (RDW)"
                            inputPlaceholder="Ej: 13.8"
                            className="col-span-1"
                            value=""
                        />
                        <InputForm
                            control={control}
                            name="tlc"
                            rules={validationFormAnemia.decimales}
                            errors={errors}
                            label="Recuento Total Leucocitos (TLC)"
                            inputPlaceholder="Ej: 9.08"
                            className="col-span-1"
                            value=""
                        />
                        <InputForm
                            control={control}
                            name="plt"
                            rules={validationFormAnemia.plaquetas}
                            errors={errors}
                            label="Recuento de Plaquetas (PLT)"
                            inputPlaceholder="Ej: 280"
                            className="col-span-1"
                            value=""
                        />
                        <InputForm
                            control={control}
                            name="hgb"
                            rules={validationFormAnemia.decimales}
                            errors={errors}
                            label="Hemoglobina (HGB)"
                            inputPlaceholder="Ej: 14.0"
                            className="col-span-1 mt-5"
                            value=""
                        />

                        {/* <div className="col-span-1 flex items-end"> */}
                        <div className="col-span-1 flex justify-end items-end space-x-1">
                            <Button
                                type="submit"
                                className="w-3/3"
                                disabled={loading}
                            >
                                {loading ? 'Procesando...' : 'Diagnosticar'}
                            </Button>
                        </div>
                    </form>
                </AdaptiveCard>

                {/* Diagnóstico IA */}
                <AdaptiveCard className="w-full md:w-1/3">
                    <div className="flex items-center justify-between">
                        <h5>Diagnóstico (IA)</h5>
                        <Link to="/gadgets/anemia/historial">
                            <Button asElement="div" size="sm">
                                Ver historial
                            </Button>
                        </Link>
                    </div>
                    <div className="flex flex-col gap-4 mt-2">
                        {loading && <p>Cargando...</p>}
                        {error && <p className="text-red-500">{error}</p>}
                        {diagnostico && (
                            <div className="p-4 border rounded-md">
                                <h6 className="font-bold">Resultado:</h6>
                                <p
                                    className={
                                        recomendaciones[diagnostico.diagnosis]
                                            ?.className
                                    }
                                >
                                    {diagnostico.diagnosis === 'No Anemia'
                                        ? 'Negativo'
                                        : diagnostico.diagnosis}
                                </p>
                            </div>
                        )}                        
                    </div>

                    {/* Botón solo si hay anemia */}
                    {diagnostico &&
                        diagnostico.diagnosis !== 'No Anemia' &&
                        recomendaciones[diagnostico.diagnosis] && (
                            <div className="flex justify-end items-end mt-4">
                                <Button
                                    icon={<FaInfoCircle />}
                                    variant="solid"
                                    title="Recomendaciones"
                                    onClick={() => openDialog()}
                                >
                                    Recomendaciones
                                </Button>
                            </div>
                        )}

                    {/* Modal de Recomendaciones */}
                    <Dialog
                        isOpen={dialogIsOpen}
                        onClose={() => setIsOpen(false)}
                        width={800}
                        height={500}
                    >
                        <h5>
                            {diagnostico &&
                                recomendaciones[diagnostico.diagnosis].title}
                        </h5>
                        {diagnostico &&
                            recomendaciones[diagnostico.diagnosis].message}
                    </Dialog>
                </AdaptiveCard>
            </div>
        </Container>
    )
}

export default Formulario
