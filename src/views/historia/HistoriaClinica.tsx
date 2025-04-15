import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useToken } from '@/store/authStore'
import { usePatient, PatientProvider } from '@/context/PatientContext'
import { AdaptiveCard, Container, BackButton } from '@/components/shared'
import CardHC from '@/views/common/historia/CardHc'
import { modulos } from '@/views/historia/modulos'
import { buscarPacienteById } from '@/customService/services/pacienteService'
import { consultarExamenFisicoPorPaciente } from '@/customService/services/examenesFisicosService'
import { consultarTransplantesProgenitoresPorPaciente } from '@/customService/services/transplantesProgenitoresService'
import { obtenerComplicacionAgudaPorPaciente } from '@/customService/services/complicacionAgudaService'
import { obtenerLaboratoriosPorPaciente } from '@/customService/services/laboratorioService'
import { buscarComplicacionesCronicasPorIdPaciente } from '@/customService/services/complicacionesCronicasService'
import { obtenerImagenesDiagnosticasPorPaciente } from '@/customService/services/imagenDiagnosticaService'
import { useSoportesTransfusionales } from '@/hooks/useSoportesTransfusionales'
import { useVacunas_hc } from '@/hooks/useVacunas_hc'
import { useTratamientos } from '@/hooks/useTratamientos'
import SectionTitle from '@/views/common/form/SectionTitle'
import Spinner from '@/components/ui/Spinner'
import {
    cerrarHistoriaClinica,
    buscarHcOpenById,
    obtenerHistoriasClinicasPorPaciente,
} from '@/customService/services/historiaClinicaService'
import { toast } from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import { Button } from '@/components/ui'
import { useGeneratePDF } from '@/hooks/useGeneratePDF'

