import { useState } from 'react'
import AdaptiveCard from '@/components/shared/AdaptiveCard'
import Container from '@/components/shared/Container'
import ButtonNavigation from '../common/ButtonNavigation'
import PacienteListSearch from './PacienteListSearch'
import { PacienteDetail } from './PacienteDetail'
import PacienteSkeleton from './PacienteSkeleton'
import pacientes_json from './pacientes.json'

const Paciente = () => {
    const pacientes = pacientes_json

    const [paciente, setPaciente] = useState(null);


    const [isSearching, setIsSearching] = useState(false) // Nuevo estado
    const [showMessage, setShowMessage] = useState(false)

    const handleSearch = (cedula: string) => {
        if (!cedula.trim()) {
            setShowMessage(false)
            setPaciente(null)
            setIsSearching(false) // Detiene el estado de búsqueda
            return
        }
        setIsSearching(true) // Activa el mensaje de búsqueda
        setTimeout(() => {
            const encontrado = pacientes.find((p) => p.cedula === cedula.trim())
            setPaciente(encontrado || null)
            setShowMessage(true)
            setIsSearching(false) // Finaliza la búsqueda
        }, 1000) // Simula un retraso en la búsqueda
    }

    const handleInputChange = (value: string) => {
        if (!value.trim()) {
            setShowMessage(false)
            setPaciente(null)
            setIsSearching(false) // Detiene el estado de búsqueda
        } else {
            setIsSearching(true) // Activa el mensaje de búsqueda
        }
    }

    return (
        <Container>
            <AdaptiveCard className="mt-4">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <h5>Gestión de pacientes</h5>
                        <ButtonNavigation
                            title="Añadir"
                            uri="/paciente/add"
                            iconName="add"
                        />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mt-4">
                    <PacienteListSearch
                        onInputChange={(value) => handleInputChange(value)}
                        onEnter={(value) => handleSearch(value)}
                    />
                </div>
            </AdaptiveCard>

            {isSearching && (
                <div className="m-4">
                    <PacienteSkeleton></PacienteSkeleton>
                </div>
            )}

            {showMessage && !paciente && !isSearching && (
                <p className="mt-4 text-gray-500">
                    No se encontró un paciente con esa cédula.
                </p>
            )}

            {showMessage && paciente && !isSearching && (
                <PacienteDetail item={paciente}></PacienteDetail>
            )}
        </Container>
    )
}

export default Paciente
