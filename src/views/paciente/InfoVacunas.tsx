import Table from '@/components/ui/Table'
import { useToken } from '@/store/authStore';
import { useEffect, useState } from 'react';
import {buscarVacunas} from "../../customService/services/vacunasService";


function InfoVacunas({idPaciente}) {
    const { Tr, Th, Td, THead, TBody } = Table
    const id = idPaciente;
        const { token } = useToken();
        const [vacunas, setVacunas] = useState([]);
    
    
        useEffect(() => {
            if (!token || !id) return;
            const obtenerVacunas = async () => {
                try {
                    if (!token) {
                    console.error("Token no disponible");
                    return;
                }
    
                const respuesta = await buscarVacunas(token, id);
    
                if (respuesta?.data) {
                    setVacunas(respuesta.data); // Asumimos que 'data' es un arreglo de usuarios
                } else {
                    console.error("Respuesta inesperada:", respuesta);
                }
                } catch (error) {
                console.error("Error al cargar usuarios:", error);
                }
                };
                obtenerVacunas();
            }, [token,id]);

     
            
    
    return (
        <div className="w-full p-4">
            <Table compact>
                <THead>
                    <Tr>
                        <Th>Vacuna</Th>
                        <Th>Dosis</Th>
                        <Th>Fecha</Th>
                    </Tr>
                </THead>
                <TBody>
                    {vacunas.map((vacuna, index) => (
                        <Tr key={index}>
                            <Td>{vacuna.nombre}</Td>
                            <Td>{vacuna.dosis}</Td>
                            <Td>{vacuna.fecha}</Td>
                        </Tr>
                    ))}
                </TBody>
            </Table>
        </div>
    )
}

export default InfoVacunas
