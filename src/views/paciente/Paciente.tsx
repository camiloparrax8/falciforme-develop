import { useState } from 'react'
import AdaptiveCard from '@/components/shared/AdaptiveCard'
import Container from '@/components/shared/Container'
import ButtonNavigation from '../common/ButtonNavigation'
import PacienteListSearch from './PacienteListSearch'
import { PacienteDetail } from './PacienteDetail'
import PacienteSkeleton from './PacienteSkeleton'
import Alert from '@/components/ui/Alert'
import { useToken } from '@/store/authStore'
import { buscarPaciente } from '../../customService/services/pacienteService.js'
import { InputGroup } from '@/components/ui'
import { HiOutlineSearch } from 'react-icons/hi'
import { Button } from '@/components/ui'

const Paciente = () => {
    const { token } = useToken()
    const [paciente, setPaciente] = useState(null)
    const [isSearching, setIsSearching] = useState(false)
    const [showMessage, setShowMessage] = useState(false)
    const [error, setError] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')

    const handleSearch = async (cedula: string) => {
        if (!cedula.trim()) {
            setShowMessage(false)
            setPaciente(null)
            setIsSearching(false)
            setError(null)
            return
        }

        setIsSearching(true)
        setShowMessage(false)
        setError(null)

        try {
            const resultado = await buscarPaciente(token, cedula)
            setPaciente(resultado || null)
            setShowMessage(true)
        } catch (err) {
            console.error('Error al buscar el paciente:', err)
            setError('No se encontró el paciente con esa identificación.')
            setPaciente(null)
        } finally {
            setIsSearching(false)
        }
    }

    const handleInputChange = (value: string) => {
        setSearchTerm(value)
    }

    return (
        <Container>
            <AdaptiveCard className="mt-4">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <h5>Gestión de pacientes</h5>
                        <ButtonNavigation
                            variant="solid"
                            title="Añadir"
                            uri="/paciente/add"
                            iconName="add"
                        />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center gap-2 mt-4">
                    <div className="flex-grow">
                        {/* <div className="flex-grow">
                        <PacienteListSearch
                            onInputChange={handleInputChange}
                            onEnter={handleSearch}
                        />
                    </div> */}
                        {/* <button
                        className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark"
                        onClick={() => handleSearch(searchTerm)}
                    >
                        Buscar
                    </button> */}

                        <InputGroup className="mb-4">
                            <PacienteListSearch
                                onInputChange={handleInputChange}
                                onEnter={handleSearch}
                            />
                            <Button
                                icon={<HiOutlineSearch className="text-xl" />}
                                onClick={() => handleSearch(searchTerm)}
                                variant="solid"
                            />
                        </InputGroup>
                    </div>
                </div>
            </AdaptiveCard>

            {isSearching && (
                <div className="m-4">
                    <PacienteSkeleton />
                </div>
            )}

            {error && !isSearching && (
                <div className="mt-4">
                    <Alert showIcon>{error}</Alert>
                </div>
            )}

            {showMessage && paciente && !isSearching && (
                <PacienteDetail item={paciente} />
            )}
        </Container>
    )
}

export default Paciente
