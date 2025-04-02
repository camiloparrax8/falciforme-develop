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
        setValue,
    } = useForm<AgudezaVisualData>({
        defaultValues: defaultValuesVisual,
    })

    const { updateAgudezaVisual, isLoading, result } = useExamenFisicoUpdate()
    const { idExamenFisico, examenData } = useExamenFisico()
    const [showMessage, setShowMessage] = useState(false)
    const [existeRegistro, setExisteRegistro] = useState(false)

    const onSubmit = async (data: AgudezaVisualData) => {
        try {
            await updateAgudezaVisual({
                visualizacion: data.vision,
            })

            // Mostrar mensaje de éxito
            setShowMessage(true)
            setExisteRegistro(true)

            // Forzar cierre después de 1 segundo sin importar la respuesta
            setTimeout(() => {
                setShowMessage(false)
                if (onClose) {
                    onClose()
                }
            }, 1000)
        } catch (error) {
            console.error('Error al actualizar agudeza visual:', error)
            setShowMessage(true)
        }
    }

    // Efecto para verificar si existe un registro cuando el modal se abre
    useEffect(() => {
        if (isOpen && examenData) {
            // Verificar inmediatamente al abrir el modal
            if (examenData.vision) {
                setValue('vision', String(examenData.vision))
                setExisteRegistro(true)
            } else {
                setExisteRegistro(false)
            }
        }
    }, [isOpen, examenData, setValue])

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

                <InputForm
                    control={control}
                    name="vision"
                    label="Visión"
                    inputPlaceholder="Ingrese la visión"
                    rules={validationSeccionOne.vision}
                    className="col-span-3"
                    errors={errors}
                    value=""
                    disabled={existeRegistro}
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
        </Dialog>
    )
}
