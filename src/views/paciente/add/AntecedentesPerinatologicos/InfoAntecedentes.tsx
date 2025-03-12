import { Card } from '@/components/ui'
import Table from '@/components/ui/Table'
import Tag from '@/components/ui/Tag'

const { Tr, Th, Td, THead, TBody } = Table

function InfoAntecedentes({ idPaciente }: { idPaciente: string }) {
    // JSON quemado
    const antecedentesFamiliares = [
        {
            parentesco: 'Abuelo',
            linea: 'Paterno',
            estado: 'Positivo',
            estadoColor: 'red',
        },
        {
            parentesco: 'Abuela',
            linea: 'Materna',
            estado: 'Negativo',
            estadoColor: 'emerald',
        },
        {
            parentesco: 'Padre',
            linea: 'Paterno',
            estado: 'Desconocido',
            estadoColor: 'indigo',
        },
    ]

    const enfermedades = [
        {
            enfermedad: 'Hematologicas Benigna',
            especifica: 'Falciforme',
            portadores: [
                { nombre: 'Abuelo Paterno', color: 'indigo' },
                { nombre: 'Abuela Paterno', color: 'indigo' },
                { nombre: 'Abuelo Materno', color: 'emerald' },
                { nombre: 'Abuela Materno', color: 'emerald' },
            ],
        },
        {
            enfermedad: 'Hematologicas Benigna',
            especifica: 'Falciforme',
            portadores: [
                { nombre: 'Abuelo Paterno', color: 'indigo' },
                { nombre: 'Abuela Paterno', color: 'indigo' },
                { nombre: 'Abuelo Materno', color: 'emerald' },
                { nombre: 'Abuela Materno', color: 'emerald' },
            ],
        },
    ]

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
                    {antecedentesFamiliares.map((antecedente, index) => (
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
                    ))}
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
                                {enfermedades.map((enfermedad, index) => (
                                    <Tr key={index}>
                                        <Td>{enfermedad.enfermedad}</Td>
                                        <Td>{enfermedad.especifica}</Td>
                                        <Td>
                                            {enfermedad.portadores.map(
                                                (portador, idx) => (
                                                    <Tag
                                                        key={idx}
                                                        className={`text-${portador.color}-600 bg-${portador.color}-100 dark:text-${portador.color}-100 dark:bg-${portador.color}-500/20 border-0 m-1`}
                                                    >
                                                        {portador.nombre}
                                                    </Tag>
                                                ),
                                            )}
                                        </Td>
                                    </Tr>
                                ))}
                            </TBody>
                        </Table>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default InfoAntecedentes
