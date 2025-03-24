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
    1: {
        title: 'Anemia Microcítica - Tratamiento y Prevención',
        diagnostico: 'Anemia Microcítica',
        message: (
            <>
                <h6 className="text-lg font-bold">⚠️ Prevención</h6>
                <ul className="list-disc ml-5">
                    <li>
                        Suplementación con hierro oral o intravenoso (si hay
                        déficit de hierro).
                    </li>
                    <li>
                        Tratamiento de la causa subyacente (control de
                        hemorragias gastrointestinales).
                    </li>
                    <li>
                        Terapia con agentes estimulantes de la eritropoyesis.
                    </li>
                    <li>Transfusiones de sangre en casos graves.</li>
                </ul>

                <h6 className="text-lg font-bold mt-3">💉 Tratamiento</h6>
                <ul className="list-disc ml-5">
                    <li>Hemograma completo (MCV bajo).</li>
                    <li>Ferritina sérica y hierro sérico.</li>
                    <li>Capacidad total de fijación de hierro (TIBC).</li>
                    <li>
                        Electroforesis de hemoglobina (para detectar
                        talasemias).
                    </li>
                    <li>
                        Endoscopía o colonoscopía (si se sospecha pérdida de
                        sangre).
                    </li>
                </ul>

                <h6 className="text-lg font-bold mt-3">👨‍⚕️ Recomendaciones</h6>
                <ul className="list-disc ml-5">
                    <li>
                        Consumir alimentos ricos en hierro (carnes rojas,
                        legumbres, vegetales de hoja verde).
                    </li>
                    <li>
                        Aumentar la ingesta de vitamina C para mejorar la
                        absorción de hierro.
                    </li>
                    <li>Evitar té y café durante las comidas.</li>
                    <li>Identificar y tratar la causa subyacente.</li>
                </ul>
            </>
        ),
        className: 'text-red-600 font-bold',
    },
    2: {
        title: 'Anemia Normocítica - Cuidados y Tratamiento',
        diagnostico: 'Anemia Normocítica',
        message: (
            <>
                <h6 className="text-lg font-bold">🚨 Prevención</h6>
                <ul className="list-disc ml-5">
                    <li>
                        Tratar la causa subyacente (infecciones, inflamación,
                        enfermedad renal).
                    </li>
                    <li>
                        Terapia con eritropoyetina (en insuficiencia renal
                        crónica).
                    </li>
                    <li>
                        Suplementación con hierro (si hay deficiencia
                        funcional).
                    </li>
                    <li>Transfusiones de sangre en casos graves.</li>
                </ul>

                <h6 className="text-lg font-bold mt-3">💊 Tratamiento</h6>
                <ul className="list-disc ml-5">
                    <li>Hemograma completo (MCV normal).</li>
                    <li>Pruebas de inflamación (PCR, VSG).</li>
                    <li>Función renal (urea, creatinina).</li>
                    <li>Hormonas tiroideas.</li>
                    <li>Biopsia de médula ósea (en casos específicos).</li>
                    <li>Niveles de reticulocitos.</li>
                </ul>

                <h6 className="text-lg font-bold mt-3">👩‍⚕️ Recomendaciones</h6>
                <ul className="list-disc ml-5">
                    <li>
                        Mantener una dieta balanceada con hierro, vitamina B12 y
                        ácido fólico.
                    </li>
                    <li>Controlar enfermedades crónicas subyacentes.</li>
                    <li>
                        Vigilar la actividad física para evitar fatiga excesiva.
                    </li>
                    <li>Realizar chequeos regulares si es secundaria.</li>
                </ul>
            </>
        ),
        className: 'text-red-600 font-bold',
    },
    3: {
        title: 'Anemia Macrocítica - Cuidados y Tratamiento',
        diagnostico: 'Anemia Macrocítica',
        message: (
            <>
                <h6 className="text-lg font-bold">🚨 Prevención</h6>
                <ul className="list-disc ml-5">
                    <li>Hemograma completo (MCV alto).</li>
                    <li>Niveles de vitamina B12 y ácido fólico.</li>
                    <li>Función hepática (AST, ALT, bilirrubina).</li>
                    <li>TSH y T4 (función tiroidea).</li>
                    <li>Frotis de sangre periférica.</li>
                    <li>Estudios de médula ósea (en casos dudosos).</li>
                </ul>

                <h6 className="text-lg font-bold mt-3">💊 Tratamiento</h6>
                <ul className="list-disc ml-5">
                    <li>
                        Suplementación con ácido fólico o vitamina B12 (según la
                        deficiencia).
                    </li>
                    <li>
                        Tratamiento de trastornos hepáticos o tiroideos
                        asociados.
                    </li>
                    <li>Suspender medicamentos causantes (si aplicable).</li>
                    <li>Transfusiones en casos graves.</li>
                </ul>

                <h6 className="text-lg font-bold mt-3">👩‍⚕️ Recomendaciones</h6>
                <ul className="list-disc ml-5">
                    <li>
                        Incrementar alimentos ricos en vitamina B12 (pescados,
                        huevos, lácteos) y ácido fólico.
                    </li>
                    <li>Limitar el consumo de alcohol.</li>
                    <li>
                        Realizar controles regulares si hay anemia perniciosa.
                    </li>
                    <li>
                        Tratar enfermedades asociadas como hipotiroidismo o
                        insuficiencia hepática.
                    </li>
                </ul>
            </>
        ),
        className: 'text-red-600 font-bold',
    },
    0: {
        title: ' No se detectaron signos de anemia',
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
            gender: '',
            hemoglobin: '',
            mcv: '',
            mch: '',
            mchc: '',
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
            gender: Number(data.gender),
            hemoglobin: Number(data.hemoglobin),
            mcv: Number(data.mcv),
            mch: Number(data.mch),
            mchc: Number(data.mchc),
        }

        try {
            const response = await axios.post(
                'https://anemia-classifier-back-production.up.railway.app/api/v1/predict-type',
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
                        <SelectSexo
                            control={control}
                            name="gender"
                            rules={validationFormAnemia.decimales}
                            errors={errors}
                            className="col-span-1"
                        />
                        <InputForm
                            control={control}
                            name="hemoglobin"
                            rules={validationFormAnemia.decimales}
                            errors={errors}
                            label="Hemoglobina (HGB)"
                            inputPlaceholder="Ej: 14.7"
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
                        <Link to="/gadgets/anemia/type/historial">
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
                                        recomendaciones[diagnostico.prediction]
                                            ?.className
                                    }
                                >
                                    {diagnostico.prediction === 0
                                        ? 'Negativo'
                                        : recomendaciones[diagnostico.prediction].diagnostico}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Botón solo si hay anemia */}
                    {diagnostico &&
                        diagnostico.prediction !== 0 &&
                        recomendaciones[diagnostico.prediction] && (
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
                                recomendaciones[diagnostico.prediction].title}
                        </h5>
                        {diagnostico &&
                            recomendaciones[diagnostico.prediction].message}
                    </Dialog>
                </AdaptiveCard>
            </div>
        </Container>
    )
}

export default Formulario
