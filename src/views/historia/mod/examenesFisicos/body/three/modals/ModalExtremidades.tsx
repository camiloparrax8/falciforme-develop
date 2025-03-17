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
    } = useForm<ExtremidadesData>({
        defaultValues: defaultValuesExtremidades,
    })

    const { updateExtremidades, isLoading, result } = useExamenFisicoUpdate()
    const { idExamenFisico } = useExamenFisico()
    const [showMessage, setShowMessage] = useState(false)

    useEffect(() => {
        console.log(
            'ID del examen físico en ModalExtremidades:',
            idExamenFisico,
        )
    }, [idExamenFisico])

    const onSubmit = async (data: ExtremidadesData) => {
        try {
            console.log(
                'Enviando actualización de extremidades con ID de examen físico:',
                idExamenFisico,
            )
            console.log('Datos del formulario:', data)

            await updateExtremidades(data)
            setShowMessage(true)

            // Cerrar automáticamente después de 2 segundos en caso de éxito
            if (result?.success) {
                setTimeout(() => {
                    setShowMessage(false)
                    onClose()
                }, 2000)
            }
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
            onRequestClose={onRequestClose}
            onClose={onClose}
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
                    />

                    <div className="flex justify-end">
                        <Button
                            type="submit"
                            className="ml-2"
                            disabled={isLoading || !idExamenFisico}
                        >
                            {isLoading ? 'Guardando...' : 'Guardar'}
                        </Button>
                    </div>
                </form>
            </div>
        </Dialog>
    )
}
