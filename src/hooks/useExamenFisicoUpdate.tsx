import { useState } from 'react'
import { useToken } from '@/store/authStore'
import { useExamenFisico } from './useExamenFisico'
import { actualizarCamposExamenFisico } from '@/customService/services/examenesFisicosService'

interface UpdateResult {
    success: boolean
    message: string
    data?: Record<string, unknown>
}

export const useExamenFisicoUpdate = () => {
    const { token } = useToken()
    const { idExamenFisico } = useExamenFisico()
    const [isLoading, setIsLoading] = useState(false)
    const [result, setResult] = useState<UpdateResult | null>(null)

    // Actualizar perímetro cefálico
    async function updatePerimetroCefalico(datos: {
        perimetroCefalico: string
    }) {
        setIsLoading(true)
        setResult(null)

        try {
            if (!idExamenFisico) {
                throw new Error('No hay un examen físico activo')
            }

            const camposActualizados = {
                perimetro_cefalico: parseFloat(datos.perimetroCefalico),
            }

            console.log('Datos que se envían al backend:', camposActualizados)

            const response = await actualizarCamposExamenFisico(
                token,
                idExamenFisico,
                camposActualizados
            )

            setResult({
                success: true,
                message: 'Perímetro cefálico actualizado correctamente',
                data: response,
            })

            return response
        } catch (error) {
            const errorMessage = error.message || 'Error al actualizar el perímetro cefálico'
            setResult({
                success: false,
                message: errorMessage,
            })
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    // Actualizar agudeza visual
    const updateAgudezaVisual = async (datos: { visualizacion: string }) => {
        setIsLoading(true)
        setResult(null)

        try {
            if (!idExamenFisico) {
                throw new Error('No hay un examen físico activo')
            }

            const camposActualizados = {
                vision: datos.visualizacion,
            }

            const response = await actualizarCamposExamenFisico(
                token,
                idExamenFisico,
                camposActualizados,
            )

            setResult({
                success: true,
                message: 'Agudeza visual actualizada correctamente',
                data: response,
            })

            return response
        } catch (error) {
            const errorMessage =
                error.message || 'Error al actualizar la agudeza visual'
            setResult({
                success: false,
                message: errorMessage,
            })
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    // Actualizar examen ORL
    const updateExamenORL = async (datos: {
        boca: string
        nariz: string
        oidos: string
    }) => {
        setIsLoading(true)
        setResult(null)

        try {
            if (!idExamenFisico) {
                throw new Error('No hay un examen físico activo')
            }

            const camposActualizados = {
                examen_boca: datos.boca,
                examen_nariz: datos.nariz,
                examen_oidos: datos.oidos,
            }

            const response = await actualizarCamposExamenFisico(
                token,
                idExamenFisico,
                camposActualizados,
            )

            setResult({
                success: true,
                message: 'Examen ORL actualizado correctamente',
                data: response,
            })

            return response
        } catch (error) {
            const errorMessage =
                error.message || 'Error al actualizar el examen ORL'
            setResult({
                success: false,
                message: errorMessage,
            })
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    // Actualizar caries
    const updateCaries = async (datos: { caries: string }) => {
        setIsLoading(true)
        setResult(null)

        try {
            if (!idExamenFisico) {
                throw new Error('No hay un examen físico activo')
            }

            const camposActualizados = {
                caries: datos.caries === 'Si',
            }

            const response = await actualizarCamposExamenFisico(
                token,
                idExamenFisico,
                camposActualizados,
            )

            setResult({
                success: true,
                message: 'Información de caries actualizada correctamente',
                data: response,
            })

            return response
        } catch (error) {
            const errorMessage =
                error.message || 'Error al actualizar la información de caries'
            setResult({
                success: false,
                message: errorMessage,
            })
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    // Actualizar cuello
    const updateCuello = async (datos: { observacion: string }) => {
        setIsLoading(true)
        setResult(null)

        try {
            if (!idExamenFisico) {
                throw new Error('No hay un examen físico activo')
            }

            const camposActualizados = {
                cuello: datos.observacion,
            }

            const response = await actualizarCamposExamenFisico(
                token,
                idExamenFisico,
                camposActualizados,
            )

            setResult({
                success: true,
                message: 'Información del cuello actualizada correctamente',
                data: response,
            })

            return response
        } catch (error) {
            const errorMessage =
                error.message || 'Error al actualizar la información del cuello'
            setResult({
                success: false,
                message: errorMessage,
            })
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    // Actualizar Cardiopulmunar
    const updateCardiopulmunar = async (datos: { observacion: string }) => {
        setIsLoading(true)
        setResult(null)

        try {
            if (!idExamenFisico) {
                throw new Error('No hay un examen físico activo')
            }

            const camposActualizados = {
                cardio_pulmunar: datos.observacion,
            }

            console.log(
                'Datos cardiopulmunar que se envían al backend:',
                camposActualizados,
            )

            const response = await actualizarCamposExamenFisico(
                token,
                idExamenFisico,
                camposActualizados,
            )

            setResult({
                success: true,
                message: 'Información cardiopulmunar actualizada correctamente',
                data: response,
            })

            return response
        } catch (error) {
            const errorMessage =
                error.message ||
                'Error al actualizar la información cardiopulmunar'
            setResult({
                success: false,
                message: errorMessage,
            })
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    // Actualizar Abdominal
    const updateAbdominal = async (datos: {
        condicionesAbdominales: string[]
    }) => {
        setIsLoading(true)
        setResult(null)

        try {
            if (!idExamenFisico) {
                throw new Error('No hay un examen físico activo')
            }

            const camposActualizados = {
                condicion_abdominal: datos.condicionesAbdominales.join(', '),
            }

            console.log(
                'Datos abdominales que se envían al backend:',
                camposActualizados,
            )

            const response = await actualizarCamposExamenFisico(
                token,
                idExamenFisico,
                camposActualizados,
            )

            setResult({
                success: true,
                message: 'Información abdominal actualizada correctamente',
                data: response,
            })

            return response
        } catch (error) {
            const errorMessage =
                error.message || 'Error al actualizar la información abdominal'
            setResult({
                success: false,
                message: errorMessage,
            })
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    // Actualizar Extremidades
    const updateExtremidades = async (datos: {
        observacion: string
        piel: string
        edemasUlceras: string[]
    }) => {
        setIsLoading(true)
        setResult(null)

        try {
            if (!idExamenFisico) {
                throw new Error('No hay un examen físico activo')
            }

            const camposActualizados = {
                extremidades_observacion: datos.observacion,
                extremidades_estado_piel: datos.piel,
                extremidades_condicion: datos.edemasUlceras.join(', '),
            }

            console.log(
                'Datos de extremidades que se envían al backend:',
                camposActualizados,
            )

            const response = await actualizarCamposExamenFisico(
                token,
                idExamenFisico,
                camposActualizados,
            )

            setResult({
                success: true,
                message:
                    'Información de extremidades actualizada correctamente',
                data: response,
            })

            return response
        } catch (error) {
            const errorMessage =
                error.message ||
                'Error al actualizar la información de extremidades'
            setResult({
                success: false,
                message: errorMessage,
            })
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    // Actualizar Tanner
    const updateTanner = async (datos: { estadioTanner: string }) => {
        setIsLoading(true)
        setResult(null)

        try {
            if (!idExamenFisico) {
                throw new Error('No hay un examen físico activo')
            }

            const camposActualizados = {
                tanner: datos.estadioTanner,
            }

            console.log(
                'Datos de Tanner que se envían al backend:',
                camposActualizados,
            )

            const response = await actualizarCamposExamenFisico(
                token,
                idExamenFisico,
                camposActualizados,
            )

            setResult({
                success: true,
                message: 'Estadio de Tanner actualizado correctamente',
                data: response,
            })

            return response
        } catch (error) {
            const errorMessage =
                error.message || 'Error al actualizar el estadio de Tanner'
            setResult({
                success: false,
                message: errorMessage,
            })
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    const updatePiel = async (data) => {
        if (!idExamenFisico) {
            setResult({
                success: false,
                message:
                    'No hay un examen físico activo. Debe crear uno primero.',
            })
            return
        }

        setIsLoading(true)

        try {
            const updatedData = {
                id_examen_fisico: idExamenFisico,
                ...data,
            }

            console.log('Enviando datos de piel:', updatedData)

            // Aquí iría la llamada al backend
            // const response = await axios.post('/api/examenes-fisicos/piel', updatedData);

            // Simulación de respuesta exitosa
            // En producción, this would be replaced with the actual API call
            await new Promise((resolve) => setTimeout(resolve, 1000))

            setResult({
                success: true,
                message: 'Información de piel actualizada con éxito',
            })
        } catch (error) {
            console.error('Error al actualizar información de piel:', error)
            setResult({
                success: false,
                message: 'Error al actualizar información de piel',
            })
        } finally {
            setIsLoading(false)
        }
    }

    const updateCabeza = async (data) => {
        if (!idExamenFisico) {
            setResult({
                success: false,
                message:
                    'No hay un examen físico activo. Debe crear uno primero.',
            })
            return
        }

        setIsLoading(true)

        try {
            const updatedData = {
                id_examen_fisico: idExamenFisico,
                ...data,
            }

            console.log('Enviando datos de cabeza:', updatedData)

            // Aquí iría la llamada al backend
            // const response = await axios.post('/api/examenes-fisicos/cabeza', updatedData);

            // Simulación de respuesta exitosa
            await new Promise((resolve) => setTimeout(resolve, 1000))

            setResult({
                success: true,
                message: 'Información de cabeza actualizada con éxito',
            })
        } catch (error) {
            console.error('Error al actualizar información de cabeza:', error)
            setResult({
                success: false,
                message: 'Error al actualizar información de cabeza',
            })
        } finally {
            setIsLoading(false)
        }
    }

    return {
        isLoading,
        result,
        updatePerimetroCefalico,
        updateAgudezaVisual,
        updateExamenORL,
        updateCaries,
        updateCuello,
        updateCardiopulmunar,
        updateAbdominal,
        updateExtremidades,
        updateTanner,
        updatePiel,
        updateCabeza,
    }
}
