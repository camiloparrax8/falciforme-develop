import { useState, useCallback } from 'react'
import { useToken, useSessionUser } from '@/store/authStore'
import { actualizarEnfermedadCronica } from '@/customService/services/enfermedadesCronicasService'

interface EnfermedadCronica {
    id: number
    enfermedad: string
    enfermedad_especifica: string
    portador: string
    linea_parentesco_portador: string
}

interface Mensaje {
    tipo: 'success' | 'error'
    texto: string
}

interface UpdateEnfermedadCronicaHookProps {
    onSuccess?: () => void
}

export const useUpdateEnfermedadCronica = ({
    onSuccess,
}: UpdateEnfermedadCronicaHookProps = {}) => {
    const { token } = useToken()
    const { user } = useSessionUser()
    const [loading, setLoading] = useState<boolean>(false)
    const [mensaje, setMensaje] = useState<Mensaje | null>(null)
    const [mostrarMensaje, setMostrarMensaje] = useState<boolean>(false)

    const actualizarEnfermedad = useCallback(
        async (enfermedad: EnfermedadCronica) => {
            try {
                setLoading(true)
                const resultado = await actualizarEnfermedadCronica(token, {
                    id: enfermedad.id,
                    enfermedad: enfermedad.enfermedad,
                    enfermedad_especifica: enfermedad.enfermedad_especifica,
                    portador: enfermedad.portador,
                    linea_parentesco_portador:
                        enfermedad.linea_parentesco_portador,
                    id_user_update: user.id,
                })

                if (resultado.status === 'success') {
                    setMensaje({
                        tipo: 'success',
                        texto: 'Enfermedad crónica actualizada correctamente',
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
                            'Error al actualizar la enfermedad crónica',
                    })
                }
                setMostrarMensaje(true)
            } catch (error) {
                console.error('Error al actualizar enfermedad crónica:', error)
                setMensaje({
                    tipo: 'error',
                    texto: 'Error al actualizar la enfermedad crónica',
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
        actualizarEnfermedad,
        loading,
        mensaje,
        mostrarMensaje,
        handleCloseAlert,
    }
}
