import { useState, useEffect } from 'react'
import { Table } from '@/components/ui'
import SectionTitle from '@/views/common/form/SectionTitle'
import { buscarPaciente } from '@/customService/services/pacienteService'
import { useToken } from '@/store/authStore'
import { usePatient } from '@/context/PatientContext'

const RedPrimariaAsignada = ({ refresh }) => {
    const { token } = useToken()
    const { paciente } = usePatient()
    const [redPrimaria, setRedPrimaria] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchRedPrimaria = async () => {
            if (!paciente?.id) return
            setLoading(true)

            try {
                const data = await buscarPaciente(token, paciente.identificacion)
                if (data?.data?.redPrimaria) {
                    setRedPrimaria(data.data.redPrimaria)
                } else {
                    setRedPrimaria(null)
                }
            } catch (error) {
                console.error('Error al obtener la red primaria asignada:', error)
                setRedPrimaria(null)
            } finally {
                setLoading(false)
            }
        }

        fetchRedPrimaria()
    }, [paciente, token, refresh])

    return (
        <div>
            <SectionTitle className={''} text="Red Primaria Asignada" />
            {loading ? (
                <p className="text-center text-blue-600">Cargando...</p>
            ) : redPrimaria ? (
                <Table className="w-full">
                    <thead>
                        <tr>
                            <th className="text-left text-sm">Hospital</th>
                            <th className="text-left text-sm">Ubicación</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="py-2 px-4">{redPrimaria.hospital}</td>
                            <td className="py-2 px-4">{redPrimaria.municipio}, {redPrimaria.departamento}</td>
                        </tr>
                    </tbody>
                </Table>
            ) : (
                <p className="text-center text-gray-500">No hay una red primaria asignada</p>
            )}
        </div>
    )
}

export default RedPrimariaAsignada
