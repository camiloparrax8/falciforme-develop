import { Card } from "@/components/ui";
import Table from "@/components/ui/Table";
import Tag from "@/components/ui/Tag";
import { useToken } from "@/store/authStore";
import { BuscarEstadosHBS } from "@/customService/services/estadoHbsService.js";
import { BuscarEnfermedadCronica } from "@/customService/services/enfermedadesCronicasService.js";
import { useEffect, useState } from "react";

const { Tr, Th, Td, THead, TBody } = Table;

function InfoAntecedentes({ idPaciente }: { idPaciente: string }) {
  const { token } = useToken();
  const [antecedentesFamiliares, setAntecedentesFamiliares] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enfermedades, setEnfermedades] = useState([]);
  const [loadingEnfermedades, setLoadingEnfermedades] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await BuscarEstadosHBS(token, idPaciente);
        const array = data.data || [];
        const mapeados = array.map((item) => ({
          parentesco: item.parentesco,
          linea: item.linea_parentesco,
          estado: item.estado,
          estadoColor:
            item.estado === "Positivo"
              ? "red"
              : item.estado === "Negativo"
              ? "emerald"
              : "indigo",
        }));
        setAntecedentesFamiliares(mapeados);
      } catch (error) {
        setAntecedentesFamiliares([]);
      } finally {
        setLoading(false);
      }
    };
    if (idPaciente) fetchData();
  }, [idPaciente, token]);

  useEffect(() => {
    const fetchEnfermedades = async () => {
      setLoadingEnfermedades(true);
      try {
        const data = await BuscarEnfermedadCronica(token, idPaciente);
        const array = data.data || [];
        const mapeados = array.map((item) => ({
          enfermedad: item.enfermedad,
          especifica: item.especifica,
          portadores: (item.portadores || []).map((portador) => ({
            nombre: portador.nombre,
            color: portador.color || "indigo",
          })),
        }));
        setEnfermedades(mapeados);
      } catch (error) {
        setEnfermedades([]);
      } finally {
        setLoadingEnfermedades(false);
      }
    };
    if (idPaciente) fetchEnfermedades();
  }, [idPaciente, token]);

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
          {/* Lista de Antecedentes */}
          {loading ? (
            <div className="p-2 text-center text-gray-400">Cargando...</div>
          ) : antecedentesFamiliares.length === 0 ? (
            <div className="p-2 text-center text-gray-400">
              No hay antecedentes familiares registrados.
            </div>
          ) : (
            antecedentesFamiliares.map((antecedente, index) => (
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
                {loadingEnfermedades ? (
                  <Tr>
                    <Td colSpan={3} className="text-center text-gray-400">
                      Cargando...
                    </Td>
                  </Tr>
                ) : enfermedades.length === 0 ? (
                  <Tr>
                    <Td colSpan={3} className="text-center text-gray-400">
                      No hay enfermedades crónicas registradas.
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
  );
}

export default InfoAntecedentes;
