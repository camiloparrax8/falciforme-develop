import { useState } from 'react'
import { Container } from '@/components/shared'
import { Button, Input, Table } from '@/components/ui'
import FormRedPrimaria from './FormRedPrimaria'
import { MdAssignmentInd } from 'react-icons/md'
import { TbSearch, TbId } from 'react-icons/tb'
import { buscarHospital } from "@/customService/services/redPrimariaService"; 
import { useToken } from "@/store/authStore";


const RedPrimaria = ({ nextTab }) => {
    const [dialogIsOpenRP, setDialogIsOpenRP] = useState(false);
    const [busqueda, setBusqueda] = useState("");
    const [hospitales, setHospitales] = useState([]);
    const [hospitalesFiltrados, setHospitalesFiltrados] = useState([]);
    const { token } = useToken();
   
    const fetchHospitales = async (hospital = "") => {
        try {
            const data = await buscarHospital(token, hospital);
            setHospitales(data.data);
            setHospitalesFiltrados(data.data);
        } catch (error) {
            console.error("Error obteniendo los hospitales:", error);
        }
    };

    const openDialog = () => setDialogIsOpenRP(true);
    const closeDialog = () => setDialogIsOpenRP(false);

    const handleAsignar = (id) => {
        alert(`Hospital con ID ${id} asignado.`);
    };

    // Filtrar al presionar Enter o hacer clic en el icono de búsqueda
    const handleBuscar = () => {
        fetchHospitales(busqueda);
        console.log(hospitales);        
        
    };

    

    return (
        <Container className="flex flex-col items-center gap-4 w-full">
            {/* Contenedor de búsqueda y botón */}
            <div className="flex items-center w-full max-w-4xl space-x-4">
                <div className="relative flex-grow">
                    <Input
                        placeholder="Buscar hospital por nombre..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleBuscar()}
                        className="w-full text-sm pr-10"
                    />
                    <TbSearch
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl cursor-pointer"
                        onClick={handleBuscar}
                    />
                </div>

                {/* Botón de registro */}
                <Button variant="solid" icon={<TbId />} onClick={openDialog}>
                    Registrar
                </Button>
            </div>

            {/* Tabla centrada y alineada */}
            <div className="w-full max-w-4xl">
                <Table className="w-full text-sm">
                    <thead>
                        <tr>
                            <th className="text-left">ID</th>
                            <th className="text-left">Nombre</th>
                            <th className="text-left">Ubicación</th>
                            <th className="text-center">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hospitalesFiltrados.length > 0 ? (
                            hospitalesFiltrados.map((hospital) => (
                                <tr key={hospital.id}>
                                    <td className="py-2 px-4">{hospital.id}</td>
                                    <td className="py-2 px-4">
                                        {hospital.hospital}
                                    </td>
                                    <td className="py-2 px-4">
                                    {hospital.municipio}, {hospital.departamento}
                                    </td>
                                    <td className="py-2 px-4 text-left">
                                        <Button
                                            variant="solid"
                                            size="sm"
                                            icon={<MdAssignmentInd />}
                                            onClick={() =>
                                                handleAsignar(hospital.id)
                                            }
                                        >
                                            Asignar
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className="text-center py-4 text-gray-500">
                                    No se encontraron resultados
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>

            {/* Modal de registro */}
            <FormRedPrimaria
                isOpen={dialogIsOpenRP}
                onClose={closeDialog}
                onRequestClose={closeDialog}
            />
        </Container>
    )
}

export default RedPrimaria
