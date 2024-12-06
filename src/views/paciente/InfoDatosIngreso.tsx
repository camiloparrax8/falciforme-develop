
import React from "react";
import Input from "@/components/ui/Input";
import Tag from "@/components/ui/Tag";

const InfoDatosIngreso = () => {
  // JSON quemado
  const item = {
    fecha_primera_consulta: "Meningococo",
    edad_consulta: "2 años",
    fecha_inicio_sintomas: "2 años",
    sintomas: [
      { nombre: "Anemia", color: "indigo" },
      { nombre: "Palidez", color: "gray" },
      { nombre: "Dolor óseo", color: "indigo" },
      { nombre: "Dactilitis", color: "indigo" },
      { nombre: "Infecciones", color: "red" },
      { nombre: "Ictericia ósea", color: "red" },
    ],
  };

  return (
    <>
      <div className="w-full p-4">
        {/* Información básica */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-bold mb-1">
              Fecha 1ra consulta hematología
            </label>
            <Input
              size="sm"
              disabled
              value={item.fecha_primera_consulta}
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">
              Edad de esa consulta
            </label>
            <Input size="sm" disabled value={item.edad_consulta} />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">
              Fecha Inicio Síntomas
            </label>
            <Input size="sm" disabled value={item.fecha_inicio_sintomas} />
          </div>
        </div>

        {/* Síntomas */}
        <div className="mb-6">
          <h6 className="text-md font-semibold mb-4">Síntomas</h6>
          <div className="flex flex-wrap gap-2">
            {item.sintomas.map((sintoma, index) => (
              <Tag
                key={index}
                className={`text-${sintoma.color}-600 bg-${sintoma.color}-100 dark:text-${sintoma.color}-100 dark:bg-${sintoma.color}-500/20 border-0`}
              >
                {sintoma.nombre}
              </Tag>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoDatosIngreso;