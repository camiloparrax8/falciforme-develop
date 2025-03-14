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
    } = useForm<TannerData>({
        defaultValues: defaultValuesTanner,
    })

    const { updateTanner, isLoading, result } = useExamenFisicoUpdate()
    const { idExamenFisico } = useExamenFisico()
    const [showMessage, setShowMessage] = useState(false)

    useEffect(() => {
        console.log('ID del examen físico en ModalTanner:', idExamenFisico)
    }, [idExamenFisico])

    const onSubmit = async (data: TannerData) => {
        try {
            console.log(
                'Enviando actualización de Tanner con ID de examen físico:',
                idExamenFisico,
            )
            console.log('Datos del formulario:', data)

            await updateTanner(data)
            setShowMessage(true)

            // Cerrar automáticamente después de 2 segundos en caso de éxito
            if (result?.success) {
                setTimeout(() => {
                    setShowMessage(false)
                    onClose()
                }, 2000)
            }
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
            onRequestClose={onRequestClose}
            onClose={onClose}
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
                    <InputSelect
                        control={control}
                        name="estadioTanner"
                        label="Estadio Tanner"
                        className="col-span-3"
                        placeholder="Seleccione un estadio"
                        options={opcionesTanner}
                        validation={validationSeccionThree.estadioTanner}
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
