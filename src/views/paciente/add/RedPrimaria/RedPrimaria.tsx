import { useState } from 'react'
import { Container } from '@/components/shared'
import { Alert, Button, Input, Table } from '@/components/ui'
import FormRedPrimaria from './FormRedPrimaria'
import { MdAssignmentInd } from 'react-icons/md'
import { TbSearch, TbId } from 'react-icons/tb'
import { buscarHospital } from '@/customService/services/redPrimariaService'
import { useToken } from '@/store/authStore'
import ModalAsignar from './modalAsignar'
import SectionTitle from '@/views/common/form/SectionTitle'
import RedPrimariaAsignada from './RedPrimariaAsignada'

const RedPrimaria = () => {
    const [dialogIsOpenRP, setDialogIsOpenRP] = useState(false)
    const [dialogIsAsignar, setDialogIsAsignar] = useState(false)
    const [busqueda, setBusqueda] = useState('')
    const [hospitales, setHospitales] = useState([])
    const [hospitalesFiltrados, setHospitalesFiltrados] = useState([])
    const [selectedHospital, setSelectedHospital] = useState(null)
    const [mensaje, setMensaje] = useState(null) // Estado para la alerta
    const [loading, setLoading] = useState(false) // Estado para saber si está cargando
    const [isFirstLoad, setIsFirstLoad] = useState(true) // Controla si es la primera carga
    const [refresh, setRefresh] = useState(false) // Estado para actualizar la red primaria asignada

    console.log(hospitales);
    

    const { token } = useToken()

    const fetchHospitales = async (hospital = '') => {
        setLoading(true) // Activa la carga
        setIsFirstLoad(false) // Ya no es la primera carga

        try {
            const data = await buscarHospital(token, hospital)
            setHospitales(data.data)
            setHospitalesFiltrados(data.data)
        } catch (error) {
            console.error('Error obteniendo los hospitales:', error)
        } finally {
            setLoading(false) // Desactiva la carga cuando termina
        }
    }

    const openDialog = () => setDialogIsOpenRP(true)
    const closeDialog = () => setDialogIsOpenRP(false)

    const openDialogAsignar = (hospital) => {
        setSelectedHospital(hospital) // Guarda el hospital seleccionado
        setDialogIsAsignar(true)
    }

    const closeDialogAsignar = () => setDialogIsAsignar(false)

    const handleBuscar = () => {
        fetchHospitales(busqueda)
    }

 


    return (
        <Container className="flex flex-col gap-6 w-full">
            {/* Alerta de mensaje */}
            {mensaje && (
                <div className="mb-4 w-full max-w-4xl">
                    <Alert
                        title={mensaje.status === 'error' ? 'Atención' : 'Correcto'}
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
                    <SectionTitle className={""} text="Red Primaria" />
                    <div className="flex items-center w-full space-x-4">
                        <div className="relative flex-grow">
                            <Input
                                placeholder="Buscar hospital por nombre..."
                                value={busqueda}
                                onChange={(e) => setBusqueda(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleBuscar()}
                                className="w-full text-sm pr-10"
                            />
                            <TbSearch
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl cursor-pointer"
                                onClick={handleBuscar}
                            />
                        </div>

                        <Button variant="solid" icon={<TbId />} onClick={openDialog}>
                            Registrar
                        </Button>
                    </div>

                    {/* Tabla de hospitales */}
                    <div className="mt-4">
                        <Table className="w-full text-sm">
                            <thead>
                                <tr>
                                    <th className="text-left">Nombre</th>
                                    <th className="text-left">Ubicación</th>
                                    <th className="text-center">Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td className="text-center py-4 text-blue-600">
                                            Buscando red primaria...
                                        </td>
                                    </tr>
                                ) : isFirstLoad ? (
                                    <tr>
                                        <td className="text-center py-4 text-gray-500">
                                            Escriba el nombre de la red primaria para buscar
                                        </td>
                                    </tr>
                                ) : hospitalesFiltrados.length > 0 ? (
                                    hospitalesFiltrados.map((hospital) => (
                                        <tr key={hospital.id}>
                                            <td className="py-2 px-4">{hospital.hospital}</td>
                                            <td className="py-2 px-4">{hospital.municipio}, {hospital.departamento}</td>
                                            <td className="py-2 px-4 text-left">
                                                <Button
                                                    variant="solid"
                                                    size="sm"
                                                    icon={<MdAssignmentInd />}
                                                    onClick={() => openDialogAsignar(hospital)}
                                                >
                                                    Asignar
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td className="text-center py-4 text-red-600">
                                            ⚠️ No se encontraron resultados
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </div>
                </div>

                {/* Sección derecha (1/4 del espacio) - Red primaria asignada */}
                <div className="col-span-4 p-4">
                    <RedPrimariaAsignada refresh={refresh} />
                </div>
            </div>

            {/* Modal para agregar hospital */}
            <FormRedPrimaria
                isOpen={dialogIsOpenRP}
                onClose={closeDialog}
                onRequestClose={closeDialog}
            />

            {/* Modal de asignación */}
            <ModalAsignar
                isOpen={dialogIsAsignar}
                onClose={closeDialogAsignar}
                onRequestClose={closeDialog}
                redPrimaria={selectedHospital}
                setMensaje={setMensaje}
                setRefresh={setRefresh} // Pasa refresh para actualizar la tabla
            />
        </Container>
    )
}

export default RedPrimaria
