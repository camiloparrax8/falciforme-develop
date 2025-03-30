import { useForm } from 'react-hook-form'
import { Dialog } from '@/components/ui'
import InputSelect from '@/views/common/form/InputSelect'
import Button from '@/components/ui/Button'
import validationSeccionThree from '../../../../../../../validation/validationSeccionThree'
import { defaultValuesTanner } from '../../three/modals/defaultValuesSeccionThree'
import { useExamenFisicoUpdate } from '@/hooks/useExamenFisicoUpdate'
import { useState, useEffect } from 'react'
import { useExamenFisico } from '@/hooks/useExamenFisico'

interface TannerData {
    estadioTanner: string
}

export default function ModalTanner({ isOpen, onClose, onRequestClose }) {
    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<TannerData>({
        defaultValues: defaultValuesTanner,
    })

    const { updateTanner, isLoading, result } = useExamenFisicoUpdate()
    const { idExamenFisico, examenData } = useExamenFisico()
    const [showMessage, setShowMessage] = useState(false)
    const [existeRegistro, setExisteRegistro] = useState(false)
    const [yaSeGuardo, setYaSeGuardo] = useState(false)

    useEffect(() => {
        // Si ya se guardó anteriormente, mantener deshabilitado
        if (yaSeGuardo) {
            setExisteRegistro(true)
            return
        }

        if (isOpen && examenData) {
            // Verificar si ya existe un valor para estadio Tanner
            const tieneTanner =
                examenData.tanner !== undefined &&
                examenData.tanner !== null &&
                examenData.tanner !== ''

            // Establecer el valor si existe
            if (tieneTanner) {
                setValue('estadioTanner', String(examenData.tanner))
                setExisteRegistro(true)
            } else {
                setValue('estadioTanner', '')
                setExisteRegistro(false)
            }
        } else {
            setExisteRegistro(false)
        }
    }, [isOpen, examenData, setValue, yaSeGuardo])

    const onSubmit = async (data: TannerData) => {
        try {
            await updateTanner(data)
            setShowMessage(true)
            setExisteRegistro(true)
            setYaSeGuardo(true) // Marcar que ya se guardó

            // Cerrar automáticamente después de 2 segundos
            setTimeout(() => {
                setShowMessage(false)
                if (onClose) {
                    onClose()
                }
            }, 1000)
        } catch (error) {
            console.error('Error al actualizar estadio Tanner:', error)
            setShowMessage(true)
        }
    }

    const opcionesTanner = [
        { value: '1', label: 'Estadio 1' },
        { value: '2', label: 'Estadio 2' },
        { value: '3', label: 'Estadio 3' },
        { value: '4', label: 'Estadio 4' },
        { value: '5', label: 'Estadio 5' },
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
                <h5 className="text-lg font-bold">Estadio Tanner</h5>

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
                    <InputSelect
                        control={control}
                        name="estadioTanner"
                        label="Estadio Tanner"
                        className="col-span-3"
                        placeholder="Seleccione un estadio"
                        options={opcionesTanner}
                        validation={validationSeccionThree.estadioTanner}
                        errors={errors}
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
