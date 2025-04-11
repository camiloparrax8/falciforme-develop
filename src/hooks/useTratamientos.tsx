import { useState, useCallback, useEffect } from 'react'
import { useToken, useSessionUser } from '@/store/authStore'
import {
    crearTratamiento,
    obtenerTratamientosPorPaciente,
    eliminarLogicamenteTratamiento,
} from '@/customService/services/tratamientosService'

interface Tratamiento {
    id: number
    Registro: number
    titulo: string
    n_dias: number
    dosis: string
    tipo: string
}

interface TratamientoResponse {
    id: number
    titulo: string
    n_dias: number
    dosis: string
    tipo: string
    estado: boolean
    createdAt: string
    updatedAt: string
}

interface Mensaje {
    tipo: 'success' | 'error'
    texto: string
}

interface TratamientosHookProps {
    id_paciente: string
}

interface FormData {
    tipo: string
    n_dias: number | string
    dosis: string
}

// Valores por defecto para los formularios
export const defaultFormValues = {
    tipo: '',
    n_dias: '',
    dosis: '',
}

export const useTratamientos = ({ id_paciente }: TratamientosHookProps) => {
    const { token } = useToken()
    const { user } = useSessionUser()
    const [loading, setLoading] = useState<boolean>(false)
    const [tratamientos, setTratamientos] = useState<Tratamiento[]>([])
    const [mensaje, setMensaje] = useState<Mensaje | null>(null)
    const [mostrarMensaje, setMostrarMensaje] = useState<boolean>(false)
    const [shouldResetForm, setShouldResetForm] = useState<boolean>(false)

    const cargarTratamientos = useCallback(async () => {
        try {
            setLoading(true)
            const resultado = await obtenerTratamientosPorPaciente(
                token,
                id_paciente,
            )

            if (resultado.status === 'success' && resultado.data) {
                const tratamientosFormateados = Array.isArray(resultado.data)
                    ? resultado.data.map((tratamiento: TratamientoResponse) => {
                          return {
                              id: tratamiento.id,
                              titulo: tratamiento.titulo,
                              n_dias: tratamiento.n_dias,
                              dosis: tratamiento.dosis,
                              tipo: tratamiento.tipo,
                          }
                      })
                    : []
                setTratamientos(tratamientosFormateados)
            } else {
                setTratamientos([])
            }
        } catch (error) {
            console.error('Error al cargar tratamientos:', error)
            setMensaje({
                tipo: 'error',
                texto: 'Error al cargar tratamientos',
            })
            setMostrarMensaje(true)
        } finally {
            setLoading(false)
        }
    }, [token, id_paciente])

    useEffect(() => {
        cargarTratamientos()
        // Hacer scroll al inicio de la página cuando se monte el componente
        window.scrollTo(0, 0)
    }, [cargarTratamientos])

    // Método genérico para crear tratamientos
    const crearTratamientoHelper = async (titulo: string, data: FormData) => {
        try {
            setLoading(true)
            const resultado = await crearTratamiento(token, {
                titulo,
                n_dias: parseInt(data.n_dias.toString()),
                dosis: data.dosis,
                tipo: data.tipo,
                id_paciente: id_paciente,
                id_user_create: user.id,
            })

            if (resultado.status === 'success') {
                setMensaje({
                    tipo: 'success',
                    texto: 'Tratamiento guardado correctamente',
                })
                await cargarTratamientos()
                setShouldResetForm(true)
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                })
            } else {
                setMensaje({
                    tipo: 'error',
                    texto:
                        resultado.message || 'Error al guardar el tratamiento',
                })
            }
            setMostrarMensaje(true)
        } catch (error) {
            console.error('Error al guardar tratamiento:', error)
            setMensaje({
                tipo: 'error',
                texto: 'Error al guardar el tratamiento',
            })
            setMostrarMensaje(true)
        } finally {
            setLoading(false)
        }
    }

    // Método específico para crear tratamiento individual
    const handleTratamientoIndividual = async (data: FormData) => {
        await crearTratamientoHelper('Tratamiento individual', data)
    }

    // Método específico para crear manejo de dolor
    const handleManejoDolor = async (data: FormData) => {
        await crearTratamientoHelper('Manejo de dolor', data)
    }

    const handleEliminarTratamiento = async (tratamiento: Tratamiento) => {
        try {
            setLoading(true)
            const resultado = await eliminarLogicamenteTratamiento(
                token,
                tratamiento.id,
            )

            if (resultado.status === 'success') {
                await cargarTratamientos()
                setMensaje({
                    tipo: 'success',
                    texto: 'Tratamiento eliminado correctamente',
                })
                setMostrarMensaje(true)
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                })
            } else {
                setMensaje({
                    tipo: 'error',
                    texto:
                        resultado.message || 'Error al eliminar el tratamiento',
                })
                setMostrarMensaje(true)
            }
        } catch (error) {
            console.error('Error al eliminar tratamiento:', error)
            setMensaje({
                tipo: 'error',
                texto: 'Error al eliminar el tratamiento',
            })
            setMostrarMensaje(true)
        } finally {
            setLoading(false)
        }
    }

    const handleCloseAlert = () => {
        setMostrarMensaje(false)
    }

    // Función que el componente debe llamar después de resetear el formulario
    const resetFormCompleted = () => {
        setShouldResetForm(false)
    }

    // Filtrar tratamientos por título
    const tratamientosIndividuales = tratamientos.filter(
        (t) => t.titulo === 'Tratamiento individual',
    )

    const tratamientosManejoDolor = tratamientos.filter(
        (t) => t.titulo === 'Manejo de dolor',
    )

    const headers = ['Registro', 'tipo', 'n_dias', 'dosis']

    return {
        // Estados
        loading,
        tratamientos,
        tratamientosIndividuales,
        tratamientosManejoDolor,
        mensaje,
        mostrarMensaje,
        headers,
        existenTratamientos: tratamientos.length > 0,
        shouldResetForm,
        defaultFormValues,

        // Métodos
        handleTratamientoIndividual,
        handleManejoDolor,
        handleEliminarTratamiento,
        handleCloseAlert,
        resetFormCompleted,
    }
}
