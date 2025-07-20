import Input from '@/components/ui/Input'
import SectionTitle from '../../../common/form/SectionTitle'
import { BuscarAcompañante } from '@/customService/services/acompañanteService'
import { useToken } from '@/store/authStore'
import { useState, useEffect, useCallback } from 'react'
import { Spinner } from '@/components/ui/Spinner'

function InfoAcompañante({ data }) {
    const { token } = useToken()
    const [acompañanteData, setAcompañanteData] = useState(data || null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    // Cargar datos del acompañante directamente del servicio
    const cargarAcompañante = useCallback(async () => {
        if (!data?.identificacion) return

        try {
            setLoading(true)
            setError(null)
            const response = await BuscarAcompañante(token, data.identificacion)

            if (
                response &&
                response.status === '200' &&
                response.data &&
                response.data.length > 0
            ) {
                setAcompañanteData(response.data[0]) // Tomar el primer resultado
            } else {
                setAcompañanteData(data) // Fallback a los datos originales
            }
        } catch (error) {
            console.error('Error al cargar acompañante:', error)
            setError('Error al cargar los datos del acompañante')
            setAcompañanteData(data) // Fallback a los datos originales
        } finally {
            setLoading(false)
        }
    }, [data?.identificacion, token, data])

    useEffect(() => {
        if (data?.identificacion) {
            cargarAcompañante()
        } else {
            setAcompañanteData(data)
        }
    }, [data?.identificacion, cargarAcompañante, data]) // Optimizado con useCallback

    const item = acompañanteData

    // Mostrar spinner mientras carga
    if (loading) {
        return (
            <div className="w-full p-4 flex justify-center items-center h-32">
                <Spinner size={40} />
                <span className="ml-2">
                    Cargando información del acompañante...
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
                    No hay información de acompañante disponible.
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="w-full p-4">
                <div className="mb-6">
                    <SectionTitle
                        text="Información personal"
                        className="col-span-1 md:col-span-2 lg:col-span-4"
                    ></SectionTitle>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="col-span-2">
                            <label className="block text-sm font-bold mb-1">
                                Nombre Completo
                            </label>
                            <Input
                                disabled
                                size="sm"
                                value={`${item.nombre} ${item.apellido}`}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-1">
                                Cédula
                            </label>
                            <Input
                                disabled
                                size="sm"
                                value={`${item.tipo_identificacion} - ${item.identificacion}`}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-1">
                                Celular
                            </label>
                            <Input disabled size="sm" value={item.celular} />
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <label className="block text-sm font-bold mb-1">
                                Correo Electrónico
                            </label>
                            <Input
                                disabled
                                size="sm"
                                value={item.correo || 'No registrado'}
                            />
                        </div>
                    </div>
                </div>

                {/* Información de Ubicación */}
                <div className="mb-6">
                    <SectionTitle
                        text="Información Ubicación"
                        className="col-span-1 md:col-span-2 lg:col-span-4"
                    ></SectionTitle>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-bold mb-1">
                                Departamento
                            </label>
                            <Input
                                disabled
                                size="sm"
                                value={item.departamento}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-1">
                                Municipio
                            </label>
                            <Input disabled size="sm" value={item.municipio} />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-bold mb-1">
                                Dirección
                            </label>
                            <Input disabled size="sm" value={item.direccion} />
                        </div>
                    </div>
                </div>

                {/* Información Socioeconómica */}
                <div className="mb-6">
                    <SectionTitle
                        text="Información Socioeconómica"
                        className="col-span-1 md:col-span-2 lg:col-span-4"
                    ></SectionTitle>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-bold mb-1">
                                Ocupación
                            </label>
                            <Input disabled size="sm" value={item.ocupacion} />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-1">
                                Tipo de Vivienda
                            </label>
                            <Input
                                disabled
                                size="sm"
                                value={item.tipo_vivienda}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-1">
                                Nivel de Ingresos
                            </label>
                            <Input
                                disabled
                                size="sm"
                                value={item.nivel_ingreso}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-1">
                                Nivel Académico
                            </label>
                            <Input
                                disabled
                                size="sm"
                                value={item.nivel_academico}
                            />
                        </div>
                    </div>
                </div>

                {/* Información Adicional */}
                <div className="mb-6">
                    <SectionTitle
                        text="Información Adicional"
                        className="col-span-1 md:col-span-2 lg:col-span-4"
                    ></SectionTitle>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-bold mb-1">
                                Tipo de Vehículo
                            </label>
                            <Input
                                disabled
                                size="sm"
                                value={item.tipo_vehiculo || 'No tiene'}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default InfoAcompañante
