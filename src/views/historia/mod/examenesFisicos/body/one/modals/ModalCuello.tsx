import { useForm } from 'react-hook-form'
import { Dialog } from '@/components/ui'
import InputForm from '@/views/common/form/InputForm'
import Button from '@/components/ui/Button'
import validationSeccionOne from '../../../../../../../validation/validationSeccionOne'
import { defaultValuesCuello } from '../../one/modals/defaultValuesSeccionOne'
import { useExamenFisicoUpdate } from '@/hooks/useExamenFisicoUpdate'
import { useState } from 'react'

interface CuelloData {
    observacion: string
}

export default function ModalCuello({ isOpen, onClose, onRequestClose }) {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<CuelloData>({
        defaultValues: defaultValuesCuello,
    })

    const { updateCuello, isLoading, result } = useExamenFisicoUpdate()
    const [showMessage, setShowMessage] = useState(false)

    const onSubmit = async (data: CuelloData) => {
        try {
            await updateCuello(data)
            setShowMessage(true)

            // Cerrar automáticamente después de 2 segundos en caso de éxito
            if (result?.success) {
                setTimeout(() => {
                    setShowMessage(false)
                    onClose()
                }, 2000)
            }
        } catch (error) {
            console.error('Error al actualizar información del cuello:', error)
            setShowMessage(true)
        }
    }

    return (
        <Dialog
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            onClose={onClose}
        >
            <div className="flex flex-col h-full space-y-4">
                <h5 className="text-lg font-bold">Cuello</h5>

                {showMessage && result && (
                    <div
                        className={`p-2 rounded ${result.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                    >
                        {result.message}
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
                        inputPlaceholder="Ingrese la observación"
                        rules={validationSeccionOne.observacion}
                        className="col-span-3"
                        errors={errors}
                        value=""
                    />

                    <div className="flex justify-end">
                        <Button
                            type="submit"
                            className="ml-2"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Guardando...' : 'Guardar'}
                        </Button>
                    </div>
                </form>
            </div>
        </Dialog>
    )
}
