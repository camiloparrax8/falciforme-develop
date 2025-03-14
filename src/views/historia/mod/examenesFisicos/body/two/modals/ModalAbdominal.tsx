import { useForm } from 'react-hook-form'
import { Dialog } from '@/components/ui'
import SelectMultiple from '@/views/common/form/SelectMultiple'
import Button from '@/components/ui/Button'
import validationValuesSeccionTwo from '../../../../../../../validation/validationSeccionTwo'
import { defaultValuesAbdominal } from '../../two/modals/defaultValuesSeccionTwo'
import { useExamenFisicoUpdate } from '@/hooks/useExamenFisicoUpdate'
import { useState, useEffect } from 'react'
import { useExamenFisico } from '@/hooks/useExamenFisico'

interface AbdominalData {
    condicionesAbdominales: string[]
}

export default function ModalAbdominal({ isOpen, onClose, onRequestClose }) {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<AbdominalData>({
        defaultValues: defaultValuesAbdominal,
    })

    const { updateAbdominal, isLoading, result } = useExamenFisicoUpdate()
    const { idExamenFisico } = useExamenFisico()
    const [showMessage, setShowMessage] = useState(false)

    useEffect(() => {
        console.log('ID del examen físico en ModalAbdominal:', idExamenFisico)
    }, [idExamenFisico])

    const onSubmit = async (data: AbdominalData) => {
        try {
            console.log(
                'Enviando actualización abdominal con ID de examen físico:',
                idExamenFisico,
            )
            console.log('Datos del formulario:', data)

            await updateAbdominal(data)
            setShowMessage(true)

            // Cerrar automáticamente después de 2 segundos en caso de éxito
            if (result?.success) {
                setTimeout(() => {
                    setShowMessage(false)
                    onClose()
                }, 2000)
            }
        } catch (error) {
            console.error('Error al actualizar información abdominal:', error)
            setShowMessage(true)
        }
    }

    const opcionesAbdominal = [
        { value: 'esplenomegalia', label: 'Esplenomegalia' },
        { value: 'hepatomegalia', label: 'Hepatomegalia' },
    ]

    return (
        <Dialog
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            onClose={onClose}
        >
            <div className="flex flex-col h-full space-y-4">
                <h5 className="text-lg font-bold">Examen Abdominal</h5>

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
                    <SelectMultiple
                        control={control}
                        name="condicionesAbdominales"
                        label="Condiciones Abdominales"
                        placeholder="Seleccione las condiciones"
                        className="col-span-3"
                        options={opcionesAbdominal}
                        validation={
                            validationValuesSeccionTwo.condicionesAbdominales
                        }
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
