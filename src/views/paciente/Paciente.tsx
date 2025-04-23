import { useState, useEffect, useRef } from 'react'
import AdaptiveCard from '@/components/shared/AdaptiveCard'
import Container from '@/components/shared/Container'
import ButtonNavigation from '../common/ButtonNavigation'
import PacienteListSearch from './PacienteListSearch'
import { PacienteDetail } from './PacienteDetail'
import PacienteSkeleton from './PacienteSkeleton'
import { Alert, InputGroup, Button } from '@/components/ui'
import { useToken } from '@/store/authStore'
import { buscarPaciente } from '../../customService/services/pacienteService.js'
import { HiOutlineSearch } from 'react-icons/hi'

const LOCAL_STORAGE_KEY = 'ultimoPacienteConsultado'

const Paciente = () => {
    const { token } = useToken()
    const [paciente, setPaciente] = useState(null)
    const [isSearching, setIsSearching] = useState(false)
    const [showMessage, setShowMessage] = useState(false)
    const [error, setError] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const searchInputRef = useRef(null)

    // Verificar si hay un paciente guardado en localStorage al cargar el componente
    useEffect(() => {
        const ultimoPaciente = localStorage.getItem(LOCAL_STORAGE_KEY)
        if (ultimoPaciente) {
            setSearchTerm(ultimoPaciente)
            handleSearch(ultimoPaciente)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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

            // Guardar el ID del paciente en localStorage si la búsqueda fue exitosa
            if (resultado && resultado.data) {
                localStorage.setItem(LOCAL_STORAGE_KEY, cedula)
            }
        } catch (err) {
            console.error('Error al buscar el paciente:', err)
            setError('No se encontró el paciente con esa identificación.')
            setPaciente(null)
        } finally {
            setIsSearching(false)
        }
    }

    const handleInputChange = (value: string) => {
        // Actualizar el estado con el valor actual del input
        setSearchTerm(value)

        // Si se borra completamente el input, limpiar también los resultados
        if (!value || value.trim() === '') {
            setPaciente(null)
            setShowMessage(false)
            setError(null)
            localStorage.removeItem(LOCAL_STORAGE_KEY)
        }
    }

    const handleClearSearch = () => {
        // Limpiar el input enviando un valor vacío
        setSearchTerm('')

        // Limpiar el resto del estado
        setPaciente(null)
        setShowMessage(false)
        setError(null)

        // Limpiar localStorage
        localStorage.removeItem(LOCAL_STORAGE_KEY)

        // Limpiar el input usando el método personalizado clear
        if (
            searchInputRef.current &&
            typeof searchInputRef.current.clear === 'function'
        ) {
            searchInputRef.current.clear()
        }
    }

    return (
        <Container>
            <AdaptiveCard className="mt-4">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <h5>Gestión de pacientes</h5>
                        <div className="flex gap-2">
                            {searchTerm && (
                                <Button
                                    variant="plain"
                                    onClick={handleClearSearch}
                                >
                                    Limpiar búsqueda
                                </Button>
                            )}
                            <ButtonNavigation
                                variant="solid"
                                title="Añadir"
                                uri="/paciente/add"
                                iconName="add"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center gap-2 mt-4">
                    <div className="flex-grow">
                        <InputGroup className="mb-4">
                            <PacienteListSearch
                                ref={searchInputRef}
                                initialValue={searchTerm}
                                onInputChange={handleInputChange}
                                onEnter={handleSearch}
                            />
                            <Button
                                icon={<HiOutlineSearch className="text-xl" />}
                                variant="solid"
                                onClick={() => handleSearch(searchTerm)}
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
