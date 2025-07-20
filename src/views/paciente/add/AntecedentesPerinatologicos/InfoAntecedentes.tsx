/* eslint-disable @typescript-eslint/no-unused-vars */
import { Card } from '@/components/ui'
import Table from '@/components/ui/Table'
import Tag from '@/components/ui/Tag'
import { useToken } from '@/store/authStore'
import { BuscarEstadosHBS } from '@/customService/services/estadoHbsService.js'
import { BuscarEnfermedadCronica } from '@/customService/services/enfermedadesCronicasService.js'
import { useEffect, useState } from 'react'

const { Tr, Th, Td, THead, TBody } = Table

function InfoAntecedentes({ idPaciente }: { idPaciente: string }) {
    const { token } = useToken()
    const [antecedentesFamiliares, setAntecedentesFamiliares] = useState([])
    const [loading, setLoading] = useState(true)
    const [enfermedades, setEnfermedades] = useState([])
    const [loadingEnfermedades, setLoadingEnfermedades] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const data = await BuscarEstadosHBS(token, idPaciente)
                const array = data.data || []
                const mapeados = array.map((item) => ({
                    parentesco: item.parentesco,
                    linea: item.linea_parentesco,
                    estado: item.estado,
                    estadoColor:
                        item.estado === 'Positivo' || item.estado === 'Portador'
                            ? 'red'
                            : item.estado === 'Desconocido'
                              ? 'yellow'
                              : item.estado === 'No portador'
                                ? 'emerald'
                                : 'indigo',
                }))
                setAntecedentesFamiliares(mapeados)
            } catch (error) {
                setAntecedentesFamiliares([])
            } finally {
                setLoading(false)
            }
        }
        if (idPaciente) fetchData()
    }, [idPaciente, token])

    useEffect(() => {
        const fetchEnfermedades = async () => {
            setLoadingEnfermedades(true)
            try {
                const data = await BuscarEnfermedadCronica(token, idPaciente)

                const array = data.data || []
                const mapeados = array.map((item) => ({
                    enfermedad: item.enfermedad,
                    especifica: item.enfermedad_especifica,
                    portador: item.portador,
                    linea_parentesco_portador: item.linea_parentesco_portador,
                    portadores: item.linea_parentesco_portador
                        ? item.linea_parentesco_portador
                              .split(',')
                              .map((nombre) => ({
                                  nombre: nombre.trim(),
                                  color: 'emerald',
                              }))
                        : [],
                }))

                setEnfermedades(mapeados)
            } catch (error) {
                console.error('Error al cargar enfermedades:', error)
                setEnfermedades([])
            } finally {
                setLoadingEnfermedades(false)
            }
        }
        if (idPaciente) fetchEnfermedades()
    }, [idPaciente, token])

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
                        <div className="p-2 text-center text-gray-400">
                            Cargando...
                        </div>
                    ) : antecedentesFamiliares.length === 0 ? (
                        <div className="p-2 text-center text-gray-400">
                            No hay antecedentes familiares registrados.
                        </div>
                    ) : (
                        antecedentesFamiliares.map((antecedente, index) => (
                            <div
                                key={index}
                                className="grid grid-cols-3 gap-1 p-2"
                            >
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
                                    <Th>Específica</Th>
                                    <Th>Portador</Th>
                                    <Th>Parentesco</Th>
                                </Tr>
                            </THead>
                            <TBody>
                                {loadingEnfermedades ? (
                                    <Tr>
                                        <Td
                                            colSpan={4}
                                            className="text-center text-gray-400"
                                        >
                                            Cargando...
                                        </Td>
                                    </Tr>
                                ) : enfermedades.length === 0 ? (
                                    <Tr>
                                        <Td
                                            colSpan={4}
                                            className="text-center text-gray-400"
                                        >
                                            No hay enfermedades crónicas
                                            registradas.
                                        </Td>
                                    </Tr>
                                ) : (
                                    enfermedades.map((enfermedad, index) => (
                                        <Tr key={index}>
                                            <Td>{enfermedad.enfermedad}</Td>
                                            <Td>{enfermedad.especifica}</Td>
                                            <Td>
                                                <Tag
                                                    className={`text-${enfermedad.portador === 'Sí' ? 'red' : 'emerald'}-600 
                                    bg-${enfermedad.portador === 'Sí' ? 'red' : 'emerald'}-100 
                                    dark:text-${enfermedad.portador === 'Sí' ? 'red' : 'emerald'}-100 
                                    dark:bg-${enfermedad.portador === 'Sí' ? 'red' : 'emerald'}-500/20 
                                    border-0`}
                                                >
                                                    {enfermedad.portador}
                                                </Tag>
                                            </Td>
                                            <Td>
                                                {enfermedad.linea_parentesco_portador && (
                                                    <Tag className="text-emerald-600 bg-emerald-100 dark:text-emerald-100 dark:bg-emerald-500/20 border-0">
                                                        {
                                                            enfermedad.linea_parentesco_portador
                                                        }
                                                    </Tag>
                                                )}
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
