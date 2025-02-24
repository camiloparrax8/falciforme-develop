import { useState } from 'react'
import { Container } from '@/components/shared'
import { Alert, Button, Input, Table } from '@/components/ui'
import FormAcompañante from '../Acompañante/FormAcompañante'
import { IoPeople } from 'react-icons/io5'
import { TbSearch } from 'react-icons/tb'
import { MdAssignmentInd } from 'react-icons/md'
import { BuscarAcompañante } from '@/customService/services/acompañanteService'
import { useToken } from '@/store/authStore'
import ModalAsignar from './modalAsignar'
import SectionTitle from '@/views/common/form/SectionTitle'
import AcompananteAsignado from './AcompananteAsignado'

const Acompañante = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [filtro, setFiltro] = useState('')
    const [acompañantes, setAcompañantes] = useState([])
    const [acompañantesFiltrados, setAcompañantesFiltrados] = useState([])
    const [selectedAcompañante, setSelectedAcompañante] = useState(null)
    const [mensaje, setMensaje] = useState(null)
    const [loading, setLoading] = useState(false)
    const [isFirstLoad, setIsFirstLoad] = useState(true)
    const [refresh, setRefresh] = useState(false) // Estado para forzar actualización

    const { token } = useToken()
    console.log(acompañantes)

    const fetchAcompañantes = async (identificacion = '') => {
        setLoading(true)
        setIsFirstLoad(false)

        try {
            const data = await BuscarAcompañante(token, identificacion)
            setAcompañantes(data.data)
            setAcompañantesFiltrados(data.data)
        } catch (error) {
            console.error('Error obteniendo los acompañantes:', error)
        } finally {
            setLoading(false)
        }
    }

    const openDialog = () => setIsOpen(true)
    const closeDialog = () => setIsOpen(false)

    const openDialogAsignar = (acompañante) => {
        setSelectedAcompañante(acompañante)
        setIsModalOpen(true)
    }

    const closeDialogAsignar = () => setIsModalOpen(false)

    const handleBuscar = () => {
        fetchAcompañantes(filtro)
    }

    return (
        <Container className="flex flex-col gap-6 w-full">
            {/* Mostrar alerta si hay un mensaje */}
            {mensaje && (
                <div className="mb-4 w-full max-w-4xl">
                    <Alert
                        title={
                            mensaje.status === 'error' ? 'Atención' : 'Correcto'
                        }
                        showIcon
                        type={mensaje.status === 'error' ? 'danger' : 'success'}
                        closable
                        duration={5000}
                        onClose={() => setMensaje(null)}
                    >
                        {mensaje.message}
                    </Alert>
                </div>
            )}

            <div className="grid grid-cols-7 gap-6 w-full">
                {/* Sección izquierda (3/4 del espacio) - Formulario y búsqueda */}
                <div className="col-span-3">
                    <SectionTitle
                        text="Acompañante"
                        className="col-span-1 md:col-span-2 lg:col-span-4"
                    />
                    <div className="flex items-center w-full space-x-4">
                        <div className="relative flex-grow">
                            <Input
                                placeholder="Buscar por nombre o identificación..."
                                value={filtro}
                                onChange={(e) => setFiltro(e.target.value)}
                                onKeyDown={(e) =>
                                    e.key === 'Enter' && handleBuscar()
                                }
                                className="w-full pr-10"
                            />
                            <TbSearch
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl cursor-pointer"
                                onClick={handleBuscar}
                            />
                        </div>

                        <Button
                            variant="solid"
                            icon={<IoPeople />}
                            onClick={openDialog}
                        >
                            Agregar
                        </Button>
                    </div>

                    {/* Tabla de acompañantes */}
                    <div className="mt-4">
                        <Table className="w-full">
                            <thead>
                                <tr>
                                    <th className="text-left text-sm">
                                        Nombre
                                    </th>
                                    <th className="text-left text-sm">
                                        Identificación
                                    </th>
                                    <th className="text-left text-sm">
                                        Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td className="text-center py-4 text-blue-600">
                                            Buscando acompañante...
                                        </td>
                                    </tr>
                                ) : isFirstLoad ? (
                                    <tr>
                                        <td className="text-center py-4 text-gray-500">
                                            Escriba el nombre o identificación
                                            para buscar
                                        </td>
                                    </tr>
                                ) : acompañantesFiltrados.length > 0 ? (
                                    acompañantesFiltrados.map((acompañante) => (
                                        <tr key={acompañante.id}>
                                            <td className="py-2 px-4">
                                                {acompañante.nombre}
                                            </td>
                                            <td className="py-2 px-4">
                                                {acompañante.identificacion}
                                            </td>
                                            <td className="py-2 px-4 text-left">
                                                <Button
                                                    variant="solid"
                                                    size="sm"
                                                    icon={<MdAssignmentInd />}
                                                    onClick={() =>
                                                        openDialogAsignar(
                                                            acompañante,
                                                        )
                                                    }
                                                >
                                                    Asignar
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td className="text-center py-4 text-red-600">
                                            No se encontraron resultados
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </div>
                </div>

                {/* Sección derecha (1/4 del espacio) - Acompañante asignado */}
                <div className="col-span-4 p-4">
                    <AcompananteAsignado refresh={refresh} />
                </div>
            </div>

            {/* Modal para agregar acompañante */}
            <FormAcompañante
                isOpen={isOpen}
                onClose={closeDialog}
                onRequestClose={closeDialog}
                setMensaje={setMensaje}
                
            />

            {/* Modal de asignación */}
            <ModalAsignar
                isOpen={isModalOpen}
                onClose={closeDialogAsignar}
                onRequestClose={closeDialogAsignar}
                acompañante={selectedAcompañante}
                setMensaje={setMensaje}
                setRefresh={setRefresh} // Nueva prop
            />
        </Container>
    )
}

export default Acompañante
