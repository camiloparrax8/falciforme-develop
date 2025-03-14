import { useForm } from 'react-hook-form'
import { Dialog } from '@/components/ui'
import InputForm from '@/views/common/form/InputForm'
import Button from '@/components/ui/Button'
import { defaultValuesPC } from '../../one/modals/defaultValuesSeccionOne'
import validationSeccionOne from '../../../../../../../validation/validationSeccionOne'
import { useExamenFisicoUpdate } from '@/hooks/useExamenFisicoUpdate'
import { useState, useEffect } from 'react'
import { useExamenFisico } from '@/hooks/useExamenFisico'

interface PerimetroCefalicoData {
    perimetro_cefalico: string
}

export default function ModalPerimetroCefalico({
    isOpen,
    onClose,
    onRequestClose,
}) {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<PerimetroCefalicoData>({ defaultValues: defaultValuesPC })

    const { updatePerimetroCefalico, isLoading, result } =
        useExamenFisicoUpdate()
    const { idExamenFisico } = useExamenFisico()
    const [showMessage, setShowMessage] = useState(false)

    useEffect(() => {
        console.log(
            'ID del examen físico en ModalPerimetroCefalico:',
            idExamenFisico,
        )
    }, [idExamenFisico])

    const onSubmit = async (data: PerimetroCefalicoData) => {
        try {
            console.log(
                'Enviando actualización con ID de examen físico:',
                idExamenFisico,
            )
            console.log('Datos del formulario:', data)

            // IMPORTANTE: el hook espera "perimetroCefalico" en camelCase
            await updatePerimetroCefalico({
                perimetroCefalico: data.perimetro_cefalico,
            })
            setShowMessage(true)

            // Cerrar automáticamente después de 2 segundos en caso de éxito
            if (result?.success) {
                setTimeout(() => {
                    setShowMessage(false)
                    onClose()
                }, 2000)
            }
        } catch (error) {
            console.error('Error al actualizar perímetro cefálico:', error)
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
                <h5 className="text-lg font-bold">Perímetro Cefálico</h5>

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

                <form
                    className="flex flex-col space-y-4"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <InputForm
                        control={control}
                        name="perimetro_cefalico"
                        label="Perímetro Cefálico al diagnóstico (<2 años)"
                        inputPlaceholder="Ingrese el valor en cm"
                        rules={validationSeccionOne.perimetro_cefalico}
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
            </div>
        </Dialog>
    )
}
