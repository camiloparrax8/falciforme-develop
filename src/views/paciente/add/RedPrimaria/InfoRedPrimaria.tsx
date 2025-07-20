import React from 'react'
import Input from '@/components/ui/Input'
import SectionTitle from '../../../common/form/SectionTitle'
import { useFormattedDate } from '@/hooks/useFormattedDate';
import { buscarRedPrimariaPorId } from '@/customService/services/redPrimariaService'
import { useToken } from '@/store/authStore'
import { useState, useEffect, useCallback } from 'react'
import { Spinner } from '@/components/ui/Spinner'

interface InfoRedPrimariaProps {
    data: any
    idPaciente?: number
}

function InfoRedPrimaria({ data, idPaciente }: InfoRedPrimariaProps) {
    const { formatDate } = useFormattedDate();
    const { token } = useToken()
    const [redPrimariaData, setRedPrimariaData] = useState(data || null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    // Cargar datos de la red primaria directamente del servicio
    const cargarRedPrimaria = useCallback(async () => {
        if (!idPaciente) return

        try {
            setLoading(true)
            setError(null)
            const response = await buscarRedPrimariaPorId(token, idPaciente)
            
            if (response && response.status === '200' && response.data) {
                setRedPrimariaData(response.data)
            } else {
                setRedPrimariaData(data) // Fallback a los datos originales
            }
        } catch (error) {
            console.error('Error al cargar red primaria:', error)
            setError('Error al cargar los datos de la red primaria')
            setRedPrimariaData(data) // Fallback a los datos originales
        } finally {
            setLoading(false)
        }
    }, [idPaciente, token, data])

    useEffect(() => {
        if (idPaciente) {
            cargarRedPrimaria()
        } else {
            setRedPrimariaData(data)
        }
    }, [idPaciente, cargarRedPrimaria, data])

    const item = redPrimariaData

    // Mostrar spinner mientras carga
    if (loading) {
        return (
            <div className="w-full p-4 flex justify-center items-center h-32">
                <Spinner size={40} />
                <span className="ml-2">
                    Cargando información de la red primaria...
                </span>
            </div>
        )
    }

    // Mostrar error si ocurre
    if (error) {
        return (
            <div className="w-full p-4">
                <div className="text-center text-red-500 p-4">{error}</div>
            </div>
        )
    }

    // Mostrar mensaje si no hay datos
    if (!item) {
        return (
            <div className="w-full p-4">
                <div className="text-center text-gray-500 p-4">
                    No hay información de red primaria disponible.
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {/* Fecha */}
                <SectionTitle text="Información General" className="col-span-1 md:col-span-2 lg:col-span-4"></SectionTitle>

                <div>
                    <label className="block text-sm font-bold mb-1">
                        Fecha
                    </label>
                    <Input disabled size="sm" value={formatDate(item.fecha)} />
                </div>

                {/* Hospital */}
                <div>
                    <label className="block text-sm font-bold mb-1">
                        Hospital
                    </label>
                    <Input disabled size="sm" value={item.hospital} />
                </div>

                {/* Correo */}
                <div>
                    <label className="block text-sm font-bold mb-1">
                        Correo
                    </label>
                    <Input disabled size="sm" value={item.correo} />
                </div>

                {/* Teléfono contacto */}
                <div>
                    <label className="block text-sm font-bold mb-1">
                        Teléfono Urgencias
                    </label>
                    <Input disabled size="sm" value={item.telefono_urgencias} />
                </div>

                {/* Departamento */}
                <div>
                    <label className="block text-sm font-bold mb-1">
                        Departamento
                    </label>
                    <Input disabled size="sm" value={item.departamento} />
                </div>

                {/* Municipio */}
                <div>
                    <label className="block text-sm font-bold mb-1">
                        Municipio
                    </label>
                    <Input disabled size="sm" value={item.municipio} />
                </div>

                {/* Teléfono urgencias */}
                <div>
                    <label className="block text-sm font-bold mb-1">
                        Teléfono     
                    </label>
                    <Input disabled size="sm" value={item.telefono} />
                </div>
            </div>
        </>
    )
}

export default InfoRedPrimaria
