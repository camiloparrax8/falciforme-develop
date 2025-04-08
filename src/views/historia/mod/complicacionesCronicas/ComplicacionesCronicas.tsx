import { Card, Alert } from '@/components/ui'
import ImgNino from '../examenesFisicos/body/ImgNino'
import SeccionOne from './body/one/SeccionOne'
import SeccionTwo from './body/two/SeccionTwo'
import SeccionTres from './body/three/SeccionThree'
import CronicasResumenModal from '@/views/historia/mod/complicacionesCronicas/CronicasResumenModal'
import {
    ComplicacionesCronicasProvider,
    ComplicacionesCronicasData,
} from '@/context/ComplicacionesCronicasContext'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useToken, useSessionUser } from '@/store/authStore'
import { buscarComplicacionesCronicasPorIdPaciente } from '@/customService/services/complicacionesCronicasService'

function ComplicacionesCronicas() {
    const { id_paciente } = useParams()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const { token } = useToken()
    const { user } = useSessionUser()
    const [initialComplicacion, setInitialComplicacion] =
        useState<ComplicacionesCronicasData | null>(null)
    const [mostrarMensajeInfo, setMostrarMensajeInfo] = useState(true)

    useEffect(() => {
        const cargarComplicacionesCronicas = async () => {
            if (!id_paciente) return

            try {
                setLoading(true)
                const response =
                    await buscarComplicacionesCronicasPorIdPaciente(
                        token,
                        id_paciente,
                    )

                if (response.status === 'success' && response.data) {
                    setInitialComplicacion(response.data)
                }
            } catch (error) {
                console.error('Error al cargar complicaciones crónicas:', error)
                setError(
                    'Error al cargar información de las complicaciones crónicas',
                )
                setInitialComplicacion(null)
            } finally {
                setLoading(false)
            }
        }

        cargarComplicacionesCronicas()
    }, [id_paciente, token])

    // Función para actualizar la complicación en el contexto
    const actualizarComplicacion = async () => {
        if (!id_paciente) return

        try {
            const response = await buscarComplicacionesCronicasPorIdPaciente(
                token,
                id_paciente,
            )
            if (response.status === 'success' && response.data) {
                setInitialComplicacion(response.data)
            }
        } catch (error) {
            console.error('Error al actualizar la complicación:', error)
        }
    }

    const handleCloseAlertInfo = () => {
        setMostrarMensajeInfo(false)
    }

    if (loading) {
        return <div>Cargando...</div>
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <ComplicacionesCronicasProvider
            initialComplicacion={initialComplicacion}
            actualizarComplicacion={actualizarComplicacion}
        >
            <Card>
                {initialComplicacion && mostrarMensajeInfo && (
                    <div className="mb-4">
                        <Alert
                            showIcon
                            closable
                            title="Información"
                            type="info"
                            duration={10000}
                            onClose={handleCloseAlertInfo}
                        >
                            Este paciente ya tiene registradas complicaciones crónicas. 
                            No podrá crear un nuevo registro.
                        </Alert>
                    </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {/* Columna izquierda */}
                    <ImgNino></ImgNino>
                    {/* Columna derecha dividida en 3 secciones */}
                    <div className="grid grid-rows-3 gap-4">
                        <div className="p-4 text-white">
                            {/* Sección 1 */}
                            <SeccionOne></SeccionOne>
                        </div>
                        {/* Sección 2 */}
                        <div className="p-4 text-white">
                            {/* Sección 3 */}
                            <SeccionTwo></SeccionTwo>
                        </div>
                        {/* Sección 3 */}
                        <div className="p-4 text-white">
                            <SeccionTres></SeccionTres>
                        </div>
                    </div>
                </div>
                {/* Botón "Ver Regiones" alineado a la derecha */}
                <div className="mt-6 flex justify-end">
                    <CronicasResumenModal />
                </div>
            </Card>
        </ComplicacionesCronicasProvider>
    )
}

export default ComplicacionesCronicas
