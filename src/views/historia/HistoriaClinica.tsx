import { useParams, useLocation } from 'react-router-dom'

import { AdaptiveCard, Container } from '@/components/shared'
import CardHC from '../common/historia/CardHc'
import { modulos } from './modulos'
import { usePatient, PatientProvider } from '@/context/PatientContext'
import { buscarPacienteById } from '@/customService/services/pacienteService'
import { useToken } from '@/store/authStore'
import SectionTitle from '../common/form/SectionTitle'
import { useEffect } from 'react'

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
    const { token } = useToken() // Añade esta línea para obtener el token

    useEffect(() => {
        if (id) {
            setPaciente({ id }); // Actualiza el contexto con el id
        }
    }, [id, setPaciente]);

    useEffect(() => {
        const fetchPaciente = async () => {
            try {
                const response = await buscarPacienteById(token, id);
                if (response?.data) {
                    setPaciente(response.data); // Actualiza el contexto con los datos del paciente
                }
            } catch (error) {
                console.error('Error al obtener el paciente:', error);
            }
        };

        if (id) {
            fetchPaciente();
        }
    }, [id, setPaciente, token]);

    console.log(
        'tipo de HC=',
        tipo,
        ' / el id es =',
        id,
        ' / El nombre es =',
        paciente,
    )

    console.log('Paciente en contexto:', paciente);

    return (
        <Container>
            <AdaptiveCard>
                <SectionTitle
                    text={`Historia clínica de: ${paciente?.nombre || 'Cargando...'}`}
                    className="col-span-1 md:col-span-2 lg:col-span-4"
                />
                <div className="mt-4 grid grid-cols-6 gap-4">
                    {modulos.map((item) => (
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
