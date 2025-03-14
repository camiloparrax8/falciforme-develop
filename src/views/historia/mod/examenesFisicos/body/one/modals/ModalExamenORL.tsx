import { useForm } from 'react-hook-form'
import { Dialog } from '@/components/ui'
import InputForm from '@/views/common/form/InputForm'
import Button from '@/components/ui/Button'
import validationSeccionOne from '../../../../../../../validation/validationSeccionOne'
import { defaultValuesExamenORL } from '../../one/modals/defaultValuesSeccionOne'
import { useExamenFisicoUpdate } from '@/hooks/useExamenFisicoUpdate'
import { useState } from 'react'

interface ExamenORLData {
    boca: string
    nariz: string
    oidos: string
}

export default function ModalExamenORL({ isOpen, onClose, onRequestClose }) {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<ExamenORLData>({
        defaultValues: defaultValuesExamenORL,
    })

    const { updateExamenORL, isLoading, result } = useExamenFisicoUpdate()
    const [showMessage, setShowMessage] = useState(false)

    const onSubmit = async (data: ExamenORLData) => {
        try {
            await updateExamenORL(data)
            setShowMessage(true)

            // Cerrar automáticamente después de 2 segundos en caso de éxito
            if (result?.success) {
                setTimeout(() => {
                    setShowMessage(false)
                    onClose()
                }, 2000)
            }
        } catch (error) {
            console.error('Error al actualizar examen ORL:', error)
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
                <h5 className="text-lg font-bold">Examen ORL</h5>

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
                        name="boca"
                        label="Examen de la Boca"
                        inputPlaceholder="Describa el examen de la boca"
                        rules={validationSeccionOne.boca}
                        errors={errors}
                        className="col-span-3"
                        value=""
                    />

                    <InputForm
                        control={control}
                        name="nariz"
                        label="Examen de la Nariz"
                        inputPlaceholder="Describa el examen de la nariz"
                        rules={validationSeccionOne.nariz}
                        errors={errors}
                        className="col-span-3"
                        value=""
                    />

                    <InputForm
                        control={control}
                        name="oidos"
                        label="Examen de los Oídos"
                        inputPlaceholder="Describa el examen de los oídos"
                        rules={validationSeccionOne.oidos}
                        errors={errors}
                        className="col-span-3"
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
