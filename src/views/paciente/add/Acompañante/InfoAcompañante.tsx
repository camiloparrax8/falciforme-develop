import Input from '@/components/ui/Input'
import SectionTitle from '../../../common/form/SectionTitle'

function InfoAcompañante({data}) {
    const item = data;

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
                            <Input disabled size="sm" value={`${item.tipo_identificacion} - ${item.identificacion}`} />
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
                <SectionTitle text="Información Ubicación" className="col-span-1 md:col-span-2 lg:col-span-4"></SectionTitle>

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
