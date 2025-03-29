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
        setValue,
    } = useForm<PerimetroCefalicoData>({ defaultValues: defaultValuesPC })

    const { updatePerimetroCefalico, isLoading, result } =
        useExamenFisicoUpdate()
    const { idExamenFisico, examenData } = useExamenFisico()
    const [showMessage, setShowMessage] = useState(false)
    const [existeRegistro, setExisteRegistro] = useState(false)

    const onSubmit = async (data: PerimetroCefalicoData) => {
        try {
            // IMPORTANTE: el hook espera "perimetroCefalico" en camelCase
            await updatePerimetroCefalico({
                perimetroCefalico: data.perimetro_cefalico,
            })
            setShowMessage(true)
            setExisteRegistro(true)

            // Cerrar automáticamente después de 2 segundos en caso de éxito
            setTimeout(() => {
                setShowMessage(false)
                if (onClose) {
                    onClose()
                }
            }, 2000)
        } catch (error) {
            console.error('Error al actualizar perímetro cefálico:', error)
            setShowMessage(true)
        }
    }

    useEffect(() => {
        if (isOpen && examenData) {
            // Verificar si el valor existe y no es null
            if (
                examenData.perimetro_cefalico !== undefined &&
                examenData.perimetro_cefalico !== null
            ) {
                // Solo si tiene un valor real, lo consideramos como existente
                setValue(
                    'perimetro_cefalico',
                    String(examenData.perimetro_cefalico),
                )
                setExisteRegistro(true)
            } else {
                // Si es null o undefined, permitimos editar
                setValue('perimetro_cefalico', '')
                setExisteRegistro(false)
            }
        }
    }, [isOpen, examenData, setValue])

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
                        name="perimetro_cefalico"
                        label="Perímetro Cefálico al diagnóstico (<2 años)"
                        inputPlaceholder="Ingrese el valor en cm"
                        rules={validationSeccionOne.perimetro_cefalico}
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
            </div>
        </Dialog>
    )
}
