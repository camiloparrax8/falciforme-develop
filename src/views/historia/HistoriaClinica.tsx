import { useParams, useLocation } from 'react-router-dom'

import { AdaptiveCard, Container } from '@/components/shared'
import CardHC from '../common/historia/CardHc'
import { modulos } from './modulos'

const HistoriaClinica = () => {
    const { id } = useParams()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const tipo = queryParams.get('tipo')
    console.log('tipo de HC=', tipo, ' / el id es =', id) 

    return (
        <Container>
            <AdaptiveCard>
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
