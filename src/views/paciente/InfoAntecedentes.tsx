import { Card } from '@/components/ui'
import Table from '@/components/ui/Table'
import Tag from '@/components/ui/Tag'
import {useBuscarEstadoHBS} from '@/hooks/useBuscarEstadoHBS';
import { useToken } from "@/store/authStore";
import {BuscarEnfermedadCronica} from "../../customService/services/enfermedadesCronicasService";
import { useEffect, useState } from 'react';


function InfoAntecedentes({idPaciente}) {
    const { Tr, Th, Td, THead, TBody } = Table
    const id = idPaciente;
    const { token } = useToken();
    const { estado, loading, error } = useBuscarEstadoHBS(id, token);
    const [enfermedades, setEnfermedades] = useState([]);

    useEffect(() => {
        const cargarEnfermedades = async () => {
            try {
                if (!token) {
                console.error("Token no disponible");
                return;
            }

            const respuesta = await BuscarEnfermedadCronica(token, id);

            if (respuesta?.data) {
                setEnfermedades(respuesta.data); // Asumimos que 'data' es un arreglo de usuarios
            } else {
                console.error("Respuesta inesperada:", respuesta);
            }
            } catch (error) {
            console.error("Error al cargar usuarios:", error);
            }
            };
            cargarEnfermedades();
        }, [token,id]);
    
   

    if (loading) return <p>Cargando antecedentes...</p>;
    if (error) return <p>Error: {error}</p>;
    

    return (
        <>
            <div className="grid grid-cols-6 gap-2">
                {/* Columna Izquierda: Antecedentes Familiares */}
                <div className="col-span-2 grid place-content-center">
                    {/* Títulos */}
                    <div className="grid grid-cols-3 gap-1 p-2">
                        <div className="col-span-1 grid place-content-center">
                            <b>Parentesco</b>
                        </div>
                        <div className="col-span-1 grid place-content-center">
                            <b>Linea</b>
                        </div>
                        <div className="col-span-1 grid place-content-center">
                            <b>Estado</b>
                        </div>
                    </div>
                    {estado.length === 0 ? (
                    <p className="text-gray-500 text-center">No se encontraron antecedentes familiares.</p>
                    ) : (
                    estado.map((antecedente, index) => (
                        <div key={index} className="grid grid-cols-3 gap-1 p-2">
                        <div className="col-span-1 grid place-content-center">
                            <p>{antecedente.parentesco}</p>
                        </div>
                        <div className="col-span-1 grid place-content-center">
                            <p>{antecedente.linea}</p>
                        </div>
                        <div className="col-span-1 grid place-content-center">
                            <Tag
                            className={`text-${antecedente.estadoColor}-600 bg-${antecedente.estadoColor}-100 dark:text-${antecedente.estadoColor}-100 dark:bg-${antecedente.estadoColor}-500/20 border-0`}
                            >
                            {antecedente.estado}
                            </Tag>
                        </div>
                        </div>
                    ))
                    )}
                </div>

                {/* Columna Derecha: Enfermedades */}
                <div className="col-span-4 grid place-content-right">
                    <Card>
                        <Table compact>
                            <THead>
                                <Tr>
                                    <Th>Enfermedad</Th>
                                    <Th>Especifica</Th>
                                    <Th>Portadores</Th>
                                </Tr>
                            </THead>
                            <TBody>
                            {enfermedades.length === 0 ? (
                                <Tr>
                                    <Td colSpan={3} className="text-center text-gray-500">
                                        No se encontraron enfermedades crónicas.
                                    </Td>
                                </Tr>
                            ) : (
                                enfermedades.map((enfermedad, index) => (
                                    <Tr key={index}>
                                        <Td>{enfermedad.enfermedad}</Td>
                                        <Td>{enfermedad.especifica}</Td>
                                        <Td>
                                            {enfermedad.portadores.map((portador, idx) => (
                                                <Tag
                                                    key={idx}
                                                    className={`text-${portador.color}-600 bg-${portador.color}-100 dark:text-${portador.color}-100 dark:bg-${portador.color}-500/20 border-0 m-1`}
                                                >
                                                    {portador.nombre}
                                                </Tag>
                                            ))}
                                        </Td>
                                    </Tr>
                                ))
                            )}
                        </TBody>                            
                        </Table>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default InfoAntecedentes
