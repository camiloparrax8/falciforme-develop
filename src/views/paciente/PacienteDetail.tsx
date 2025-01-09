import { Card, Tabs } from '@/components/ui'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import { useState, type MouseEvent } from 'react'
import ButtonNavigation from '../common/ButtonNavigation'
import { TbInfoSquareRoundedFilled } from 'react-icons/tb'
import InfoRedPrimaria from './InfoRedPrimaria'
import InfoAcompañante from './InfoAcompañante'
import InfoAntecedentes from './InfoAntecedentes'
import InfoAntecedentesPerinatologicos from './InfoAntecedentesPerinatologicos'
import InfoVacunas from './InfoVacunas'
import InfoDatosIngreso from './InfoDatosIngreso'
import Field from '../common/Field'
import Section from '../common/Section'
import { FaFileMedical } from 'react-icons/fa'

const { TabNav, TabList, TabContent } = Tabs

export const PacienteDetail = ({ item }) => {
    const [dialogIsOpenPaciente, setIsOpenPaciente] = useState(false)
    const [dialogIsOpenHC, setIsOpenHC] = useState(false)

    const openDialogPaciente = () => {
        setIsOpenPaciente(true)
    }

    const onDialogClosePaciente = (e: MouseEvent) => {
        console.log('onDialogClosePaciente', e)
        setIsOpenPaciente(false)
    }
    const openDialogHC = () => {
        setIsOpenHC(true)
    }

    const onDialogCloseHC = (e: MouseEvent) => {
        console.log('onDialogCloseHC', e)
        setIsOpenHC(false)
    }
    const hc = <TbInfoSquareRoundedFilled />
    console.log(item)

    return (
        <>
            <div className="mt-4">
                <div className="grid grid-cols-5 md:grid-cols-5 gap-4">
                    {/* Columna 1: Información básica */}
                    <div className="col-span-6">
                        <Card className="w-full">
                            <h5 className="text-lg font-semibold mb-4">
                                Datos del Paciente
                            </h5>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="col-span-2">
                                    <label className="block text-sm font-bold mb-1">
                                        Nombre Completo
                                    </label>
                                    <Input
                                        disabled
                                        size="sm"
                                        value={item.nombre}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-1">
                                        Tipo
                                    </label>
                                    <Input
                                        disabled
                                        size="sm"
                                        value={item.tipo}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-1">
                                        Identificación
                                    </label>
                                    <Input
                                        disabled
                                        size="sm"
                                        value={item.cedula}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-1">
                                        Nacimiento
                                    </label>
                                    <Input
                                        disabled
                                        size="sm"
                                        value={item.nacimiento}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-1">
                                        Edad
                                    </label>
                                    <Input
                                        disabled
                                        size="sm"
                                        value={`${item.edad} Años`}
                                    />
                                </div>
                            </div>

                            {/* Botón centrado */}
                            <div className="flex mt-4 gap-x-1">
                                <Button
                                    variant="solid"
                                    icon={hc}
                                    onClick={() => openDialogPaciente()}
                                ></Button>
                              
                                <Button
                                    icon={<FaFileMedical />}
                                    variant="solid"
                                    title=""
                                    onClick={() => openDialogHC()}
                                />
                            </div>

                            {/* Dialog ionformacion del paciente */}
                            <Dialog
                                isOpen={dialogIsOpenPaciente}
                                width={800} // Ancho en píxeles
                                height={500} // Altura en píxeles
                                onClose={onDialogClosePaciente}
                                onRequestClose={onDialogClosePaciente}
                            >
                                <div className="flex flex-col h-full space-y-4">
                                    <h5>Detalles del paciente</h5>
                                    {/* Datos de Ubicación */}
                                    <Section title="Datos de Ubicación">
                                        <Field
                                            label="Departamento"
                                            value={item.departamento}
                                        />
                                        <Field
                                            label="Municipio"
                                            value={item.municipio}
                                        />
                                        <Field
                                            label="Dirección"
                                            value={item.direccion}
                                            span={2}
                                        />
                                        <Field
                                            label="Residente"
                                            value={item.residente}
                                        />
                                        <Field
                                            label="Procedente"
                                            value={item.procedente}
                                        />
                                    </Section>

                                    {/* Información Socioeconómica */}
                                    <Section title="Información Socioeconómica">
                                        <Field
                                            label="Estrato"
                                            value={item.estrato}
                                        />
                                        <Field
                                            label="Ocupación"
                                            value={item.ocupacion}
                                        />
                                        <Field
                                            label="Régimen"
                                            value={item.regimen}
                                        />
                                    </Section>

                                    {/* Datos de Contacto */}
                                    <Section title="Datos de Contacto">
                                        <Field
                                            label="Celular"
                                            value={item.celular}
                                        />
                                        <Field
                                            label="Correo"
                                            value={item.correo}
                                            span={2}
                                        />
                                    </Section>
                                </div>
                            </Dialog>
                            {/* Dialog tipo consulta */}
                            <Dialog
                                isOpen={dialogIsOpenHC}
                                onClose={onDialogCloseHC}
                                onRequestClose={onDialogCloseHC}
                            >
                                <div className="flex flex-col h-full space-y-4">
                                    <h5>Tipo de consulta</h5>
                                    <ButtonNavigation
                                        variant="solid"
                                        title="Seguimiento"
                                        uri={`/historia-clinica/${item.id}?tipo=seguimiento`}
                                        iconName="edit"
                                    />
                                    <ButtonNavigation
                                        variant="solid"
                                        title="Inicial"
                                        uri={`/historia-clinica/${item.id}?tipo=inicial`}
                                        iconName="edit"
                                    />
                                </div>
                            </Dialog>
                        </Card>
                    </div>

                    {/* Columna 2: Tabs */}
                    <div className="col-span-6">
                        <Card className="w-full ">
                            <Tabs defaultValue="redPrimaria">
                                <TabList className="flex flex-wrap space-x-4 border-b pb-2 overflow-hidden">
                                    <TabNav
                                        value="redPrimaria"
                                        className="cursor-pointer"
                                    >
                                        Primaria
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
                                        Familiar
                                    </TabNav>
                                    <TabNav
                                        value="antPerinatologicos"
                                        className="cursor-pointer"
                                    >
                                        Perinatológicos
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
                                        Ingreso
                                    </TabNav>
                                </TabList>
                                <div className="p-4">
                                    <TabContent value="redPrimaria">
                                        <InfoRedPrimaria></InfoRedPrimaria>
                                    </TabContent>
                                    <TabContent value="acompañante">
                                        <InfoAcompañante></InfoAcompañante>
                                    </TabContent>
                                    <TabContent value="antFamiliar">
                                        <InfoAntecedentes></InfoAntecedentes>
                                    </TabContent>
                                    <TabContent value="antPerinatologicos">
                                        <InfoAntecedentesPerinatologicos></InfoAntecedentesPerinatologicos>
                                    </TabContent>
                                    <TabContent value="vacunas">
                                        <InfoVacunas></InfoVacunas>
                                    </TabContent>
                                    <TabContent value="primeraConsulta">
                                        <InfoDatosIngreso></InfoDatosIngreso>
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
