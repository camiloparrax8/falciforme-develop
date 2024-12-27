import { useParams, useLocation } from 'react-router-dom'

import { AdaptiveCard, Container } from '@/components/shared'
import CardHC from '../common/historia/CardHc'

const HistoriaClinica = () => {
    const { id } = useParams()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const tipo = queryParams.get('tipo')
    console.log('tipo de HC=', tipo, ' / el id es =', id)

    const modulos = [
        {
            id: 1,
            title: 'Imágenes Diagnósticas',
            uri: '/historia-clinica/img-diagnosticas',
            iconName: 'diagnostics',
            estado: 0,
            recomendacion: 'Revisar las imágenes para identificar cualquier anomalía que requiera seguimiento inmediato.',
        },
        {
            id: 2,
            title: 'Complicaciones Agudas',
            uri: '/historia-clinica/complicaciones-agudas',
            iconName: 'diagnostics',
            estado: 0,
            recomendacion: 'Documentar cada episodio agudo con fecha, síntomas y tratamiento para evaluar patrones recurrentes.',
        },
        {
            id: 3,
            title: 'Complicaciones Crónicas',
            uri: '/historia-clinica/complicaciones-cronicas',
            iconName: 'diagnostics',
            estado: 0,
            recomendacion: 'Mantener actualizado el historial de complicaciones para monitorear progresión y respuesta a tratamientos.',
        },
        {
            id: 4,
            title: 'Exámenes Físicos',
            uri: '/historia-clinica/examenes-fisicos',
            iconName: 'diagnostics',
            estado: 0,
            recomendacion: 'Registrar resultados detallados de los exámenes físicos para facilitar el diagnóstico diferencial.',
        },
        {
            id: 5,
            title: 'Laboratorios',
            uri: '/historia-clinica/laboratorios',
            iconName: 'diagnostics',
            estado: 0,
            recomendacion: 'Asegurarse de que los valores anómalos sean evaluados y correlacionados con el cuadro clínico del paciente.',
        },
        {
            id: 6,
            title: 'Soportes Transfusionales',
            uri: '/historia-clinica/soportes-transfucionales',
            iconName: 'diagnostics',
            estado: 1,
            recomendacion: 'Registrar cada soporte transfusional con detalles como tipo de sangre, fecha y reacción del paciente.',
        },
        {
            id: 7,
            title: 'Trasplantes de Progenitores',
            uri: '/historia-clinica/transplantes-progenitores',
            iconName: 'diagnostics',
            estado: 1,
            recomendacion: 'Asegurarse de registrar todos los pasos del proceso de trasplante y el seguimiento postoperatorio.',
        },
        {
            id: 8,
            title: 'Tratamientos',
            uri: '/historia-clinica/tratamientos',
            iconName: 'diagnostics',
            estado: 1,
            recomendacion: 'Actualizar la sección de tratamientos con cambios de medicación o ajustes en la dosis según el progreso del paciente.',
        },
        {
            id: 9,
            title: 'Vacunas',
            uri: '/historia-clinica/Vacunas',
            iconName: 'diagnostics',
            estado: 1,
            recomendacion: 'Verificar que el esquema de vacunación esté completo y actualizado según las recomendaciones oficiales.',
        },
    ];
    

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
