import { useState, useCallback, useEffect } from 'react'
import { useToken, useSessionUser } from '@/store/authStore'
import {
    crearSoporteTransfusional,
    obtenerSoportesTransfusionalesPorPaciente,
    eliminarLogicamenteSoporteTransfusional,
} from '@/customService/services/soportesTransfusionalesService'

interface SoporteTransfusional {
    id: number
    Registro: number
    fecha: string
    soporte_transfusional: string
    numero_transfusiones: string
    frecuencia: string
    aloinmunizacion: boolean
    fecha_sobrecarga_hierro: string
    quelentes: string
    ferritina: string
    ferritina_dosis: string
    fecha_sobrecarga_organo: string
    lic: string
    pancreatica: string
    evaluacion_cardiaca: string
}

interface SoporteTransfusionalResponse {
    id: number
    fecha: string
    soporte_transfusional: string
    numero_transfusiones: string
    frecuencia: string
    aloinmunizacion: boolean
    fecha_sobrecarga_hierro: string
    quelentes: string
    ferritina: string
    ferritina_dosis: string
    fecha_sobrecarga_organo: string
    lic: string
    pancreatica: string
    evaluacion_cardiaca: string
}

interface Mensaje {
    tipo: 'success' | 'error'
    texto: string
}

interface SoporteTransfusionalHookProps {
    id_paciente: string
}

interface FormData {
    fecha: string
    soporte_transfusional: string
    numero_transfusiones: string
    frecuencia: string
    aloinmunizacion: string
    fecha_sobrecarga_hierro: string
    quelentes: string
    ferritina: string
    ferritina_dosis: string
    fecha_sobrecarga_organo: string
    lic: string
    pancreatica: string
    evaluacion_cardiaca: string
}

export const useSoportesTransfusionales = ({
    id_paciente,
}: SoporteTransfusionalHookProps) => {
    const { token } = useToken()
    const { user } = useSessionUser()
    const [loading, setLoading] = useState<boolean>(false)
    const [soportes, setSoportes] = useState<SoporteTransfusional[]>([])
    const [mensaje, setMensaje] = useState<Mensaje | null>(null)
    const [mostrarMensaje, setMostrarMensaje] = useState<boolean>(false)

    const cargarSoportes = useCallback(async () => {
        try {
            setLoading(true)
            const resultado = await obtenerSoportesTransfusionalesPorPaciente(
                token,
                id_paciente,
            )

            if (resultado.status === 'success' && resultado.data) {
                const soportesFormateados = Array.isArray(resultado.data)
                    ? resultado.data.map(
                          (
                              soporte: SoporteTransfusionalResponse,
                              index: number,
                          ) => {
                              // Función para formatear fechas
                              const formatearFecha = (fechaOriginal) => {
                                  if (!fechaOriginal) return 'No especificada'

                                  const [año, mes, dia] = fechaOriginal
                                      .split('T')[0]
                                      .split('-')
                                  return `${dia}/${mes}/${año}`
                              }

                              return {
                                  id: soporte.id,
                                  Registro: resultado.data.length - index,
                                  fecha: formatearFecha(soporte.fecha),
                                  soporte_transfusional:
                                      soporte.soporte_transfusional,
                                  numero_transfusiones:
                                      soporte.numero_transfusiones,
                                  frecuencia: soporte.frecuencia,
                                  aloinmunizacion: soporte.aloinmunizacion
                                      ? 'Sí'
                                      : 'No',
                                  fecha_sobrecarga_hierro: formatearFecha(
                                      soporte.fecha_sobrecarga_hierro,
                                  ),
                                  quelentes: soporte.quelentes,
                                  ferritina: soporte.ferritina,
                                  ferritina_dosis: soporte.ferritina_dosis,
                                  fecha_sobrecarga_organo: formatearFecha(
                                      soporte.fecha_sobrecarga_organo,
                                  ),
                                  lic: soporte.lic,
                                  pancreatica: soporte.pancreatica,
                                  evaluacion_cardiaca:
                                      soporte.evaluacion_cardiaca,
                              }
                          },
                      )
                    : []
                setSoportes(soportesFormateados)
            } else {
                setSoportes([])
            }
        } catch (error) {
            console.error('Error al cargar soportes transfusionales:', error)
            setMensaje({
                tipo: 'error',
                texto: 'Error al cargar soportes transfusionales',
            })
            setMostrarMensaje(true)
        } finally {
            setLoading(false)
        }
    }, [token, id_paciente])

    useEffect(() => {
        cargarSoportes()
        // Hacer scroll al inicio de la página cuando se monte el componente
        window.scrollTo(0, 0)
    }, [cargarSoportes])

    const handleFormSubmit = async (data: FormData) => {
        try {
            setLoading(true)
            const resultado = await crearSoporteTransfusional(token, {
                ...data,
                id_paciente: id_paciente,
                id_user_create: user.id,
            })

            if (resultado.status === 'success') {
                setMensaje({
                    tipo: 'success',
                    texto: 'Soporte transfusional guardado correctamente',
                })
                await cargarSoportes()
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                })
            } else {
                setMensaje({
                    tipo: 'error',
                    texto:
                        resultado.message ||
                        'Error al guardar el soporte transfusional',
                })
            }
            setMostrarMensaje(true)
        } catch (error) {
            console.error('Error al guardar soporte transfusional:', error)
            setMensaje({
                tipo: 'error',
                texto: 'Error al guardar el soporte transfusional',
            })
            setMostrarMensaje(true)
        } finally {
            setLoading(false)
        }
    }

    const handleEliminarSoporte = async (soporte: SoporteTransfusional) => {
        try {
            setLoading(true)
            const resultado = await eliminarLogicamenteSoporteTransfusional(
                token,
                soporte.id,
            )

            if (resultado.status === 'success') {
                await cargarSoportes()
                setMensaje({
                    tipo: 'success',
                    texto: 'Soporte transfusional eliminado correctamente',
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
                        'Error al eliminar el soporte transfusional',
                })
                setMostrarMensaje(true)
            }
        } catch (error) {
            console.error('Error al eliminar soporte transfusional:', error)
            setMensaje({
                tipo: 'error',
                texto: 'Error al eliminar el soporte transfusional',
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
        'fecha',
        'soporte_transfusional',
        'numero_transfusiones',
        'frecuencia',
        'aloinmunizacion',
        'fecha_sobrecarga_hierro',
        'quelentes',
        'ferritina',
        'ferritina_dosis',
        'fecha_sobrecarga_organo',
        'lic',
        'pancreatica',
        'evaluacion_cardiaca',
    ]

    return {
        // Estados
        loading,
        soportes,
        mensaje,
        mostrarMensaje,
        headers,
        existenSoportes: soportes.length > 0,

        // Métodos
        handleFormSubmit,
        handleEliminarSoporte,
        handleCloseAlert,
    }
}
