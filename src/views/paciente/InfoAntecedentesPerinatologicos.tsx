import React from 'react'
import Input from '@/components/ui/Input'
import SectionTitle from '../common/form/SectionTitle'

const InfoAntecedentesPerinatologicos = () => {
    // JSON quemado
    const item = {
        peso_al_nacer: '2 lb',
        talla_al_nacer: '30 cm',
        nota: 'Lore impun',
        condicion_nacimiento: 'Post término', // Puede ser "Post término" o "Pretérmino"
        cuidado_neonatal: 'Sí',
        ictericia_neonatal: 'Sí',
    }

    return (
        <>
            <div className="w-full p-4">
                {/* Peso, Talla y Nota */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                <SectionTitle text="Información General" className="col-span-1 md:col-span-2 lg:col-span-4"></SectionTitle>

                    <div>
                        <label className="block text-sm font-bold mb-1">
                            Peso al nacer
                        </label>
                        <Input disabled size="sm" value={item.peso_al_nacer} />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-1">
                            Talla al nacer
                        </label>
                        <Input disabled size="sm" value={item.talla_al_nacer} />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-1">
                            Nota
                        </label>
                        <Input disabled size="sm" value={item.nota} />
                    </div>
                </div>

                {/* Condición del nacimiento */}
                <div className="mb-6">
                    
                <SectionTitle text="Condición del nacimiento" className="col-span-1 md:col-span-2 lg:col-span-4"></SectionTitle>

                  
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold mb-1">
                                Post término
                            </label>
                            <Input
                                disabled
                                size="sm"
                                value={
                                    item.condicion_nacimiento === 'Post término'
                                        ? 'Sí'
                                        : 'No'
                                }
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-1">
                                Pretérmino
                            </label>
                            <Input
                                disabled
                                size="sm"
                                value={
                                    item.condicion_nacimiento === 'Pretérmino'
                                        ? 'Sí'
                                        : 'No'
                                }
                            />
                        </div>
                    </div>
                </div>

                {/* Unidad de cuidado neonatal */}
                <div className="mb-6">
                <SectionTitle text="Información Neonatal" className="col-span-1 md:col-span-2 lg:col-span-4"></SectionTitle>

                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-bold mb-1">
                                Requirió cuidado neonatal
                            </label>
                            <Input
                                disabled
                                size="sm"
                                value={item.cuidado_neonatal}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-1">
                                Presentó ictericia
                            </label>
                            <Input
                                disabled
                                size="sm"
                                value={item.ictericia_neonatal}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default InfoAntecedentesPerinatologicos
