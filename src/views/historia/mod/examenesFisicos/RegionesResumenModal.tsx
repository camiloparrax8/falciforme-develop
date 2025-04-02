import { useState, useEffect, useCallback } from 'react'
import { Button, Dialog } from '@/components/ui'
import { useExamenFisico } from '@/hooks/useExamenFisico'
import { FaEye } from 'react-icons/fa'
import { consultarExamenFisicoPorPaciente } from '@/customService/services/examenesFisicosService'
import { useToken } from '@/store/authStore'
import { useParams } from 'react-router-dom'

// Mapeo personalizado de claves
const nombresCampos: Record<string, string> = {
    // Región Cefálica
    perimetroCefalico: 'Perímetro Cefálico',
    agudezaVisual: 'Agudeza Visual',
    examenBoca: 'Examen de la boca',
    examenNariz: 'Examen de la nariz',
    examenOidos: 'Examen de los oídos',
    caries: 'Caries',
    cuello: 'Cuello',

    // Región Toracoabdominal
    cardioPulmonar: 'Cardio Pulmonar',
    abdominal: 'Abdominal',

    // Región Pélvica
    tanner: 'Tanner',
    observacionExtremidades: 'Observación de extremidades',
    estadoPiel: 'Estado de la piel',
    edemasYUlceras: 'Edemas y Úlceras',
}

