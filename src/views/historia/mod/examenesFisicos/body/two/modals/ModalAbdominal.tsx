import { useForm } from 'react-hook-form'
import { Dialog } from '@/components/ui'
import SelectMultiple from '@/views/common/form/SelectMultiple'
import Button from '@/components/ui/Button'
import validationValuesSeccionTwo from '../../../../../../../validation/validationSeccionTwo'
import { defaultValuesAbdominal } from '../../two/modals/defaultValuesSeccionTwo'
import { useExamenFisicoUpdate } from '@/hooks/useExamenFisicoUpdate'
import { useState, useEffect, useCallback } from 'react'
import { useExamenFisico } from '@/hooks/useExamenFisico'
import { useToken } from '@/store/authStore'
import { useParams } from 'react-router-dom'
import { consultarExamenFisicoPorPaciente } from '@/customService/services/examenesFisicosService'

interface AbdominalData {
    condicionesAbdominales: string[]
}

export default function ModalAbdominal({ isOpen, onClose, onRequestClose }) {
    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<AbdominalData>({
        defaultValues: defaultValuesAbdominal,
    })

    const { updateAbdominal, isLoading, result } = useExamenFisicoUpdate()
    const { idExamenFisico, examenData, setExamenData } = useExamenFisico()
    const [showMessage, setShowMessage] = useState(false)
    const [existeRegistro, setExisteRegistro] = useState(false)
    const { token } = useToken()
    const { id_paciente } = useParams()

    const verificarExistenciaRegistro = useCallback(() => {
        if (!examenData) return false

        return (
            examenData.condicion_abdominal !== undefined &&
            examenData.condicion_abdominal !== null &&
            examenData.condicion_abdominal !== ''
        )
    }, [examenData])

    const actualizarContexto = useCallback(async () => {
        if (!id_paciente || !token) return

        try {
            const resultado = await consultarExamenFisicoPorPaciente(
                token,
                id_paciente,
            )

            const examenActualizado = resultado?.data || resultado

            if (examenActualizado && examenActualizado.id) {
                setExamenData(examenActualizado)
            }
        } catch (error) {
            console.error('Error al actualizar datos del examen:', error)
        }
    }, [id_paciente, token, setExamenData])

    const onSubmit = async (data: AbdominalData) => {
        try {
            await updateAbdominal(data)
            setShowMessage(true)

            await actualizarContexto()

            setTimeout(() => {
                setShowMessage(false)
                if (onClose) {
                    onClose()
                }
            }, 1000)
        } catch (error) {
            console.error('Error al actualizar información abdominal:', error)
            setShowMessage(true)
        }
    }

    useEffect(() => {
        if (isOpen) {
            actualizarContexto()
        }
    }, [isOpen, actualizarContexto])

    useEffect(() => {
        if (isOpen && examenData) {
            const tieneCondicion = verificarExistenciaRegistro()

            if (
                tieneCondicion &&
                typeof examenData.condicion_abdominal === 'string'
            ) {
                const condiciones = examenData.condicion_abdominal
                    .split(',')
                    .map((item) => item.trim())
                setValue('condicionesAbdominales', condiciones)
            } else {
                setValue('condicionesAbdominales', [])
            }

            setExisteRegistro(tieneCondicion)
        } else {
            setExisteRegistro(false)
        }
    }, [isOpen, examenData, setValue, verificarExistenciaRegistro])

    const opcionesAbdominal = [
        { value: 'esplenomegalia', label: 'Esplenomegalia' },
        { value: 'hepatomegalia', label: 'Hepatomegalia' },
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
                <h5 className="text-lg font-bold">Examen Abdominal</h5>

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
                        isDisabled={existeRegistro}
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
