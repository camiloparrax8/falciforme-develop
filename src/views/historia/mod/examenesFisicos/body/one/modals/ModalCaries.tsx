import { useForm } from 'react-hook-form'
import { Dialog } from '@/components/ui'
import InputSelect from '@/views/common/form/InputSelect'
import Button from '@/components/ui/Button'
import validationSeccionOne from '../../../../../../../validation/validationSeccionOne'
import { defaultValuesCaries } from '../../one/modals/defaultValuesSeccionOne'
import { useExamenFisicoUpdate } from '@/hooks/useExamenFisicoUpdate'
import { useState } from 'react'

interface CariesData {
    caries: string
}

export default function ModalCaries({ isOpen, onClose, onRequestClose }) {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<CariesData>({
        defaultValues: defaultValuesCaries,
    })

    const { updateCaries, isLoading, result } = useExamenFisicoUpdate()
    const [showMessage, setShowMessage] = useState(false)

    const onSubmit = async (data: CariesData) => {
        try {
            await updateCaries(data)
            setShowMessage(true)

            // Cerrar automáticamente después de 2 segundos en caso de éxito
            if (result?.success) {
                setTimeout(() => {
                    setShowMessage(false)
                    onClose()
                }, 2000)
            }
        } catch (error) {
            console.error('Error al actualizar información de caries:', error)
            setShowMessage(true)
        }
    }

    const opcionesCaries = [
        { value: 'Si', label: 'Si' },
        { value: 'No', label: 'No' },
    ]

    return (
        <Dialog
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            onClose={onClose}
        >
            <div className="flex flex-col h-full space-y-4">
                <h5 className="text-lg font-bold">Caries</h5>

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
                    <InputSelect
                        control={control}
                        name="caries"
                        label="¿Tiene caries?"
                        options={opcionesCaries}
                        validation={validationSeccionOne.caries}
                        errors={errors}
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
