import React from 'react';
import Table from '@/components/ui/Table';

const { Tr, Th, Td, THead, TBody } = Table;

function InfoVacunas() {
  // JSON quemado
  const vacunas = [
    { nombre: "Meningococo", dosis: 2, fecha: "2022-05-22" },
    { nombre: "Neumococo", dosis: 1, fecha: "2023-01-15" },
    { nombre: "Influenza", dosis: 1, fecha: "2021-12-10" },
  ];

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
  );
}

export default InfoVacunas;
