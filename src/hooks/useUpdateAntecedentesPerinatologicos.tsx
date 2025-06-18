import { useState, useCallback } from 'react'
import { useToken, useSessionUser } from '@/store/authStore'
import { actualizarAntecedentePerinatologico } from '@/customService/services/perinatologicasService'

interface AntecedentePerinatologico {
    id: number
    peso_al_nacer: string
    talla_al_nacer: string
    nota: string
    condicion_al_nacer: string
    cuidado_neonatal: string
    etirico_neonatal: string
}

interface Mensaje {
    tipo: 'success' | 'error'
    texto: string
}

interface UpdateAntecedentesPerinatologicosHookProps {
    onSuccess?: () => void
}

export const useUpdateAntecedentesPerinatologicos = ({
    onSuccess,
}: UpdateAntecedentesPerinatologicosHookProps = {}) => {
    const { token } = useToken()
    const { user } = useSessionUser()
    const [loading, setLoading] = useState<boolean>(false)
    const [mensaje, setMensaje] = useState<Mensaje | null>(null)
    const [mostrarMensaje, setMostrarMensaje] = useState<boolean>(false)

    const actualizarAntecedente = useCallback(
        async (antecedente: AntecedentePerinatologico) => {
            try {
                setLoading(true)
                const resultado = await actualizarAntecedentePerinatologico(
                    token,
                    {
                        id: antecedente.id,
                        peso_al_nacer: antecedente.peso_al_nacer,
                        talla_al_nacer: antecedente.talla_al_nacer,
                        nota: antecedente.nota,
                        condicion_al_nacer: antecedente.condicion_al_nacer,
                        cuidado_neonatal: antecedente.cuidado_neonatal,
                        etirico_neonatal: antecedente.etirico_neonatal,
                        id_user_update: user.id,
                    },
                )

                if (resultado.status === 'success') {
                    setMensaje({
                        tipo: 'success',
                        texto: 'Antecedente perinatológico actualizado correctamente',
                    })
                    if (onSuccess) onSuccess()
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth',
                    })
                } else {
                    setMensaje({
                        tipo: 'error',
                        texto:
                            resultado.message ||
                            'Error al actualizar el antecedente perinatológico',
                    })
                }
                setMostrarMensaje(true)
            } catch (error) {
                console.error(
                    'Error al actualizar antecedente perinatológico:',
                    error,
                )
                setMensaje({
                    tipo: 'error',
                    texto: 'Error al actualizar el antecedente perinatológico',
                })
                setMostrarMensaje(true)
            } finally {
                setLoading(false)
            }
        },
        [token, user.id, onSuccess],
    )

    const handleCloseAlert = () => {
        setMostrarMensaje(false)
    }

    return {
        actualizarAntecedente,
        loading,
        mensaje,
        mostrarMensaje,
        handleCloseAlert,
    }
}
