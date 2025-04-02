import { useForm } from 'react-hook-form'
import { Dialog } from '@/components/ui'
import InputForm from '@/views/common/form/InputForm'
import SelectMultiple from '@/views/common/form/SelectMultiple'
import Button from '@/components/ui/Button'
import validationSeccionThree from '../../../../../../../validation/validationSeccionThree'
import { defaultValuesExtremidades } from '../../three/modals/defaultValuesSeccionThree'
import { useExamenFisicoUpdate } from '@/hooks/useExamenFisicoUpdate'
import { useState, useEffect } from 'react'
import { useExamenFisico } from '@/hooks/useExamenFisico'

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
    const { idExamenFisico, examenData } = useExamenFisico()
    const [showMessage, setShowMessage] = useState(false)
    const [existeRegistro, setExisteRegistro] = useState(false)



    const onSubmit = async (data: ExtremidadesData) => {
        try {
            await updateExtremidades(data)
            setShowMessage(true)
            setExisteRegistro(true)

            // Cerrar automáticamente después de 2 segundos
            setTimeout(() => {
                setShowMessage(false)
                if (onClose) {
                    onClose()
                }
            }, 2000)
        } catch (error) {
            console.error(
                'Error al actualizar información de extremidades:',
                error,
            )
            setShowMessage(true)
        }
    }

    useEffect(() => {
        if (isOpen && examenData) {
            // Verificar usando los nombres correctos de propiedad
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

            // Si cualquiera de los campos tiene datos, consideramos que el registro existe
            const tieneRegistro =
                tieneObservacion || tienePiel || tieneEdemasUlceras

            // Establecer los valores de los campos
            if (tieneObservacion) {
                setValue(
                    'observacion',
                    String(examenData.extremidades_observacion),
                )
            }

            if (tienePiel) {
                setValue('piel', String(examenData.extremidades_estado_piel))
            }

            if (tieneEdemasUlceras) {
                setValue(
                    'edemasUlceras',
                    tieneEdemasUlceras &&
                        typeof examenData.extremidades_condicion === 'string'
                        ? [examenData.extremidades_condicion]
                        : [],
                )
            }

            setExisteRegistro(tieneRegistro)
        } else {
            setExisteRegistro(false)
        }
    }, [isOpen, examenData, setValue])

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
