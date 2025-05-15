import Input from "@/components/ui/Input";
import Tag from "@/components/ui/Tag";
import SectionTitle from "../../../common/form/SectionTitle";
import { useState, useEffect } from "react";
import { BuscarIngreso } from "@/customService/services/ingresoService";
import { useToken } from "@/store/authStore";

const sintomasConfig = {
  anemia: { nombre: "Anemia", color: "indigo" },
  fatiga: { nombre: "Fatiga", color: "gray" },
  palidez: { nombre: "Palidez", color: "gray" },
  dolor_oseo: { nombre: "Dolor óseo", color: "indigo" },
  dactilitis: { nombre: "Dactilitis", color: "indigo" },
  infecciones: { nombre: "Infecciones", color: "red" },
  dificultad_respiratoria: { nombre: "Dificultad respiratoria", color: "yellow" },
  ictericia: { nombre: "Ictericia", color: "red" },
  ictericia_osea: { nombre: "Ictericia ósea", color: "red" },
};

const InfoDatosIngreso = ({ idPaciente }) => {
  const { token } = useToken();
  const [ingreso, setIngreso] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchIngreso = async () => {
      if (!idPaciente) return;
      setLoading(true);
      try {
        const response = await BuscarIngreso(token, idPaciente);
        if (response.status === "success") {
          const data = Array.isArray(response.data)
            ? response.data[0]
            : response.data;
          setIngreso(data);
        } else {
          setIngreso(null);
        }
      } catch (error) {
        console.error("Error al obtener ingreso:", error);
        setIngreso(null);
      } finally {
        setLoading(false);
      }
    };
    fetchIngreso();
  }, [token, idPaciente]);

  if (loading) {
    return (
      <p className="text-center text-blue-600">
        Cargando información de ingreso...
      </p>
    );
  }

  if (!ingreso) {
    return (
      <p className="text-center text-gray-500">
        No hay información de ingreso registrada.
      </p>
    );
  }

  let sintomas = [];
  if (ingreso.parentescos_multiples) {
    try {
      sintomas = JSON.parse(ingreso.parentescos_multiples);
    } catch {
      sintomas = [];
    }
  }

  return (
    <div className="w-full p-4">
      {/* Información básica */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <SectionTitle
          text="Informacion Basica"
          className="col-span-1 md:col-span-2 lg:col-span-4"
        />
        <div>
          <label className="block text-sm font-bold mb-1">
            Fecha 1ra consulta hematología
          </label>
          <Input
            disabled
            size="sm"
            value={
              ingreso.fecha_hematologica
                ? new Date(ingreso.fecha_hematologica).toLocaleDateString()
                : ""
            }
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-1">
            Edad de esa consulta
          </label>
          <Input disabled size="sm" value={ingreso.edad_consulta || ""} />
        </div>
        <div>
          <label className="block text-sm font-bold mb-1">
            Fecha Inicio Síntomas
          </label>
          <Input
            disabled
            size="sm"
            value={
              ingreso.fecha_inicio_sintoma
                ? new Date(ingreso.fecha_inicio_sintoma).toLocaleDateString()
                : ""
            }
          />
        </div>
      </div>

      {/* Síntomas */}
      <div className="mb-6">
        <SectionTitle
          text="Sintomas"
          className="col-span-1 md:col-span-2 lg:col-span-4"
        />
        <div className="flex flex-wrap gap-2">
          {sintomas.length > 0 ? (
            sintomas.map((key, index) => {
              const config = sintomasConfig[key] || {
                nombre: key,
                color: "indigo",
              };
              return (
                <Tag
                  key={index}
                  className={`text-${config.color}-600 bg-${config.color}-100 dark:text-${config.color}-100 dark:bg-${config.color}-500/20 border-0`}
                >
                  {config.nombre}
                </Tag>
              );
            })
          ) : (
            <span className="text-gray-500">Sin datos</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfoDatosIngreso;
