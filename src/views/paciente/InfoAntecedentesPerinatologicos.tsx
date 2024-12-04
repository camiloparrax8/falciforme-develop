import React from "react";
import Input from "@/components/ui/Input";

const InfoAntecedentesPerinatologicos = () => {
  // JSON quemado
  const item = {
    peso_al_nacer: "2 lb",
    talla_al_nacer: "30 cm",
    nota: "Lore impun",
    condicion_nacimiento: "Post término", // Puede ser "Post término" o "Pretérmino"
    cuidado_neonatal: "Sí",
    ictericia_neonatal: "Sí",
  };

  return (
    <>
      <div className="w-full p-4">
        {/* Peso, Talla y Nota */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-bold mb-1">Peso al nacer</label>
            <Input size="sm" disabled value={item.peso_al_nacer} />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Talla al nacer</label>
            <Input size="sm" disabled value={item.talla_al_nacer} />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Nota</label>
            <Input size="sm" disabled value={item.nota} />
          </div>
        </div>

        {/* Condición del nacimiento */}
        <div className="mb-6">
          <h6 className="text-md font-semibold mb-4">Condición del nacimiento</h6>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold mb-1">Post término</label>
              <Input
                size="sm"
                disabled
                value={item.condicion_nacimiento === "Post término" ? "Sí" : "No"}
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Pretérmino</label>
              <Input
                size="sm"
                disabled
                value={item.condicion_nacimiento === "Pretérmino" ? "Sí" : "No"}
              />
            </div>
          </div>
        </div>

        {/* Unidad de cuidado neonatal */}
        <div className="mb-6">
          <h6 className="text-md font-semibold mb-4">Neonatal</h6>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-bold mb-1">
                Requirió cuidado neonatal
              </label>
              <Input size="sm" disabled value={item.cuidado_neonatal} />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">
                Presentó ictericia
              </label>
              <Input size="sm" disabled value={item.ictericia_neonatal} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoAntecedentesPerinatologicos;
