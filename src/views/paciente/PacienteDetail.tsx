import { Card, Tabs } from '@/components/ui'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import { useState, type MouseEvent } from 'react'
import ButtonNavigation from '../common/ButtonNavigation'
import {  TbInfoSquareRoundedFilled } from 'react-icons/tb';


const { TabNav, TabList, TabContent } = Tabs

export const PacienteDetail = ({ item }) => {
    const [dialogIsOpen, setIsOpen] = useState(false)

    const openDialog = () => {
        setIsOpen(true)
    }

    const onDialogClose = (e: MouseEvent) => {
        console.log('onDialogClose', e)
        setIsOpen(false)
    }
    const  hc = <TbInfoSquareRoundedFilled />


    return (
        <>
            <div className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Columna 1: Información básica */}
                    <div className="col-span-1">
                        <Card className="w-full">
                            <h5 className="text-lg font-semibold mb-4">
                                Información del paciente
                            </h5>

                            {/* Nombre: Una sola línea */}
                            <div className="mb-4">
                                <label
                                    htmlFor="Nombre"
                                    className="block font-bold mb-1"
                                >
                                    Nombre
                                </label>
                                <Input size="sm" disabled value={item.nombre} />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="Identificacion"
                                    className="block font-bold mb-1"
                                >
                                    Identificacion
                                </label>
                                <Input size="sm" disabled value={`${item.tipo}. ${item.cedula} `} />
                                </div>

                    
                            <div className="mb-4">
                                <label
                                    htmlFor="Direccion"
                                    className="block font-bold mb-1"
                                >
                                    Dirección
                                </label>
                                <Input
                                    size="sm"
                                    disabled
                                    value={item.direccion}
                                />
                            </div>

                            {/* Botón centrado */}
                            <div className="flex justify-center mt-4 gap-x-4">
                                <Button
                                    variant="solid"
                                    onClick={() => openDialog()}
                                    icon= {hc}
                                >
                                    Detalles
                                </Button>
                                <ButtonNavigation
                                    title="Editar"
                                    uri="/usuario"
                                    iconName="edit"
                                />
                                <ButtonNavigation
                                    title="Registrar Atención"
                                    uri="/usuario"
                                    iconName="hc"
                                />
                            </div>

                            {/* Dialog */}
                            <Dialog
                                isOpen={dialogIsOpen}
                                width={1200}
                                height={770}
                                onClose={onDialogClose}
                                onRequestClose={onDialogClose}
                            >
                                <div className="flex flex-col h-full justify-between">
                                    <h5 className="mb-4">
                                        Detalles del paciente
                                    </h5>
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
                                                    size="sm"
                                                    disabled
                                                    value={item.nombre}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold mb-1">
                                                    Tipo
                                                </label>
                                                <Input
                                                    size="sm"
                                                    disabled
                                                    value={item.tipo}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold mb-1">
                                                    Identificación
                                                </label>
                                                <Input
                                                    size="sm"
                                                    disabled
                                                    value={item.cedula}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold mb-1">
                                                    Nacimiento
                                                </label>
                                                <Input
                                                    size="sm"
                                                    disabled
                                                    value={item.nacimiento}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold mb-1">
                                                    Edad
                                                </label>
                                                <Input
                                                    size="sm"
                                                    disabled
                                                    value={`${item.edad} Años`}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Datos de Ubicación */}
                                    <div className="mb-6">
                                        <h6 className="text-md font-semibold mb-4">
                                            Datos de Ubicación
                                        </h6>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            <div>
                                                <label className="block text-sm font-bold mb-1">
                                                    Departamento
                                                </label>
                                                <Input
                                                    size="sm"
                                                    disabled
                                                    value={item.departamento}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold mb-1">
                                                    Municipio
                                                </label>
                                                <Input
                                                    size="sm"
                                                    disabled
                                                    value={item.municipio}
                                                />
                                            </div>
                                            <div className="col-span-2">
                                                <label className="block text-sm font-bold mb-1">
                                                    Dirección
                                                </label>
                                                <Input
                                                    size="sm"
                                                    disabled
                                                    value={item.direccion}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold mb-1">
                                                    Residente
                                                </label>
                                                <Input
                                                    size="sm"
                                                    disabled
                                                    value={item.residente}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold mb-1">
                                                    Procedente
                                                </label>
                                                <Input
                                                    size="sm"
                                                    disabled
                                                    value={item.procedente}
                                                />
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
                                                    Estrato
                                                </label>
                                                <Input
                                                    size="sm"
                                                    disabled
                                                    value={item.estrato}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold mb-1">
                                                    Ocupación
                                                </label>
                                                <Input
                                                    size="sm"
                                                    disabled
                                                    value={item.ocupacion}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold mb-1">
                                                    Régimen
                                                </label>
                                                <Input
                                                    size="sm"
                                                    disabled
                                                    value={item.regimen}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Datos de Contacto */}
                                    <div className="mb-6">
                                        <h6 className="text-md font-semibold mb-4">
                                            Datos de Contacto
                                        </h6>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            <div>
                                                <label className="block text-sm font-bold mb-1">
                                                    Celular
                                                </label>
                                                <Input
                                                    size="sm"
                                                    disabled
                                                    value={item.celular}
                                                />
                                            </div>
                                            <div className="col-span-2">
                                                <label className="block text-sm font-bold mb-1">
                                                    Correo
                                                </label>
                                                <Input
                                                    size="sm"
                                                    disabled
                                                    value={item.correo}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Dialog>
                        </Card>
                    </div>

                    {/* Columna 2: Tabs */}
                    <div className="col-span-2">
                        <Card className="w-full ">
                            <Tabs defaultValue="redPrimaria">
                                <TabList className="flex space-x-4 border-b pb-2">
                                    <TabNav
                                        value="redPrimaria"
                                        className="cursor-pointer"
                                    >
                                        Red Primaria
                                    </TabNav>
                                    <TabNav
                                        value="acompañante"
                                        className="cursor-pointer"
                                    >
                                        Acompañante
                                    </TabNav>
                                    <TabNav
                                        value="antFamiliar"
                                        className="cursor-pointer"
                                    >
                                        Ant. Familiar
                                    </TabNav>
                                    <TabNav
                                        value="antPerinatologicos"
                                        className="cursor-pointer"
                                    >
                                        Ant. Perinatológicos
                                    </TabNav>
                                    <TabNav
                                        value="vacunas"
                                        className="cursor-pointer"
                                    >
                                        Vacunas
                                    </TabNav>
                                    <TabNav
                                        value="primeraConsulta"
                                        className="cursor-pointer"
                                    >
                                        Primera Consulta
                                    </TabNav>
                                </TabList>
                                <div className="p-4">
                                    <TabContent value="redPrimaria">
                                        <p>Componente para red primaria</p>
                                    </TabContent>
                                    <TabContent value="acompañante">
                                        <p>Componente para acompañante</p>
                                    </TabContent>
                                    <TabContent value="antFamiliar">
                                        <p>
                                            Componente para antecedentes
                                            familiares
                                        </p>
                                    </TabContent>
                                    <TabContent value="antPerinatologicos">
                                        <p>
                                            Componente para antecedentes
                                            perinatológicos
                                        </p>
                                    </TabContent>
                                    <TabContent value="vacunas">
                                        <p>Componente para vacunas</p>
                                    </TabContent>
                                    <TabContent value="primeraConsulta">
                                        <p>Componente para primera consulta</p>
                                    </TabContent>
                                </div>
                            </Tabs>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    )
}
