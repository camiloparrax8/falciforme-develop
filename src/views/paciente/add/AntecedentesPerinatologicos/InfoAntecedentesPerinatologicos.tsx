import Input from '@/components/ui/Input'
import SectionTitle from '../../../common/form/SectionTitle'
import { useToken } from '@/store/authStore'
import { useEffect, useState } from 'react'
import { BuscarPerinatologicos } from '../../../../customService/services/perinatologicasService.js'

const InfoAntecedentesPerinatologicos = ({ idPaciente }) => {
    const id = idPaciente
    const { token } = useToken()
    const [perinatologicos, setPerinatologicos] = useState([])

    useEffect(() => {
        if (!token || !id) return
        const antecedentePerinatologicos = async () => {
            try {
                if (!token) {
                    console.error('Token no disponible')
                    return
                }

                const respuesta = await BuscarPerinatologicos(token, id)

                if (respuesta?.data) {
                    setPerinatologicos(respuesta.data) // Asumimos que 'data' es un arreglo de usuarios
                } else {
                    console.error('Respuesta inesperada:', respuesta)
                }
            } catch (error) {
                console.error('Error al cargar usuarios:', error)
            }
        }
        antecedentePerinatologicos()
    }, [token, id])

    return (
        <>
            <div className="w-full p-4">
                {/* Validar si existe un antecedente */}
                {perinatologicos.length > 0 ? (
                    <>
                        {/* Información General */}
                        <div className="grid grid-cols-3 gap-4 mb-6">
                            <SectionTitle
                                text="Información General"
                                className="col-span-1 md:col-span-2 lg:col-span-4"
                            />

                            <div>
                                <label className="block text-sm font-bold mb-1">
                                    Peso al nacer
                                </label>
                                <Input
                                    disabled
                                    size="sm"
                                    value={
                                        perinatologicos[0]?.peso_al_nacer ||
                                        'N/A'
                                    }
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold mb-1">
                                    Talla al nacer
                                </label>
                                <Input
                                    disabled
                                    size="sm"
                                    value={
                                        perinatologicos[0]?.talla_al_nacer ||
                                        'N/A'
                                    }
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold mb-1">
                                    Nota
                                </label>
                                <Input
                                    disabled
                                    size="sm"
                                    value={perinatologicos[0]?.nota || 'N/A'}
                                />
                            </div>
                        </div>

                        {/* Condición del nacimiento */}
                        <div className="mb-6">
                            <SectionTitle
                                text="Condición del nacimiento"
                                className="col-span-1 md:col-span-2 lg:col-span-4"
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold mb-1">
                                        Post término
                                    </label>
                                    <Input
                                        disabled
                                        size="sm"
                                        value={
                                            perinatologicos[0]
                                                ?.condicion_al_nacer ===
                                            'Postérmino'
                                                ? 'Sí'
                                                : 'No'
                                        }
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold mb-1">
                                        Prematuro
                                    </label>
                                    <Input
                                        disabled
                                        size="sm"
                                        value={
                                            perinatologicos[0]
                                                ?.condicion_al_nacer ===
                                            'Prematuro'
                                                ? 'Sí'
                                                : 'No'
                                        }
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Información Neonatal */}
                        <div className="mb-6">
                            <SectionTitle
                                text="Información Neonatal"
                                className="col-span-1 md:col-span-2 lg:col-span-4"
                            />
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-bold mb-1">
                                        Requirió cuidado neonatal
                                    </label>
                                    <Input
                                        disabled
                                        size="sm"
                                        value={
                                            perinatologicos[0]
                                                ?.cuidado_neonatal || 'No'
                                        }
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold mb-1">
                                        Presentó ictericia
                                    </label>
                                    <Input
                                        disabled
                                        size="sm"
                                        value={
                                            perinatologicos[0]
                                                ?.etirico_neonatal || 'No'
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <p className="text-center text-gray-500">
                        No se encontraron antecedentes perinatológicos.
                    </p>
                )}
            </div>
        </>
    )
}
export default InfoAntecedentesPerinatologicos
