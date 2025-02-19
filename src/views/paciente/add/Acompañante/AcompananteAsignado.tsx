import { useState, useEffect } from 'react'
import { Table } from '@/components/ui'
import SectionTitle from '@/views/common/form/SectionTitle'
import { buscarPaciente } from '@/customService/services/pacienteService'
import { useToken } from '@/store/authStore'
import { usePatient } from '@/context/PatientContext'

const AcompananteAsignado = ({ refresh }) => {
    const { token } = useToken()
    const { paciente } = usePatient()
    const [acompanante, setAcompanante] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchAcompanante = async () => {
            if (!paciente?.id) return
            setLoading(true)

            try {
                const data = await buscarPaciente(token, paciente.identificacion)
                if (data?.data?.acompaniante) {
                    setAcompanante(data.data.acompaniante)
                } else {
                    setAcompanante(null)
                }
            } catch (error) {
                console.error('Error al obtener el acompañante asignado:', error)
                setAcompanante(null)
            } finally {
                setLoading(false)
            }
        }

        fetchAcompanante()
    }, [paciente, token, refresh]) // <- Agregar refresh como dependencia

    return (
        <div>
            <SectionTitle className={""} text="Acompañante Asignado" />
            {loading ? (
                <p className="text-center text-blue-600">Cargando...</p>
            ) : acompanante ? (
                <Table className="w-full">
                    <thead>
                        <tr>
                            <th className="text-left text-sm">Nombre</th>
                            <th className="text-left text-sm">Identificación</th>
                            <th className="text-left text-sm">Celular</th>
                            <th className="text-left text-sm">Correo</th>
                            <th className="text-left text-sm">Municipio</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="py-2 px-4">{acompanante.nombre} {acompanante.apellido}</td>
                            <td className="py-2 px-4">{acompanante.identificacion}</td>
                            <td className="py-2 px-4">{acompanante.celular}</td>
                            <td className="py-2 px-4">{acompanante.correo}</td>
                            <td className="py-2 px-4">{acompanante.municipio}</td>
                        </tr>
                    </tbody>
                </Table>
            ) : (
                <p className="text-center text-gray-500">No hay un acompañante asignado</p>
            )}
        </div>
    )
}


export default AcompananteAsignado
