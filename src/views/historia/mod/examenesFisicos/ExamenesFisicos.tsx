import { Card } from '@/components/ui'
import FormExamenesFisicos from './FormExamenesFisicos'
import ImgNino from './body/ImgNino'
import SeccionOne from './body/one/SeccionOne'
import SeccionTwo from './body/two/SeccionTwo'
import SeccionThree from './body/three/SeccionThree'
import { useParams } from 'react-router-dom'
import { ExamenFisicoProvider } from '@/context/ExamenFisicoContext'
import { useEffect, useState } from 'react'
import { consultarExamenFisicoPorPaciente } from '@/customService/services/examenesFisicosService'
import { useToken } from '@/store/authStore'
import RegionesResumenModal from './RegionesResumenModal'

function ExamenesFisicos() {
    const { id_paciente } = useParams() // Obtén el id de la URL
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [examenExistente, setExamenExistente] = useState(null)
    const { token } = useToken()

    useEffect(() => {
        const verificarExamenExistente = async () => {
            if (!id_paciente) return

            try {
                setLoading(true)
                // Llamamos al servicio para verificar si existe un examen para este paciente
                const response = await consultarExamenFisicoPorPaciente(
                    token,
                    id_paciente,
                )

                // Validar la estructura de la respuesta (podría ser response.data o simplemente response)
                const examenData = response?.data || response

                if (examenData && examenData.id) {
                    setExamenExistente(examenData)
                } else {
                    setExamenExistente(null)
                }
            } catch (err) {
                console.error('Error al consultar examen físico:', err)
                setError('Error al cargar información del examen físico')
                setExamenExistente(null)
            } finally {
                setLoading(false)
            }
        }

        verificarExamenExistente()
    }, [id_paciente, token])

    return (
        <ExamenFisicoProvider initialExamen={examenExistente}>
            <Card>
                {loading ? (
                    <div className="p-4 text-center">
                        <p>Cargando información del examen físico...</p>
                    </div>
                ) : error ? (
                    <div className="p-4 text-center text-red-500">
                        <p>{error}</p>
                    </div>
                ) : (
                    <>
                        <FormExamenesFisicos
                            examenExistente={examenExistente}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            {/* Columna izquierda */}
                            <ImgNino />
                            {/* Columna derecha dividida en 3 secciones */}
                            <div className="grid grid-rows-3 gap-4">
                                <div className="p-4 text-white">
                                    {/* Sección 1 */}
                                    <SeccionOne />
                                </div>
                                <div className="p-4 text-white">
                                    {/* Sección 2 */}
                                    <SeccionTwo />
                                </div>
                                <div className="p-4 text-white">
                                    {/* Sección 3 */}
                                    <SeccionThree />
                                </div>
                            </div>
                        </div>

                        {/* Botón "Ver Regiones" alineado a la derecha */}
                        <div className="mt-6 flex justify-end">
                            <RegionesResumenModal />
                        </div>
                    </>
                )}
            </Card>
        </ExamenFisicoProvider>
    )
}

export default ExamenesFisicos
