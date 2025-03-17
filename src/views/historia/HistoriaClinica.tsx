import { useParams, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

import { AdaptiveCard, Container } from '@/components/shared'
import CardHC from '../common/historia/CardHc'
import { modulos } from './modulos'
import { usePatient, PatientProvider } from '@/context/PatientContext'
import { buscarPacienteById } from '@/customService/services/pacienteService'
import { consultarExamenFisicoPorPaciente } from '@/customService/services/examenesFisicosService'
import { useToken } from '@/store/authStore'
import SectionTitle from '../common/form/SectionTitle'

const HistoriaClinicaWrapper = () => {
    return (
        <PatientProvider>
            <HistoriaClinica />
        </PatientProvider>
    )
}
const HistoriaClinica = () => {
    const { id } = useParams()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const tipo = queryParams.get('tipo')
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

    // Efecto para verificar el estado del examen físico
    useEffect(() => {
        const verificarExamenFisico = async () => {
            if (!id || !token) return

            try {
                console.log('Verificando examen físico para paciente ID:', id)

                // Verificar si existe un examen físico para este paciente
                const respuesta = await consultarExamenFisicoPorPaciente(
                    token,
                    id,
                )

                console.log('Respuesta de examen físico:', respuesta)

                // Verificar correctamente si existe un examen físico válido
                // Un examen existe solo si la respuesta no tiene status de error y tiene data
                const examenExiste =
                    respuesta &&
                    respuesta.status !== 'error' &&
                    (respuesta.data !== null || !('data' in respuesta))

                console.log('¿Existe examen físico?', examenExiste)

                // Crear una copia profunda de los módulos originales
                const nuevosModulos = JSON.parse(JSON.stringify(modulos))

                // Actualizar solo el módulo de Exámenes Físicos (id: 1)
                const modulosActualizados = nuevosModulos.map((modulo) => {
                    if (modulo.id === 1) {
                        return {
                            ...modulo,
                            estado: examenExiste ? 1 : 0, // 1 si existe, 0 si no existe
                        }
                    }
                    return modulo
                })

                console.log('Módulos actualizados:', modulosActualizados)

                setModulosActualizados(modulosActualizados)
            } catch (error) {
                console.error('Error al verificar examen físico:', error)
                // En caso de error, asegurar que el módulo de examen físico esté como pendiente
                const nuevosModulos = JSON.parse(JSON.stringify(modulos))
                const modulosActualizados = nuevosModulos.map((modulo) => {
                    if (modulo.id === 1) {
                        return { ...modulo, estado: 0 }
                    }
                    return modulo
                })
                setModulosActualizados(modulosActualizados)
            }
        }

        verificarExamenFisico()
    }, [id, token])

    console.log(
        'tipo de HC=',
        tipo,
        ' / el id es =',
        id,
        ' / El nombre es =',
        paciente,
    )

    console.log('Paciente en contexto:', paciente)

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
