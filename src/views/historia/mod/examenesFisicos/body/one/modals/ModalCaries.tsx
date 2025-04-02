import { useForm } from 'react-hook-form'
import { Dialog } from '@/components/ui'
import InputSelect from '@/views/common/form/InputSelect'
import Button from '@/components/ui/Button'
import validationSeccionOne from '../../../../../../../validation/validationSeccionOne'
import { defaultValuesCaries } from '../../one/modals/defaultValuesSeccionOne'
import { useExamenFisicoUpdate } from '@/hooks/useExamenFisicoUpdate'
import { useState, useEffect } from 'react'
import { useExamenFisico } from '@/hooks/useExamenFisico'

interface CariesData {
    caries: string
}

export default function ModalCaries({ isOpen, onClose, onRequestClose }) {
    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<CariesData>({
        defaultValues: defaultValuesCaries,
    })

    const { updateCaries, isLoading, result } = useExamenFisicoUpdate()
    const { idExamenFisico, examenData } = useExamenFisico()
    const [showMessage, setShowMessage] = useState(false)
    const [existeRegistro, setExisteRegistro] = useState(false)
    const [fueEditado, setFueEditado] = useState(false)

    useEffect(() => {
        if (isOpen && examenData) {
            // Comprobar si ya fue editado previamente
            if (examenData.caries === 'Si' || examenData.caries === 'No') {
                setValue('caries', examenData.caries)
                setExisteRegistro(true)
            } else {
                // Si es el valor por defecto (false) o cualquier otro, permitir edición
                setValue('caries', examenData.caries === true ? 'Si' : 'No')
                setExisteRegistro(false)
            }
        } else {
            setExisteRegistro(false)
        }
    }, [isOpen, examenData, setValue])

    const onSubmit = async (data: CariesData) => {
        try {
            await updateCaries(data)

            // Primero mostramos el mensaje de éxito de la operación
            setShowMessage(true)

            // Después de guardar, marcamos como editado para no permitir más cambios
            setExisteRegistro(true)
            setFueEditado(true)

            // Cerrar automáticamente después de 2 segundos
            setTimeout(() => {
                setShowMessage(false)
                if (onClose) {
                    onClose()
                }
            }, 1000)
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
                <h5 className="text-lg font-bold">Caries</h5>

                {showMessage && result && (
                    <div
                        className={`p-2 rounded ${result.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                    >
                        {result.message}
                    </div>
                )}

                {fueEditado && (
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
                    <InputSelect
                        control={control}
                        name="caries"
                        label="¿Tiene caries?"
                        options={opcionesCaries}
                        validation={validationSeccionOne.caries}
                        errors={errors}
                        disabled={fueEditado}
                    />

                    <div className="flex justify-end">
                        <Button
                            type="submit"
                            className="ml-2"
                            disabled={
                                isLoading ||
                                !idExamenFisico ||existeRegistro ||
                                fueEditado
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