const HistoriaClinicaWrapper = () => {
    return (
        <PatientProvider>
            <HistoriaClinica />
        </PatientProvider>
    )
}
const HistoriaClinica = () => {
    const { id } = useParams()
    const { paciente, setPaciente } = usePatient()
    const { token } = useToken()
    const [modulosActualizados, setModulosActualizados] = useState([...modulos])
    const { existeVacuna } = useVacunas_hc({ id_paciente: id })
    const [isLoading, setIsLoading] = useState(true)
    const { existenSoportes } = useSoportesTransfusionales({ id_paciente: id })
    const { existenTratamientos } = useTratamientos({ id_paciente: id })
    const [historiaClinica, setHistoriaClinica] = useState(null)
    const [finalizandoConsulta, setFinalizandoConsulta] = useState(false)
    const { generatePDF } = useGeneratePDF()
    const [historiasClinicas, setHistoriasClinicas] = useState([])

    useEffect(() => {
        if (id) {
            setPaciente({ id }) // Actualiza el contexto con el id
        }
    }, [id, setPaciente])

    useEffect(() => {
        const fetchPaciente = async () => {
            try {
                const response = await buscarPacienteById(token, id)
                if (response?.data) {
                    setPaciente(response.data) // Actualiza el contexto con los datos del paciente
                }
            } catch (error) {
                console.error('Error al obtener el paciente:', error)
            }
        }

        if (id) {
            fetchPaciente()
        }
    }, [id, setPaciente, token])

    useEffect(() => {
        const obtenerHistoriaClinica = async () => {
            try {
                const response = await buscarHcOpenById(token, id)
                if (response?.data) {
                    setHistoriaClinica(response.data)
                }
            } catch (error) {
                console.error('Error al obtener la historia clínica:', error)
            }
        }

        if (id && token) {
            obtenerHistoriaClinica()
        }
    }, [id, token])

    // Cargar todas las historias clínicas del paciente
    useEffect(() => {
        const cargarHistoriasClinicas = async () => {
            if (!id || !token) return

            try {
                const response = await obtenerHistoriasClinicasPorPaciente(
                    token,
                    id,
                )
                if (response && response.length > 0) {
                    // Ordenar las historias clínicas por fecha de creación (descendente)
                    const historiasOrdenadas = [...response].sort((a, b) => {
                        const fechaA = new Date(a.fecha_creacion).getTime()
                        const fechaB = new Date(b.fecha_creacion).getTime()
                        return fechaB - fechaA // Orden descendente (más reciente primero)
                    })
                    setHistoriasClinicas(historiasOrdenadas)
                } else {
                    setHistoriasClinicas([])
                }
            } catch (error) {
                console.error('Error al cargar historias clínicas:', error)
                setHistoriasClinicas([])
            }
        }

        cargarHistoriasClinicas()
    }, [id, token])

    // Efecto para verificar los estados de los módulos
    useEffect(() => {
        const verificarEstadoModulos = async () => {
            if (!id || !token) return

            try {
                setIsLoading(true)
                // Crear una copia de los módulos originales
                const nuevosModulos = JSON.parse(JSON.stringify(modulos))

                // 1. Verificar si existe un examen físico para este paciente
                const respuestaExamen = await consultarExamenFisicoPorPaciente(
                    token,
                    id,
                )
                // Verificación para examen físico
                const examenExiste =
                    respuestaExamen &&
                    // La respuesta es success y tiene datos
                    ((respuestaExamen.status === 'success' &&
                        respuestaExamen.data &&
                        // Los datos pueden estar estructurados de varias formas:
                        (respuestaExamen.data.id ||
                            (respuestaExamen.data.data &&
                                respuestaExamen.data.data.id) ||
                            (Array.isArray(respuestaExamen.data) &&
                                respuestaExamen.data.length > 0) ||
                            (typeof respuestaExamen.data === 'object' &&
                                Object.keys(respuestaExamen.data).length >
                                    0))) ||
                        respuestaExamen.id ||
                        (Array.isArray(respuestaExamen) &&
                            respuestaExamen.length > 0))

                // 2. Verificar si existe una complicación aguda para este paciente
                const respuestaComplicacion =
                    await obtenerComplicacionAgudaPorPaciente(token, id)

                // Verificación para complicaciones agudas
                const complicacionExiste =
                    respuestaComplicacion &&
                    respuestaComplicacion.status === 'success' &&
                    respuestaComplicacion.data &&
                    (respuestaComplicacion.data.id ||
                        (Array.isArray(respuestaComplicacion.data) &&
                            respuestaComplicacion.data.length > 0 &&
                            respuestaComplicacion.data[0].id))

                // 3. Verificar si existen complicaciones crónicas para este paciente
                const respuestaComplicacionCronica =
                    await buscarComplicacionesCronicasPorIdPaciente(token, id)

                // Verificación para complicaciones crónicas
                const complicacionCronicaExiste =
                    respuestaComplicacionCronica &&
                    respuestaComplicacionCronica.status === 'success' &&
                    respuestaComplicacionCronica.data &&
                    (respuestaComplicacionCronica.data.id ||
                        (Array.isArray(respuestaComplicacionCronica.data) &&
                            respuestaComplicacionCronica.data.length > 0))

                // 4. Verificar si existe un trasplante de progenitores para este paciente
                const respuestaTrasplante =
                    await consultarTransplantesProgenitoresPorPaciente(
                        token,
                        id,
                    )

                // Verificación estricta para trasplante de progenitores
                let trasplanteExiste = false

                if (
                    respuestaTrasplante &&
                    respuestaTrasplante.status === 'success' &&
                    respuestaTrasplante.data
                ) {
                    if (respuestaTrasplante.data.id) {
                        // Si es un objeto directo con ID
                        trasplanteExiste = true
                    } else if (
                        Array.isArray(respuestaTrasplante.data) &&
                        respuestaTrasplante.data.length > 0
                    ) {
                        // Si es un array, verificar que el primer elemento tenga ID
                        trasplanteExiste = !!respuestaTrasplante.data[0]?.id
                    } else if (
                        respuestaTrasplante.data.data &&
                        respuestaTrasplante.data.data.id
                    ) {
                        // Si tiene un objeto anidado data con ID
                        trasplanteExiste = true
                    }
                    // En cualquier otro caso, trasplanteExiste permanece false
                }

                // 5. Verificar si existe un laboratorio para este paciente
                const respuestaLaboratorio =
                    await obtenerLaboratoriosPorPaciente(token, id)

                // Verificación para laboratorios
                const laboratorioExiste =
                    respuestaLaboratorio &&
                    respuestaLaboratorio.status === 'success' &&
                    respuestaLaboratorio.data &&
                    (respuestaLaboratorio.data.id ||
                        (Array.isArray(respuestaLaboratorio.data) &&
                            respuestaLaboratorio.data.length > 0 &&
                            respuestaLaboratorio.data[0].id))

                // 6. Verificar si existe una imagen diagnóstica para este paciente
                const respuestaImagenDiagnostica =
                    await obtenerImagenesDiagnosticasPorPaciente(token, id)

                //Verififcacion para imagenes diagnosticas
                const imagenDiagnosticaExiste =
                    respuestaImagenDiagnostica &&
                    respuestaImagenDiagnostica.status === 'success' &&
                    respuestaImagenDiagnostica.data &&
                    (respuestaImagenDiagnostica.data.id ||
                        (Array.isArray(respuestaImagenDiagnostica.data) &&
                            respuestaImagenDiagnostica.data.length > 0 &&
                            respuestaImagenDiagnostica.data[0].id))

                // Actualizar los módulos con el estado correcto
                const modulosActualizados = nuevosModulos.map((modulo) => {
                    if (modulo.id === 1) {
                        // Módulo de Exámenes Físicos (id: 1)
                        return {
                            ...modulo,
                            estado: examenExiste ? 1 : 0,
                        }
                    } else if (modulo.id === 2) {
                        // Módulo de Complicaciones Agudas (id: 2)
                        return {
                            ...modulo,
                            estado: complicacionExiste ? 1 : 0,
                        }
                    } else if (modulo.id === 3) {
                        // Módulo de Complicaciones Crónicas (id: 3)
                        return {
                            ...modulo,
                            estado: complicacionCronicaExiste ? 1 : 0,
                        }
                    } else if (modulo.id === 4) {
                        // Módulo de Trasplante de Progenitores (id: 4)
                        return {
                            ...modulo,
                            estado: trasplanteExiste ? 1 : 0,
                        }
                    } else if (modulo.id === 5) {
                        // Módulo de Laboratorios (id: 5)
                        return {
                            ...modulo,
                            estado: laboratorioExiste ? 1 : 0,
                        }
                    } else if (modulo.id === 6) {
                        // Módulo de Imágenes Diagnósticas (id: 6)
                        return {
                            ...modulo,
                            estado: imagenDiagnosticaExiste ? 1 : 0,
                        }
                    } else if (modulo.id === 7) {
                        // Módulo de Soportes Transfusionales (id: 7)
                        return {
                            ...modulo,
                            estado: existenSoportes ? 1 : 0,
                        }
                    } else if (modulo.id === 8) {
                        // Módulo de Vacunas (id: 8)
                        return {
                            ...modulo,
                            estado: existeVacuna ? 1 : 0,
                        }
                    } else if (modulo.id === 9) {
                        // Módulo de Tratamientos (id: 9)
                        return {
                            ...modulo,
                            estado: existenTratamientos ? 1 : 0,
                        }
                    }
                    return modulo
                })

                setModulosActualizados(modulosActualizados)
            } catch (error) {
                console.error('Error al verificar estado de módulos:', error)
                // En caso de error, asegurarse de que los módulos estén como pendientes
                setModulosActualizados(modulos)
            } finally {
                setIsLoading(false)
            }
        }

        verificarEstadoModulos()
    }, [id, token, existeVacuna, existenSoportes, existenTratamientos])

    const handleFinalizarConsulta = async () => {
        if (!historiaClinica || !historiaClinica.id) {
            toast.push(
                <Notification title="Advertencia" type="warning">
                    No hay una historia clínica abierta para finalizar
                </Notification>,
            )
            return
        }

        try {
            setFinalizandoConsulta(true)
            const response = await cerrarHistoriaClinica(
                token,
                historiaClinica.id,
            )

            if (response && response.status === 'success') {
                // Guardar el ID de la historia clínica antes de actualizar el estado
                const historiaClinicaId = historiaClinica.id

                toast.push(
                    <Notification title="Éxito" type="success">
                        Consulta finalizada correctamente
                    </Notification>,
                )

                // Actualizar el estado de la historia clínica
                setHistoriaClinica(null)

                // Generar el PDF automáticamente después de finalizar la consulta
                try {
                    // Buscar la historia clínica por ID en el array de historias
                    const historiaCompleta = historiasClinicas.find(
                        (historia) => historia.id === historiaClinicaId,
                    )

                    if (!historiaCompleta) {
                        console.error('Historia clínica no encontrada')
                        return
                    }

                    // Preparar los datos para el PDF incluyendo información del paciente
                    const datosParaPDF = {
                        paciente: {
                            ...paciente,
                            nombre: `${paciente.nombre} ${paciente.apellido}`,
                            edad: paciente.fecha_nacimiento
                                ? Math.floor(
                                      (new Date().getTime() -
                                          new Date(
                                              paciente.fecha_nacimiento,
                                          ).getTime()) /
                                          (365.25 * 24 * 60 * 60 * 1000),
                                  )
                                : 'N/A',
                        },
                        ...historiaCompleta,
                    }

                    // Abrir una nueva ventana para el PDF
                    const newWindow = window.open('', '_blank')
                    // Generar el PDF con los datos completos
                    await generatePDF(datosParaPDF, newWindow)
                } catch (pdfError) {
                    console.error('Error al generar el PDF:', pdfError)
                    toast.push(
                        <Notification title="Error" type="danger">
                            Consulta finalizada, pero hubo un error al generar
                            el PDF
                        </Notification>,
                    )
                }
            } else {
                toast.push(
                    <Notification title="Error" type="danger">
                        {response?.message || 'Error al finalizar la consulta'}
                    </Notification>,
                )
            }
        } catch (error) {
            console.error('Error al finalizar la consulta:', error)
            toast.push(
                <Notification title="Error" type="danger">
                    Error al finalizar la consulta
                </Notification>,
            )
        } finally {
            setFinalizandoConsulta(false)
        }
    }

    return (
        <Container>
            <AdaptiveCard>
                <BackButton variant="default" />
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-4">
                        <SectionTitle
                            text={
                                `Historia clínica de: ${paciente?.nombre} ${paciente?.apellido}` ||
                                'Cargando...'
                            }
                            className="col-span-1 md:col-span-2 lg:col-span-4"
                        />
                    </div>
                </div>
                {isLoading ? (
                    <div className="flex flex-col justify-center items-center h-40">
                        <Spinner size={40} />
                    </div>
                ) : (
                    <>
                        <div className="mt-4 grid grid-cols-6 gap-4">
                            {modulosActualizados.map((item) => (
                                <CardHC
                                    key={item.id}
                                    title={item.title}
                                    uri={`${item.uri}/${id}`}
                                    iconName={item.iconName}
                                    estado={item.estado}
                                    recomendacion={item.recomendacion}
                                    className="col-span-6 sm:col-span-3 lg:col-span-2"
                                />
                            ))}
                        </div>

                        {/* Botones de acción */}
                        {historiaClinica && (
                            <div className="mt-6 flex justify-center gap-4">
                                <Button
                                    variant="solid"
                                    disabled={finalizandoConsulta}
                                    onClick={handleFinalizarConsulta}
                                >
                                    {finalizandoConsulta && (
                                        <Spinner size={24} className="mr-2" />
                                    )}
                                    Finalizar consulta
                                </Button>
                            </div>
                        )}
                    </>
                )}
            </AdaptiveCard>
        </Container>
    )
}

export default HistoriaClinicaWrapper
