import { useState, useEffect } from "react";
import SectionTitle from "@/views/common/form/SectionTitle";
import { BuscarIngreso } from "@/customService/services/ingresoService";
import { useToken } from "@/store/authStore";
import { usePatient } from "@/context/PatientContext";
import Tag from "@/components/ui/Tag";

const sintomasConfig = {
  anemia: { nombre: "Anemia", color: "indigo" },
  palidez: { nombre: "Palidez", color: "gray" },
  dolor_oseo: { nombre: "Dolor óseo", color: "indigo" },
  dactilitis: { nombre: "Dactilitis", color: "indigo" },
  infecciones: { nombre: "Infecciones", color: "red" },
  ictericia_osea: { nombre: "Ictericia ósea", color: "red" },
};

const TablaIngreso = ({ refresh }) => {
  const { token } = useToken();
  const { paciente } = usePatient();
  const [Ingreso, setIngreso] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchIngreso = async () => {
      if (!paciente?.id) return;
      setLoading(true);
      try {
        const response = await BuscarIngreso(token, paciente.id);

        if (response.status === "success") {
          const ingresos = Array.isArray(response.data)
            ? response.data
            : [response.data];
          setIngreso(ingresos);
        } else {
          setIngreso([]);
        }
      } catch (error) {
        console.error("Error al obtener ingresos:", error);
        setIngreso([]);
      } finally {
        setLoading(false);
      }
    };

    fetchIngreso();
  }, [token, paciente.id, refresh]);

  return (
    <div className="mt-6">
      <SectionTitle text="Ingresos Agregados" className="col-span-3 mb-4" />
      {loading ? (
        <p className="text-center text-blue-600">Cargando Ingreso...</p>
      ) : Ingreso.length > 0 ? (
        <table className="min-w-full table-auto">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-4 text-left">Fecha Primera Consulta</th>
              <th className="py-2 px-4 text-left">Edad</th>
              <th className="py-2 px-4 text-left">Fecha Inicio de Síntomas</th>
              <th className="py-2 px-4 text-left">Síntomas</th>
            </tr>
          </thead>
          <tbody>
            {Ingreso.map((item) => {
              let sintomas = [];
              if (item.parentescos_multiples) {
                try {
                  sintomas = JSON.parse(item.parentescos_multiples);
                } catch {
                  sintomas = [];
                }
              }
              return (
                <tr key={item.id} className="border-b">
                  <td className="py-2 px-4">
                    {new Date(item.fecha_hematologica).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4">{item.edad_consulta}</td>
                  <td className="py-2 px-4">
                    {new Date(item.fecha_inicio_sintoma).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4">
                    {sintomas.length > 0 ? (
                      sintomas.map((key, index) => {
                        const config = sintomasConfig[key] || {
                          nombre: key,
                          color: "indigo",
                        };
                        return (
                          <Tag
                            key={index}
                            className={`text-${config.color}-600 bg-${config.color}-100 dark:text-${config.color}-100 dark:bg-${config.color}-500/20 border-0 mr-1`}
                          >
                            {config.nombre}
                          </Tag>
                        );
                      })
                    ) : (
                      <span className="text-gray-500">Sin datos</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-500">
          No hay Ingresos registrados.
        </p>
      )}
    </div>
  );
};

export default TablaIngreso;
