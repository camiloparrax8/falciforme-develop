import { useState, useEffect } from 'react'
import SectionTitle from '@/views/common/form/SectionTitle'
import { obtenerVacunasPaciente } from '@/customService/services/vacunasService' // Asegúrate de que este servicio existe
import { useToken } from '@/store/authStore'
import { usePatient } from '@/context/PatientContext'

const TablaVacunas = ({ refresh }) => {
    const { token } = useToken()
    const { paciente } = usePatient()
    const [vacunas, setVacunas] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchVacunas = async () => {
            if (!paciente?.id) return
            setLoading(true)
            try {
                const data = await obtenerVacunasPaciente(token, paciente.id)
                setVacunas(data.data || [])
            } catch (error) {
                console.error('Error al obtener las vacunas:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchVacunas()
    }, [token, paciente.id, refresh]) // ✅ Se actualizará cuando `refresh` cambie

    return (
        <div className="mt-6">
            <SectionTitle
                text="Vacunas Agregadas"
                className="col-span-3 mb-4"
            />
            {loading ? (
                <p className="text-center text-blue-600">Cargando vacunas...</p>
            ) : vacunas.length > 0 ? (
                <table className="min-w-full table-auto">
                    <thead>
                        <tr className="border-b">
                            <th className="py-2 px-4 text-left">Vacuna</th>
                            <th className="py-2 px-4 text-left">Dosis</th>
                            <th className="py-2 px-4 text-left">Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vacunas.map((vacuna) => (
                            <tr key={vacuna.id} className="border-b">
                                <td className="py-2 px-4">{vacuna.nombre}</td>
                                <td className="py-2 px-4">{vacuna.dosis}</td>
                                <td className="py-2 px-4">{vacuna.fecha}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-center text-gray-500">
                    No hay vacunas registradas.
                </p>
            )}
        </div>
    )
}

export default TablaVacunas
