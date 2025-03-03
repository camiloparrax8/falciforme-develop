import { Card, Tabs } from '@/components/ui'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import { useState, type MouseEvent } from 'react'
import ButtonNavigation from '../common/ButtonNavigation'
import { TbInfoSquareRoundedFilled } from 'react-icons/tb'
import InfoRedPrimaria from './add/RedPrimaria/InfoRedPrimaria'
import InfoAcompañante from './add/Acompañante/InfoAcompañante'
import InfoAntecedentes from './add/AntecedentesPerinatologicos/InfoAntecedentes'
import InfoAntecedentesPerinatologicos from './add/AntecedentesPerinatologicos/InfoAntecedentesPerinatologicos'
import InfoVacunas from './add/Vacunas/InfoVacunas'
import InfoDatosIngreso from './add/Ingreso/InfoDatosIngreso'
import Field from '../common/Field'
import Section from '../common/Section'
import { FaFileMedical } from 'react-icons/fa'
import { useFormattedDate } from '@/hooks/useFormattedDate';
import { useCalculateAge } from '@/hooks/useCalculateAge';
import { FaClinicMedical } from "react-icons/fa";
import { Table } from '@/components/ui/Table'


const { TabNav, TabList, TabContent } = Tabs

export const PacienteDetail = ({ item }) => {

    const { formatDate } = useFormattedDate();
    const { calculateAge } = useCalculateAge();
    const historiasClinicas = [
        { id: 1, fecha: '2024-02-01', tipo: 'Seguimiento', diagnostico: 'Hipertensión' },
        { id: 2, fecha: '2024-01-15', tipo: 'Inicial', diagnostico: 'Diabetes Tipo 2' },
        { id: 3, fecha: '2023-12-20', tipo: 'Seguimiento', diagnostico: 'Control general' },
    ]
   


    console.log(item);
    
    const [dialogIsOpenPaciente, setIsOpenPaciente] = useState(false)
    const [dialogIsOpenHC, setIsOpenHC] = useState(false)
    const [dialogIsOpenHistoriaClinica, setIsOpenHistoriaClinica] = useState(false);
    const openDialogHistoriaClinica = () => setIsOpenHistoriaClinica(true);
    const closeDialogHistoriaClinica = () => setIsOpenHistoriaClinica(false);

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
                                        value={`${item.data.nombre} ${item.data.apellido}`}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-1">
                                        Tipo
                                    </label>
                                    <Input
                                        disabled
                                        size="sm"
                                        value={item.data.tipo_identificacion}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-1">
                                        Identificación
                                    </label>
                                    <Input
                                        disabled
                                        size="sm"
                                        value={item.data.identificacion}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-1">
                                        Nacimiento
                                    </label>
                                    <Input
                                        disabled
                                        size="sm"
                                        value={formatDate(item.data.fecha_nacimiento)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-1">
                                        Edad
                                    </label>
                                    <Input
                                        disabled
                                        size="sm"
                                        value={`${calculateAge(item.data.fecha_nacimiento)} Años`}
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
                                    variant="solid"
                                    icon={<FaClinicMedical />}
                                    onClick={() => openDialogHistoriaClinica()}
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
                                            value={item.data.departamento}
                                        />
                                        <Field
                                            label="Municipio"
                                            value={item.data.municipio}
                                        />
                                        <Field
                                            label="Dirección"
                                            value={item.data.direccion}
                                            span={2}
                                        />
                                        <Field
                                            label="Residente"
                                            value={item.data.residente}
                                        />
                                        <Field
                                            label="Procedente"
                                            value={item.data.procedente}
                                        />
                                    </Section>

                                    {/* Información Socioeconómica */}
                                    <Section title="Información Socioeconómica">
                                        <Field
                                            label="Estrato"
                                            value={item.data.estrato}
                                        />
                                        <Field
                                            label="Ocupación"
                                            value={item.data.ocupacion}
                                        />
                                        <Field
                                            label="Régimen"
                                            value={item.data.regimen}
                                        />
                                    </Section>

                                    {/* Datos de Contacto */}
                                    <Section title="Datos de Contacto">
                                        <Field
                                            label="Celular"
                                            value={item.data.celular}
                                        />
                                        <Field
                                            label="Correo"
                                            value={item.data.correo}
                                            span={2}
                                        />
                                    </Section>
                                </div>
                            </Dialog>

                            <Dialog
                                isOpen={dialogIsOpenHistoriaClinica}
                                width={800}
                                height={500}
                                onClose={closeDialogHistoriaClinica}
                                onRequestClose={closeDialogHistoriaClinica}
                            >
                                <div className="flex flex-col h-full space-y-4">
                                    <h5>Historia Clínica del Paciente</h5>
                                    <p>Aquí puedes agregar la información relevante de la historia clínica.</p>
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
                                        uri={`/historia-clinica/${item.data.id}?tipo=seguimiento`}
                                        iconName="edit"
                                    />
                                    <ButtonNavigation
                                        variant="solid"
                                        title="Inicial"
                                        uri={`/historia-clinica/${item.data.id}?tipo=inicial`}
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
                                        <InfoRedPrimaria data={item.data.redPrimaria}></InfoRedPrimaria>
                                    </TabContent>
                                    <TabContent value="acompañante">
                                        <InfoAcompañante data={item.data.acompaniante}></InfoAcompañante>
                                    </TabContent>
                                    <TabContent value="antFamiliar">
                                        <InfoAntecedentes idPaciente ={item.data.id}></InfoAntecedentes>
                                    </TabContent>
                                    <TabContent value="antPerinatologicos">
                                        <InfoAntecedentesPerinatologicos idPaciente ={item.data.id} ></InfoAntecedentesPerinatologicos>
                                    </TabContent>
                                    <TabContent value="vacunas">
                                        <InfoVacunas idPaciente ={item.data.id} ></InfoVacunas>
                                    </TabContent>
                                    <TabContent value="primeraConsulta">
                                        <InfoDatosIngreso idPaciente ={item.data.id}></InfoDatosIngreso>
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
