import React, { useState, useEffect } from "react";
import Table from "@/components/ui/Table";
import { obtenerVacunasPaciente } from "@/customService/services/vacunasService";
import { useToken } from "@/store/authStore";

const { Tr, Th, Td, THead, TBody } = Table;

function InfoVacunas({ idPaciente }: { idPaciente: string }) {
  const { token } = useToken();
  const [vacunas, setVacunas] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchVacunas = async () => {
      if (!idPaciente) return;
      setLoading(true);
      try {
        const data = await obtenerVacunasPaciente(token, idPaciente);
        setVacunas(data.data || []);
      } catch (error) {
        console.error("Error al obtener las vacunas:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVacunas();
  }, [token, idPaciente]);

  return (
    <div className="w-full p-4">
      {loading ? (
        <p className="text-center text-blue-600">Cargando vacunas...</p>
      ) : vacunas.length > 0 ? (
        <Table compact>
          <THead>
            <Tr>
              <Th>Vacuna</Th>
              <Th>Dosis</Th>
              <Th>Fecha</Th>
            </Tr>
          </THead>
          <TBody>
            {vacunas.map((vacuna) => (
              <Tr key={vacuna.id}>
                <Td>{vacuna.nombre}</Td>
                <Td>{vacuna.dosis}</Td>
                <Td>{vacuna.fecha}</Td>
              </Tr>
            ))}
          </TBody>
        </Table>
      ) : (
        <p className="text-center text-gray-500">No hay vacunas registradas.</p>
      )}
    </div>
  );
}

export default InfoVacunas;
