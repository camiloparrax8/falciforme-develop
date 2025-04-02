import { useForm } from 'react-hook-form'
import { Dialog } from '@/components/ui'
import InputSelect from '@/views/common/form/InputSelect'
import Button from '@/components/ui/Button'
import validationSeccionOne from '@/validation/validationSeccionOne'
import { defaultValuesCaries } from '@/views/historia/mod/examenesFisicos/body/one/modals/defaultValuesSeccionOne'
import { useExamenFisicoUpdate } from '@/hooks/useExamenFisicoUpdate'
import { useState, useEffect, useCallback } from 'react'
import { useExamenFisico } from '@/hooks/useExamenFisico'
import { useToken } from '@/store/authStore'
import { useParams } from 'react-router-dom'
import { consultarExamenFisicoPorPaciente } from '@/customService/services/examenesFisicosService'

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
    const { idExamenFisico, examenData, setExamenData } = useExamenFisico()
    const [showMessage, setShowMessage] = useState(false)
    const { token } = useToken()
    const { id_paciente } = useParams()

    // Lógica simplificada
    const tieneCaries = useCallback(() => {
        // Ahora solo verificamos si es diferente de null
        return examenData?.caries !== null && examenData?.caries !== undefined
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

    useEffect(() => {
        if (isOpen) {
            actualizarContexto()
        }
    }, [isOpen, actualizarContexto])

    // Actualizar el campo si ya hay un valor
    useEffect(() => {
        if (isOpen && tieneCaries()) {
            setValue('caries', examenData.caries === true ? 'Si' : 'No')
        }
    }, [isOpen, examenData, setValue, tieneCaries])

    const onSubmit = async (data: CariesData) => {
        try {
            await updateCaries(data)
            setShowMessage(true)

            // Actualizar inmediatamente el contexto para reflejar el cambio
            await actualizarContexto()

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

                {tieneCaries() && (
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
                        disabled={!idExamenFisico || tieneCaries()}
                    />

                    <div className="flex justify-end">
                        <Button
                            type="submit"
                            className="ml-2"
                            disabled={
                                isLoading || !idExamenFisico || tieneCaries()
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
