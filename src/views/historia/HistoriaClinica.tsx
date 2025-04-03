import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { AdaptiveCard, Container } from '@/components/shared'
import CardHC from '@/views/common/historia/CardHc'
import { modulos } from '@/views/historia/modulos'
import { usePatient, PatientProvider } from '@/context/PatientContext'
import { buscarPacienteById } from '@/customService/services/pacienteService'
import { consultarExamenFisicoPorPaciente } from '@/customService/services/examenesFisicosService'
import { consultarTransplantesProgenitoresPorPaciente } from '@/customService/services/transplantesProgenitoresService'
import { obtenerComplicacionAgudaPorPaciente } from '@/customService/services/complicacionAgudaService'
import { obtenerLaboratoriosPorPaciente } from '@/customService/services/laboratorioService'
import { useToken } from '@/store/authStore'
import SectionTitle from '@/views/common/form/SectionTitle'

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

    // Efecto para verificar los estados de los módulos
    useEffect(() => {
        const verificarEstadoModulos = async () => {
            if (!id || !token) return

            try {
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

                // 4. Verificar si existe un trasplante de progenitores para este paciente
                const respuestaTrasplante =
                    await consultarTransplantesProgenitoresPorPaciente(
                        token,
                        id,
                    )
                // Verificación para trasplante de progenitores
                const trasplanteExiste =
                    respuestaTrasplante &&
                    respuestaTrasplante.status === 'success' &&
                    respuestaTrasplante.data &&
                    (respuestaTrasplante.data.id ||
                        (Array.isArray(respuestaTrasplante.data) &&
                            respuestaTrasplante.data.length > 0 &&
                            respuestaTrasplante.data[0].id))

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
                    }
                    return modulo
                })

                setModulosActualizados(modulosActualizados)
            } catch (error) {
                console.error('Error al verificar estado de módulos:', error)
                // En caso de error, asegurarse de que los módulos estén como pendientes
                setModulosActualizados(modulos)
            }
        }

        verificarEstadoModulos()
    }, [id, token])

    return (
        <Container>
            <AdaptiveCard>
                <SectionTitle
                    text={
                        `Historia clínica de: ${paciente?.nombre} ${paciente?.apellido}` ||
                        'Cargando...'
                    }
                    className="col-span-1 md:col-span-2 lg:col-span-4"
                />
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
            </AdaptiveCard>
        </Container>
    )
}

export default HistoriaClinicaWrapper
