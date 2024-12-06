import AdaptiveCard from '@/components/shared/AdaptiveCard'
import Container from '@/components/shared/Container'
import MenuAddPaciente from './MenuAddPaciente'

const AddPaciente = () => {
    return (
        <Container>
            <AdaptiveCard className="mt-4">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <h5>Añadir Paciente</h5>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mt-4">
                    <MenuAddPaciente></MenuAddPaciente>
                </div>
            </AdaptiveCard>

            {/* <PacienteDetail item={paciente}></PacienteDetail> */}
        </Container>
    )
}

export default AddPaciente
