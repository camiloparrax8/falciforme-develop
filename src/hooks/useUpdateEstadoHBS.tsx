import { useState, useCallback } from 'react'
import { useToken, useSessionUser } from '@/store/authStore'
import { actualizarEstadoHBS } from '@/customService/services/estadoHbsService'

interface EstadoHBS {
    id: number
    parentesco: string
    linea_parentesco: string
    estado: string
}

interface Mensaje {
    tipo: 'success' | 'error'
    texto: string
}

interface UpdateEstadoHBSHookProps {
    onSuccess?: () => void
}

export const useUpdateEstadoHBS = ({
    onSuccess,
}: UpdateEstadoHBSHookProps = {}) => {
    const { token } = useToken()
    const { user } = useSessionUser()
    const [loading, setLoading] = useState<boolean>(false)
    const [mensaje, setMensaje] = useState<Mensaje | null>(null)
    const [mostrarMensaje, setMostrarMensaje] = useState<boolean>(false)

    const actualizarEstadoHbs = useCallback(
        async (estadoHbs: EstadoHBS) => {
            try {
                setLoading(true)
                const resultado = await actualizarEstadoHBS(token, {
                    id: estadoHbs.id,
                    parentesco: estadoHbs.parentesco,
                    linea_parentesco: estadoHbs.linea_parentesco,
                    estado: estadoHbs.estado,
                    id_user_update: user.id,
                })

                if (resultado.status === 'success') {
                    setMensaje({
                        tipo: 'success',
                        texto: 'Estado HBS actualizado correctamente',
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
                            'Error al actualizar el estado HBS',
                    })
                }
                setMostrarMensaje(true)
            } catch (error) {
                console.error('Error al actualizar estado HBS:', error)
                setMensaje({
                    tipo: 'error',
                    texto: 'Error al actualizar el estado HBS',
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
        actualizarEstadoHbs,
        loading,
        mensaje,
        mostrarMensaje,
        handleCloseAlert,
    }
}
