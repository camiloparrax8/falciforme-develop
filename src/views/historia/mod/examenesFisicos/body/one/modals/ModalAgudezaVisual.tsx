import { Dialog } from '@/components/ui'
import InputForm from '@/views/common/form/InputForm'
import { useForm } from 'react-hook-form'
import validationSeccionOne from '../../../../../../../validation/validationSeccionOne'
import { defaultValuesVisual } from '../../one/modals/defaultValuesSeccionOne'
import Button from '@/components/ui/Button'
import { useExamenFisicoUpdate } from '@/hooks/useExamenFisicoUpdate'
import { useState, useEffect } from 'react'
import { useExamenFisico } from '@/hooks/useExamenFisico'

interface AgudezaVisualData {
    vision: string
}

export default function ModalAgudezaVisual({
    isOpen,
    onClose,
    onRequestClose,
}) {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<AgudezaVisualData>({
        defaultValues: defaultValuesVisual,
    })

    const { updateAgudezaVisual, isLoading, result } = useExamenFisicoUpdate()
    const { idExamenFisico } = useExamenFisico()
    const [showMessage, setShowMessage] = useState(false)

    useEffect(() => {
        console.log(
            'ID del examen físico en ModalAgudezaVisual:',
            idExamenFisico,
        )
    }, [idExamenFisico])

    const onSubmit = async (data: AgudezaVisualData) => {
        try {
            console.log(
                'Enviando actualización con ID de examen físico:',
                idExamenFisico,
            )
            await updateAgudezaVisual({ visualizacion: data.vision })
            setShowMessage(true)

            if (result?.success) {
                setTimeout(() => {
                    setShowMessage(false)
                    onClose()
                }, 2000)
            }
        } catch (error) {
            console.error('Error al actualizar agudeza visual:', error)
            setShowMessage(true)
        }
    }

    return (
        <Dialog
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            onClose={onClose}
        >
            <form
                className="flex flex-col space-y-4 h-full"
                onSubmit={handleSubmit(onSubmit)}
            >
                <h5 className="text-lg font-semibold">Agudeza Visual</h5>

                {showMessage && result && (
                    <div
                        className={`p-2 rounded ${result.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                    >
                        {result.message}
                    </div>
                )}

                {idExamenFisico ? (
                    <div className="bg-blue-100 text-blue-800 p-2 rounded">
                        Examen físico activo ID: {idExamenFisico}
                    </div>
                ) : (
                    <div className="bg-yellow-100 text-yellow-800 p-2 rounded">
                        No hay un examen físico activo. Debe crear uno primero.
                    </div>
                )}

                <InputForm
                    control={control}
                    name="vision"
                    label="Visión"
                    inputPlaceholder="Ingrese la visión"
                    rules={validationSeccionOne.vision}
                    className="col-span-3"
                    errors={errors}
                    value=""
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
        </Dialog>
    )
}