// Componente principal
function RegionesResumenModal() {
    const [isOpen, setIsOpen] = useState(false)
    const { examenData, setExamenData } = useExamenFisico()
    const { id_paciente } = useParams()
    const { token } = useToken()
    const [regionCefalica, setRegionCefalica] = useState<
        Record<string, unknown>
    >({})
    const [regionToracoabdominal, setRegionToracoabdominal] = useState<
        Record<string, unknown>
    >({})
    const [regionPelvica, setRegionPelvica] = useState<Record<string, unknown>>(
        {},
    )

    // Función para cargar los datos más recientes del examen
    const cargarDatosActualizados = useCallback(async () => {
        if (!id_paciente || !token) return

        try {
            const resultado = await consultarExamenFisicoPorPaciente(
                token,
                id_paciente,
            )

            // Verificar la estructura de la respuesta (podría ser response.data o simplemente response)
            const examenActualizado = resultado?.data || resultado

            if (examenActualizado && examenActualizado.id) {
                // Actualizar el contexto con los datos más recientes
                setExamenData(examenActualizado)
                console.log('Datos de examen actualizados:', examenActualizado)
            }
        } catch (error) {
            console.error('Error al actualizar datos del examen:', error)
        } finally {
            /* empty */
        }
    }, [id_paciente, token, setExamenData])

    const handleOpenModal = () => {
        // Actualizar los datos antes de abrir el modal
        cargarDatosActualizados()
        setIsOpen(true)
    }

    const handleCloseModal = () => {
        setIsOpen(false)
    }

    // Organizar datos por regiones
    const organizarDatosPorRegiones = useCallback(() => {
        if (!examenData) {
            setRegionCefalica({})
            setRegionToracoabdominal({})
            setRegionPelvica({})
            return
        }

        // Datos de región cefálica
        setRegionCefalica({
            perimetroCefalico: examenData.perimetro_cefalico || 'No registrado',
            agudezaVisual: examenData.vision || 'No registrado',
            examenBoca: examenData.examen_boca || 'No registrado',
            examenNariz: examenData.examen_nariz || 'No registrado',
            examenOidos: examenData.examen_oidos || 'No registrado',
            caries:
                examenData.caries === null
                    ? 'No registrado'
                    : examenData.caries
                      ? 'Si'
                      : 'No',
            cuello: examenData.cuello || 'No registrado',
        })

        // Datos de región toracoabdominal
        setRegionToracoabdominal({
            cardioPulmonar: examenData.cardio_pulmunar || 'No registrado',
            abdominal: examenData.condicion_abdominal || 'No registrado',
        })

        // Datos de región pélvica
        setRegionPelvica({
            tanner: examenData.tanner || 'No registrado',
            observacionExtremidades:
                examenData.extremidades_observacion || 'No registrado',
            estadoPiel: examenData.extremidades_estado_piel || 'No registrado',
            edemasYUlceras:
                examenData.extremidades_condicion || 'No registrado',
        })
    }, [examenData])

    // Actualizar los datos cuando cambia examenData
    useEffect(() => {
        organizarDatosPorRegiones()
    }, [examenData, organizarDatosPorRegiones])

    // Configurar actualización periódica cuando el modal está abierto
    useEffect(() => {
        let intervalId: NodeJS.Timeout | null = null

        if (isOpen) {
            // Actualizar inmediatamente al abrir
            cargarDatosActualizados()

            // Configurar actualización cada 2 segundos mientras el modal esté abierto
            intervalId = setInterval(() => {
                cargarDatosActualizados()
            }, 2000)
        }

        // Limpiar el intervalo cuando se cierre el modal o se desmonte el componente
        return () => {
            if (intervalId) clearInterval(intervalId)
        }
    }, [isOpen, cargarDatosActualizados])

    // Renderizar datos de una región
    const renderDatosRegion = (datos: Record<string, unknown>) => {
        if (!datos || Object.keys(datos).length === 0) {
            return (
                <p className="text-gray-500 italic">
                    No hay datos disponibles para esta región.
                </p>
            )
        }

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                {Object.entries(datos).map(([clave, valor]) => (
                    <div
                        key={clave}
                        className="border p-3 rounded-md bg-gray-50 min-h-[80px] flex flex-col"
                    >
                        <div className="font-bold text-base text-slate-950 mb-1 border-b pb-1">
                            {obtenerNombreCampo(clave)}
                        </div>
                        <div className="text-gray-800 text-base overflow-auto max-h-[150px] whitespace-normal break-words">
                            {valor !== undefined && valor !== null
                                ? String(valor)
                                : 'No registrado'}
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    // Función para obtener el nombre formateado de un campo
    const obtenerNombreCampo = (clave: string): string => {
        // Si existe en el mapeo personalizado, lo usamos
        if (nombresCampos[clave]) {
            return nombresCampos[clave]
        }

        // Si no está en el mapeo, usamos la clave directamente
        return clave
    }

    return (
        <>
            {/* Botón para abrir el modal */}
            <div className="inline-flex">
                <Button
                    variant="solid"
                    icon={<FaEye />}
                    onClick={handleOpenModal}
                >
                    Ver Regiones
                </Button>
            </div>

            {/* Modal con los datos de las regiones */}
            <Dialog
                isOpen={isOpen}
                width={3000}
                onClose={handleCloseModal}
                onRequestClose={handleCloseModal}
            >
                <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-semibold">
                        Resumen de Examen Físico por Regiones
                    </h4>
                </div>

                {!examenData ? (
                    <div className="p-4 text-red-500">
                        <p>No hay un examen físico registrado.</p>
                    </div>
                ) : (
                    <div className="p-4 overflow-auto max-h-[70vh]">
                        <div className="mb-8">
                            <h5 className="font-medium mb-3 text-blue-600 text-xl border-b pb-2">
                                Región Cefálica o Superior (Cabeza y Cuello)
                            </h5>
                            {renderDatosRegion(regionCefalica)}
                        </div>

                        <div className="mb-8">
                            <h5 className="font-medium mb-3 text-blue-600 text-xl border-b pb-2">
                                Región Toracoabdominal o Media (Tórax y Abdomen)
                            </h5>
                            {renderDatosRegion(regionToracoabdominal)}
                        </div>

                        <div className="mb-8">
                            <h5 className="font-medium mb-3 text-blue-600 text-xl border-b pb-2">
                                Región Pélvica o Inferior (Pelvis y Extremidades
                                Inferiores)
                            </h5>
                            {renderDatosRegion(regionPelvica)}
                        </div>
                    </div>
                )}

                <div className="flex justify-end mt-4">
                    <Button onClick={handleCloseModal}>Cerrar</Button>
                </div>
            </Dialog>
        </>
    )
}

export default RegionesResumenModal
