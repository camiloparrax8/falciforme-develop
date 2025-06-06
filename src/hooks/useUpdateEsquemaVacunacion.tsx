import { useState, useCallback } from 'react'
import { useToken, useSessionUser } from '@/store/authStore'
import { actualizarEsquemaVacunacion } from '@/customService/services/vacunasService'

interface EsquemaVacunacion {
    id: number
    estado: string
    fecha_vacunacion?: string
    dosis?: number
    id_vacunacion?: number | string
}

interface Mensaje {
    tipo: 'success' | 'error'
    texto: string
}

interface UpdateEsquemaVacunacionHookProps {
    onSuccess?: () => void
}

export const useUpdateEsquemaVacunacion = ({
    onSuccess,
}: UpdateEsquemaVacunacionHookProps = {}) => {
    const { token } = useToken()
    const { user } = useSessionUser()
    const [loading, setLoading] = useState<boolean>(false)
    const [mensaje, setMensaje] = useState<Mensaje | null>(null)
    const [mostrarMensaje, setMostrarMensaje] = useState<boolean>(false)

    const actualizarEsquema = useCallback(
        async (esquema: EsquemaVacunacion) => {
            try {
                setLoading(true)
                const resultado = await actualizarEsquemaVacunacion(token, {
                    id: esquema.id,
                    estado: esquema.estado,
                    fecha_vacunacion: esquema.fecha_vacunacion,
                    dosis: esquema.dosis,
                    id_user_update: user.id,
                    id_vacunacion: esquema.id_vacunacion,
                })

                if (resultado.status === 'success') {
                    setMensaje({
                        tipo: 'success',
                        texto: 'Esquema de vacunación actualizado correctamente',
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
                            'Error al actualizar el esquema de vacunación',
                    })
                }
                setMostrarMensaje(true)
                return resultado
            } catch (error) {
                console.error(
                    'Error al actualizar esquema de vacunación:',
                    error,
                )
                setMensaje({
                    tipo: 'error',
                    texto: 'Error al actualizar el esquema de vacunación',
                })
                setMostrarMensaje(true)
                throw error
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
        actualizarEsquema,
        loading,
        mensaje,
        mostrarMensaje,
        handleCloseAlert,
    }
}
