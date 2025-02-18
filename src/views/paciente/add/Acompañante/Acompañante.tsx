import { useState } from "react";
import FormAcompañante from "../Acompañante/FormAcompañante";
import { Button, Input, Table } from "@/components/ui";
import { IoPeople } from "react-icons/io5";
import { TbSearch } from "react-icons/tb";
import { MdAssignmentInd } from "react-icons/md";
import { BuscarAcompañante } from "@/customService/services/acompañanteService";
import { useToken } from "@/store/authStore";

const Acompañante = ({ nextTab }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [filtro, setFiltro] = useState("");
    const [acompañantes, setAcompañantes] = useState([]);
    const [acompañantesFiltrados, setAcompañantesFiltrados] = useState([]);
    const { token } = useToken();

    
    const fetchAcompañantes = async (identificacion = "") => {
        try {
            const data = await BuscarAcompañante(token, identificacion);
            setAcompañantes(data.data);
            setAcompañantesFiltrados(data.data);
        } catch (error) {
            console.error("Error obteniendo los acompañantes:", error);
        }
    };

    
    const openDialog = () => setIsOpen(true);
    const closeDialog = () => setIsOpen(false);

    
    const handleBuscar = () => {
        fetchAcompañantes(filtro);
        console.log(acompañantes);
        nextTab();
        
    };

    return (
        <div className="flex flex-col items-center gap-4 w-full">
            {/* Contenedor de búsqueda y botón */}
            <div className="flex items-center w-full max-w-4xl space-x-4">
                <div className="relative flex-grow">
                    <Input
                        placeholder="Buscar por nombre o identificación..."
                        value={filtro}
                        onChange={(e) => setFiltro(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleBuscar()}
                        className="w-full pr-10"
                    />
                    <TbSearch 
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl cursor-pointer"
                        onClick={handleBuscar} 
                    />
                </div>

                <Button variant="solid" icon={<IoPeople />} onClick={openDialog}>
                    Agregar
                </Button>
            </div>

            {/* Tabla de acompañantes */}
            <div className="w-full max-w-4xl">
                <Table className="w-full">
                    <thead>
                        <tr>
                            <th className="text-left text-sm">ID</th>
                            <th className="text-left text-sm">Nombre</th>
                            <th className="text-left text-sm">Identificación</th>
                            <th className="text-left text-sm">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {acompañantesFiltrados.length > 0 ? (
                            acompañantesFiltrados.map((acompañante) => (
                                <tr key={acompañante.id}>
                                    <td className="py-2 px-4">{acompañante.id}</td>
                                    <td className="py-2 px-4">{acompañante.nombre}</td>
                                    <td className="py-2 px-4">{acompañante.identificacion}</td>
                                    <td className="py-2 px-4 text-left">
                                        <Button
                                            variant="solid"
                                            size="sm"
                                            icon={<MdAssignmentInd />}
                                            onClick={() => console.log("Asignar", acompañante.id)}
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

            {/* Modal para agregar acompañante */}
            <FormAcompañante isOpen={isOpen} onClose={closeDialog} onRequestClose={closeDialog} />
        </div>
    );
};

export default Acompañante;
