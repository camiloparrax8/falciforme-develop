import { useForm } from 'react-hook-form'
import { Dialog } from '@/components/ui'
import InputForm from '@/views/common/form/InputForm'
import SelectMultiple from '@/views/common/form/SelectMultiple'
import Button from '@/components/ui/Button'
import validationSeccionThree from '../../../../../../../validation/validationSeccionThree'
import { defaultValuesExtremidades } from '../../three/modals/defaultValuesSeccionThree'
import { useExamenFisicoUpdate } from '@/hooks/useExamenFisicoUpdate'
import { useState, useEffect, useCallback } from 'react'
import { useExamenFisico } from '@/hooks/useExamenFisico'
import { useToken } from '@/store/authStore'
import { useParams } from 'react-router-dom'
import { consultarExamenFisicoPorPaciente } from '@/customService/services/examenesFisicosService'

interface ExtremidadesData {
    observacion: string
    piel: string
    edemasUlceras: string[]
}

export default function ModalExtremidades({ isOpen, onClose, onRequestClose }) {
    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<ExtremidadesData>({
        defaultValues: defaultValuesExtremidades,
    })

    const { updateExtremidades, isLoading, result } = useExamenFisicoUpdate()
    const { idExamenFisico, examenData, setExamenData } = useExamenFisico()
    const [showMessage, setShowMessage] = useState(false)
    const [existeRegistro, setExisteRegistro] = useState(false)
    const { token } = useToken()
    const { id_paciente } = useParams()

    const verificarExistenciaRegistro = useCallback(() => {
        if (!examenData) return false

        const tieneObservacion =
            examenData.extremidades_observacion !== undefined &&
            examenData.extremidades_observacion !== null &&
            examenData.extremidades_observacion !== ''

        const tienePiel =
            examenData.extremidades_estado_piel !== undefined &&
            examenData.extremidades_estado_piel !== null &&
            examenData.extremidades_estado_piel !== ''

        const tieneEdemasUlceras =
            Array.isArray(examenData.extremidades_condicion) &&
            examenData.extremidades_condicion.length > 0

        return tieneObservacion || tienePiel || tieneEdemasUlceras
    }, [examenData])

    const actualizarContexto = useCallback(async () => {
        if (!id_paciente || !token) return

        try {
            const resultado = await consultarExamenFisicoPorPaciente(
                token,
                id_paciente,
            )

            const examenActualizado = resultado?.data || resultado

            if (examenActualizado && examenActualizado.id) {
                setExamenData(examenActualizado)
            }
        } catch (error) {
            console.error('Error al actualizar datos del examen:', error)
        }
    }, [id_paciente, token, setExamenData])

    useEffect(() => {
        if (isOpen) {
            actualizarContexto()
        }
    }, [isOpen, actualizarContexto])

    useEffect(() => {
        if (isOpen && examenData) {
            const tieneObservacion = verificarExistenciaRegistro()
            setValue(
                'observacion',
                tieneObservacion
                    ? String(examenData.extremidades_observacion)
                    : '',
            )
            setExisteRegistro(tieneObservacion)
        }
    }, [isOpen, examenData, setValue, verificarExistenciaRegistro])

    const onSubmit = async (data: ExtremidadesData) => {
        try {
            await updateExtremidades(data)
            setShowMessage(true)

            // Actualizar el contexto inmediatamente
            await actualizarContexto()

            setTimeout(() => {
                setShowMessage(false)
                if (onClose) {
                    onClose()
                }
            }, 1000)
        } catch (error) {
            console.error(
                'Error al actualizar información de extremidades:',
                error,
            )
            setShowMessage(true)
        }
    }

    const opcionesExtremidades = [
        { value: 'edemas', label: 'Edemas' },
        { value: 'ulceras', label: 'Úlceras' },
    ]

    return (
        <Dialog
            isOpen={isOpen}
            onRequestClose={() => {
                setShowMessage(false)
                onRequestClose()
            }}
            onClose={() => {
                setShowMessage(false)
                onClose()
            }}
        >
            <div className="flex flex-col h-full space-y-4">
                <h5 className="text-lg font-bold">Extremidades</h5>

                {showMessage && result && (
                    <div
                        className={`p-2 rounded ${result.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                    >
                        {result.message}
                    </div>
                )}

                {existeRegistro && (
                    <div className="bg-yellow-100 text-yellow-800 p-2 rounded">
                        Este registro ya existe y no puede ser modificado.
                    </div>
                )}

                {idExamenFisico ? (
                    <div className="bg-blue-100 text-blue-800 p-2 rounded">
                        Examen físico activo.
                    </div>
                ) : (
                    <div className="bg-yellow-100 text-yellow-800 p-2 rounded">
                        No hay un examen físico activo. Debe crear uno primero.
                    </div>
                )}

                <form
                    className="flex flex-col space-y-4"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <InputForm
                        control={control}
                        name="observacion"
                        label="Observación"
                        inputPlaceholder="Ingrese observaciones"
                        rules={validationSeccionThree.observacion}
                        errors={errors}
                        className="col-span-3"
                        value=""
                        disabled={existeRegistro}
                    />

                    <InputForm
                        control={control}
                        name="piel"
                        label="Estado de la piel"
                        inputPlaceholder="Describa el estado de la piel"
                        rules={validationSeccionThree.piel}
                        errors={errors}
                        className="col-span-3"
                        value=""
                        disabled={existeRegistro}
                    />

                    <SelectMultiple
                        control={control}
                        name="edemasUlceras"
                        label="Edemas y Úlceras"
                        className="col-span-3"
                        placeholder="Seleccione las condiciones"
                        options={opcionesExtremidades}
                        validation={validationSeccionThree.edemasUlceras}
                        defaultValue={[]}
                        errors={errors}
                        isDisabled={existeRegistro}
                    />

                    <div className="flex justify-end">
                        <Button
                            type="submit"
                            className="ml-2"
                            disabled={
                                isLoading || !idExamenFisico || existeRegistro
                            }
                        >
                            {isLoading ? 'Guardando...' : 'Guardar'}
                        </Button>
                    </div>
                </form>
            </div>
        </Dialog>
    )
}
