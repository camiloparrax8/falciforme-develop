import { useState, useCallback, useEffect } from 'react'
import { useToken, useSessionUser } from '@/store/authStore'
import {
    crearVacuna,
    obtenerVacunasPorPaciente,
    eliminarLogicamenteVacuna,
} from '@/customService/services/vacunas_hcService'

interface Vacuna {
    id: number
    Registro: number
    nombre_vacuna: string
    fecha: string
}

interface VacunaResponse {
    id: number
    nombre_vacuna: string
    fecha: string
}

interface Mensaje {
    tipo: 'success' | 'error'
    texto: string
}

interface VacunaHookProps {
    id_paciente: string
}

interface FormData {
    nombre_vacuna: string
    fecha: string
}

export const useVacunas_hc = ({
    id_paciente,
}: VacunaHookProps) => {
    const { token } = useToken()
    const { user } = useSessionUser()
    const [loading, setLoading] = useState<boolean>(false)
    const [vacunas, setVacunas] = useState<Vacuna[]>([])
    const [mensaje, setMensaje] = useState<Mensaje | null>(null)
    const [mostrarMensaje, setMostrarMensaje] = useState<boolean>(false)

    const cargarVacunas = useCallback(async () => {
        try {
            setLoading(true)
            const resultado = await obtenerVacunasPorPaciente(
                token,
                id_paciente,
            )

            if (resultado.status === 'success' && resultado.data) {
                const vacunasFormateadas = Array.isArray(resultado.data)
                    ? resultado.data.map(
                          (vac: VacunaResponse, index: number) => {
                              const fechaOriginal = vac.fecha
                              let fechaFormateada: string

                              if (fechaOriginal) {
                                  const [año, mes, dia] = fechaOriginal
                                      .split('T')[0]
                                      .split('-')
                                  fechaFormateada = `${dia}/${mes}/${año}`
                              } else {
                                  fechaFormateada = 'Fecha no disponible'
                              }

                              return {
                                  id: vac.id,
                                  Registro: resultado.data.length - index,
                                  nombre_vacuna: vac.nombre_vacuna,
                                  fecha: fechaFormateada,
                              }
                          },
                      )
                    : []
                setVacunas(vacunasFormateadas)
            } else {
                setVacunas([])
            }
        } catch (error) {
            console.error('Error al cargar vacunas:', error)
            setMensaje({
                tipo: 'error',
                texto: 'Error al cargar vacunas',
            })
            setMostrarMensaje(true)
        } finally {
            setLoading(false)
        }
    }, [token, id_paciente])

    useEffect(() => {
        cargarVacunas()
    }, [cargarVacunas])

    const handleFormSubmit = async (data: FormData) => {
        try {
            setLoading(true)
            const resultado = await crearVacuna(token, {
                ...data,
                id_paciente: id_paciente,
                id_user_create: user.id,
            })

            if (resultado.status === 'success') {
                setMensaje({
                    tipo: 'success',
                    texto: 'Vacuna guardada correctamente',
                })
                await cargarVacunas()
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                })
            } else {
                setMensaje({
                    tipo: 'error',
                    texto:
                        resultado.message ||
                        'Error al guardar la vacuna',
                })
            }
            setMostrarMensaje(true)
        } catch (error) {
            console.error('Error al guardar vacuna:', error)
            setMensaje({
                tipo: 'error',
                texto: 'Error al guardar la vacuna',
            })
            setMostrarMensaje(true)
        } finally {
            setLoading(false)
        }
    }

    const handleEliminarVacuna = async (vacuna: Vacuna) => {
        try {
            setLoading(true)
            const resultado = await eliminarLogicamenteVacuna(
                token,
                vacuna.id,
            )

            if (resultado.status === 'success') {
                await cargarVacunas()
                setMensaje({
                    tipo: 'success',
                    texto: 'Vacuna eliminada correctamente',
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
                        resultado.message ||
                        'Error al eliminar la vacuna',
                })
                setMostrarMensaje(true)
            }
        } catch (error) {
            console.error('Error al eliminar vacuna:', error)
            setMensaje({
                tipo: 'error',
                texto: 'Error al eliminar la vacuna',
            })
            setMostrarMensaje(true)
        } finally {
            setLoading(false)
        }
    }

    const handleCloseAlert = () => {
        setMostrarMensaje(false)
    }

    const headers = [
        'Registro',
        'nombre_vacuna',
        'fecha',
    ]

    return {
        // Estados
        loading,
        vacunas,
        mensaje,
        mostrarMensaje,
        headers,
        existeVacuna: vacunas.length > 0,

        // Métodos
        handleFormSubmit,
        handleEliminarVacuna,
        handleCloseAlert,
    }
}
