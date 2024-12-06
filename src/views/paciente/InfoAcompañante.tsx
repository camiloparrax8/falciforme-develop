import React from 'react'
import Input from '@/components/ui/Input'

function InfoAcompañante() {
    // JSON quemado
    const item = {
        nombre_completo: 'Alberto Mendoza',
        cedula: '43424',
        celular: '(301) 2 54 68 86',
        departamento: 'Córdoba',
        municipio: 'Montería',
        direccion: 'Calle 33 4-27 centro',
        ocupacion: 'Ingeniero de Sistemas',
        tipo_vivienda: 'Arriendo',
        nivel_ingresos: 'Entre 1 SMMLV y 2 SMMLV',
        nivel_academico: 'Primaria',
        tipo_vehiculo: null, // Cambia a un string si deseas mostrar algo diferente
    }

    return (
        <>
            <div className="w-full p-4">
                {/* Información Personal */}
                <div className="mb-6">
                    <h6 className="text-md font-semibold mb-4">
                        Información Personal
                    </h6>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="col-span-2">
                            <label className="block text-sm font-bold mb-1">
                                Nombre Completo
                            </label>
                            <Input
                                disabled
                                size="sm"
                                value={item.nombre_completo}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-1">
                                Cédula
                            </label>
                            <Input disabled size="sm" value={item.cedula} />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-1">
                                Celular
                            </label>
                            <Input disabled size="sm" value={item.celular} />
                        </div>
                    </div>
                </div>

                {/* Información de Ubicación */}
                <div className="mb-6">
                    <h6 className="text-md font-semibold mb-4">
                        Información de Ubicación
                    </h6>
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
                    <h6 className="text-md font-semibold mb-4">
                        Información Socioeconómica
                    </h6>
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
                                value={item.nivel_ingresos}
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
                    <h6 className="text-md font-semibold mb-4">
                        Información Adicional
                    </h6>
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
