import { useForm } from 'react-hook-form'
import { Dialog } from '@/components/ui'
import InputForm from '@/views/common/form/InputForm'
import Button from '@/components/ui/Button'
import validationSeccionOne from '../../../../../../../validation/validationSeccionOne'
import { defaultValuesExamenORL } from '../../one/modals/defaultValuesSeccionOne'
import { useExamenFisicoUpdate } from '@/hooks/useExamenFisicoUpdate'
import { useState, useEffect, useCallback } from 'react'
import { useExamenFisico } from '@/hooks/useExamenFisico'
import { useToken } from '@/store/authStore'
import { useParams } from 'react-router-dom'
import { consultarExamenFisicoPorPaciente } from '@/customService/services/examenesFisicosService'

interface ExamenORLData {
    boca: string
    nariz: string
    oidos: string
}

export default function ModalExamenORL({ isOpen, onClose, onRequestClose }) {
    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<ExamenORLData>({
        defaultValues: defaultValuesExamenORL,
    })

    const { updateExamenORL, isLoading, result } = useExamenFisicoUpdate()
    const { idExamenFisico, examenData, setExamenData } = useExamenFisico()
    const [showMessage, setShowMessage] = useState(false)
    const [existeRegistro, setExisteRegistro] = useState(false)
    const { token } = useToken()
    const { id_paciente } = useParams()

    const verificarExistenciaRegistro = useCallback(() => {
        if (!examenData) return false

        const tieneBoca =
            examenData.examen_boca !== undefined &&
            examenData.examen_boca !== null &&
            examenData.examen_boca !== ''

        const tieneNariz =
            examenData.examen_nariz !== undefined &&
            examenData.examen_nariz !== null &&
            examenData.examen_nariz !== ''

        const tieneOidos =
            examenData.examen_oidos !== undefined &&
            examenData.examen_oidos !== null &&
            examenData.examen_oidos !== ''

        return tieneBoca || tieneNariz || tieneOidos
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

    const onSubmit = async (data: ExamenORLData) => {
        try {
            await updateExamenORL(data)
            setShowMessage(true)

            // Actualizar el contexto inmediatamente
            await actualizarContexto()

            setTimeout(() => {
                setShowMessage(false)
                if (onClose) {
                    onClose()
                }
            }, 1000)
        } catch (error) {
            console.error('Error al actualizar examen ORL:', error)
            setShowMessage(true)
        }
    }

    useEffect(() => {
        if (isOpen && examenData) {
            const tieneRegistro = verificarExistenciaRegistro()

            // Establecer valores solo si existen
            setValue(
                'boca',
                tieneRegistro ? String(examenData.examen_boca) : '',
            )
            setValue(
                'nariz',
                tieneRegistro ? String(examenData.examen_nariz) : '',
            )
            setValue(
                'oidos',
                tieneRegistro ? String(examenData.examen_oidos) : '',
            )
            setExisteRegistro(tieneRegistro)
        } else {
            setExisteRegistro(false)
        }
    }, [isOpen, examenData, setValue, verificarExistenciaRegistro])

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
                <h5 className="text-lg font-bold">Examen ORL</h5>

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
                        name="boca"
                        label="Examen de la Boca"
                        inputPlaceholder="Describa el examen de la boca"
                        rules={validationSeccionOne.boca}
                        errors={errors}
                        className="col-span-3"
                        value=""
                        disabled={existeRegistro}
                    />

                    <InputForm
                        control={control}
                        name="nariz"
                        label="Examen de la Nariz"
                        inputPlaceholder="Describa el examen de la nariz"
                        rules={validationSeccionOne.nariz}
                        errors={errors}
                        className="col-span-3"
                        value=""
                        disabled={existeRegistro}
                    />

                    <InputForm
                        control={control}
                        name="oidos"
                        label="Examen de los Oídos"
                        inputPlaceholder="Describa el examen de los oídos"
                        rules={validationSeccionOne.oidos}
                        errors={errors}
                        className="col-span-3"
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
