import React from 'react'
import Input from '@/components/ui/Input'
import SectionTitle from '../common/form/SectionTitle'

function InfoRedPrimaria() {
    // JSON quemado
    const item = {
        fecha: '25/09/2024',
        hospital: 'Loren Impunb',
        correo: 'cparrarueta@gmail.com',
        telefono_contacto: '(301) 2 54 68 86',
        departamento: 'Córdoba',
        municipio: 'Montería',
        telefono_urgencias: '(301) 2 54 68 86',
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
                    <Input disabled size="sm" value={item.fecha} />
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
                        Teléfono Contacto
                    </label>
                    <Input disabled size="sm" value={item.telefono_contacto} />
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
                        Teléfono Urgencias
                    </label>
                    <Input disabled size="sm" value={item.telefono_urgencias} />
                </div>
            </div>
        </>
    )
}

export default InfoRedPrimaria
