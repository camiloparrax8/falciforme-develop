import { useParams, useLocation } from 'react-router-dom'

import { AdaptiveCard, Container } from '@/components/shared'
import CardHC from '../common/historia/CardHc'
import { modulos } from './modulos'
import pacientes from '../paciente/pacientes.json'
import SectionTitle from '../common/form/SectionTitle'

const HistoriaClinica = () => {
    const { id } = useParams()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const tipo = queryParams.get('tipo')
    console.log('tipo de HC=', tipo, ' / el id es =', id)
    const paciente = (id: number): string | null => {
        const paciente = pacientes.find(p => p.id === id);
        return paciente ? paciente.nombre : null; // Retorna el nombre si existe, o null si no se encuentra
    };

    return (
        <Container>
            
            <AdaptiveCard>
            <SectionTitle
            text={`Historia clínica de: ${paciente(Number(id))}`} 
            className="col-span-1 md:col-span-2 lg:col-span-4"
            />
                <div className="mt-4 grid grid-cols-6 gap-4">
                    {modulos.map((item) => (
                        <CardHC
                            key={item.id}
                            title={item.title}
                            uri={item.uri}
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

export default HistoriaClinica
