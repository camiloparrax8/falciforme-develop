import { useState, useCallback } from 'react'
import { useToken, useSessionUser } from '@/store/authStore'
import { actualizarPrimeraConsulta } from '@/customService/services/ingresoService'

interface PrimeraConsulta {
    id: number
    fecha_hematologica?: string
    edad_consulta?: number
    fecha_inicio_sintoma?: string
    parentescos_multiples?: unknown[]
}

interface Mensaje {
    tipo: 'success' | 'error'
    texto: string
}

interface UpdatePrimeraConsultaHookProps {
    onSuccess?: () => void
}

export const useUpdatePrimeraConsulta = ({
    onSuccess,
}: UpdatePrimeraConsultaHookProps = {}) => {
    const { token } = useToken()
    const { user } = useSessionUser()
    const [loading, setLoading] = useState<boolean>(false)
    const [mensaje, setMensaje] = useState<Mensaje | null>(null)
    const [mostrarMensaje, setMostrarMensaje] = useState<boolean>(false)

    const actualizarConsulta = useCallback(
        async (consulta: PrimeraConsulta) => {
            try {
                setLoading(true)
                const resultado = await actualizarPrimeraConsulta(token, {
                    id: consulta.id,
                    fecha_hematologica: consulta.fecha_hematologica,
                    edad_consulta: consulta.edad_consulta,
                    fecha_inicio_sintoma: consulta.fecha_inicio_sintoma,
                    parentescos_multiples: consulta.parentescos_multiples,
                    id_user_update: user.id,
                })

                if (resultado.status === 'success') {
                    setMensaje({
                        tipo: 'success',
                        texto: 'Primera consulta actualizada correctamente',
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
                            'Error al actualizar la primera consulta',
                    })
                }
                setMostrarMensaje(true)
            } catch (error) {
                console.error('Error al actualizar primera consulta:', error)
                setMensaje({
                    tipo: 'error',
                    texto: 'Error al actualizar la primera consulta',
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
        actualizarConsulta,
        loading,
        mensaje,
        mostrarMensaje,
        handleCloseAlert,
    }
}
