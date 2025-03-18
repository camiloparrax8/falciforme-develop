import { Card, Tabs } from '@/components/ui'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import { useState, type MouseEvent, useCallback } from 'react'
import ButtonNavigation from '../common/ButtonNavigation'
import { useState, type MouseEvent } from 'react'
import { buscarHcOpenById } from '@/customService/services/historiaClinicaService'
import { useToken } from '@/store/authStore'
import { useNavigate } from 'react-router-dom'
import { TbInfoSquareRoundedFilled } from 'react-icons/tb'
import InfoRedPrimaria from './add/RedPrimaria/InfoRedPrimaria'
import InfoAcompañante from './add/Acompañante/InfoAcompañante'
import InfoAntecedentes from './add/AntecedentesPerinatologicos/InfoAntecedentes'
import InfoAntecedentesPerinatologicos from './add/AntecedentesPerinatologicos/InfoAntecedentesPerinatologicos'
import InfoVacunas from './add/Vacunas/InfoVacunas'
import InfoDatosIngreso from './add/Ingreso/InfoDatosIngreso'
import Field from '../common/Field'
import Section from '../common/Section'
import { FaFileMedical, FaClinicMedical } from 'react-icons/fa'
import { useFormattedDate } from '@/hooks/useFormattedDate'
import { useCalculateAge } from '@/hooks/useCalculateAge'
import { FaClinicMedical } from 'react-icons/fa'
import { Table } from '@/components/ui/Table'
import { useGeneratePDF } from '@/hooks/useGeneratePDF'
import { FaDownload } from "react-icons/fa";

const { TabNav, TabList, TabContent } = Tabs

export const PacienteDetail = ({ item }) => {
    const { token } = useToken()
    const navigate = useNavigate()
    const { formatDate } = useFormattedDate()
    const { calculateAge } = useCalculateAge()
    
    const generateHistoriaClinicaData = useCallback(() => {
        return {
            fecha_creacion: new Date().toISOString().split('T')[0],
            paciente: {
                nombre: `${item.data.nombre} ${item.data.apellido}`,
                edad: calculateAge(item.data.fecha_nacimiento),
                genero: item.data.genero || 'No especificado'
            },
            examenesFisicos: {
                // Signos Vitales
                frecuencia_cardiaca: "72",
                frecuencia_respiratoria: "16",
                saturacion_oxigeno: "98",
                tension_arterial: "120/80",
                // Peso y Talla
                peso: "65",
                talla: "170",
                percentil: "50",
                imc: "22.5",
                // Estado Nutricional
                deficit_zinc: "Normal",
                deficit_acido_folico: "Normal",
                deficit_vitamina_d: "Normal",
                desnutricion: "No",
                obesidad: "No",
                // Región Cefálica
                perimetro_cefalico: "54",
                agudeza_visual: "20/20",
                examen_orl: "Normal, sin alteraciones",
                caries: "No presenta",
                cuello: "Normal, móvil, sin adenopatías",
                // Región Toracoabdominal
                cardio_pulmonar: "Ruidos cardíacos rítmicos, murmullo vesicular conservado",
                abdominal: "Blando, depresible, no doloroso",
                // Región Pélvica
                tanner: "Estadio III",
                extremidades: "Simétricas, pulsos presentes, sin edemas"
            },
            laboratorios: {
                hematies: "5.0",
                hemoglobina: "14.5",
                hematocrito: "43",
                mcv: "88",
                mch: "29",
                mchc: "33",
                rdw: "13"
            },
            complicacionesAgudas: {
                crisisDolor: {
                    fecha: "2024-03-20",
                    dias: "5",
                    intensidad: "8",
                    manejo: "Hospitalización y analgesia",
                    tratamiento: "Morfina + Ketorolaco",
                    huesosAfectados: "Fémur, tibia y peroné"
                },
                infecciones: {
                    germen: "Streptococcus pneumoniae",
                    tratamiento: "Ceftriaxona",
                    dias: "14"
                },
                anemiaAguda: {
                    crisisAplastica: "Presente",
                    manejo: "Transfusión de glóbulos rojos"
                }
            },
            complicacionesCronicas: {
                cerebrales: {
                    vasculopatia_cerebral: "No",
                    infartos_cerebrales_silentes: "No",
                    epilepsia_convulsiones: "No",
                    cefaleas_recurrentes: "No",
                    deficit_cognitivo: "No"
                },
                oculares: {
                    retinopatia_drepanocitica: "No",
                    hemorragias_vitreas: "No",
                    neovascularizacion_retiniana: "No",
                    iritis_uveitis: "No",
                    oclusion_vasos_retinianos: "No"
                },
                cardiacas: {
                    disfuncion_diastolica_vi: "No",
                    sobrecarga_ferrica: "No",
                    trombosis: "No"
                },
                pulmonares: {
                    hipertension_pulmonar: "No",
                    vrt: "N/A",
                    asma_sibilancias: {
                        crisis_por_anio: "0",
                        tratamientos: "Ninguno"
                    },
                    epfc: {
                        hipomexia: "No",
                        saos: "No",
                        tratamiento: "Ninguno"
                    }
                },
                hepaticas: {
                    hepatitis_viral_cronica: "No",
                    esplenomegalia: "No",
                    hiperesplenismo: "No"
                }
            },
            imagenesDiagnosticas: item.data.imagenesDiagnosticas || [],
            tratamientos: item.data.tratamientos || [],
            vacunas: item.data.vacunas || []
        };
    }, [item.data, calculateAge]);

    const { generatePDF } = useGeneratePDF();

    const handleGeneratePDF = async () => {
        const data = generateHistoriaClinicaData();
        await generatePDF(data);
    };

    const [dialogIsOpenPaciente, setIsOpenPaciente] = useState(false)
    const [dialogIsOpenHC, setIsOpenHC] = useState(false)
    const [dialogIsOpenHistoriaClinica, setIsOpenHistoriaClinica] =
        useState(false)
    const openDialogHistoriaClinica = () => setIsOpenHistoriaClinica(true)
    const closeDialogHistoriaClinica = () => setIsOpenHistoriaClinica(false)

    const openDialogPaciente = () => {
        setIsOpenPaciente(true)
    }

    const onDialogClosePaciente = (e: MouseEvent) => {
        console.log('onDialogClosePaciente', e)
        setIsOpenPaciente(false)
    }

    const onDialogCloseHC = (e: MouseEvent) => {
        console.log('onDialogCloseHC', e)
        setIsOpenHC(false)
    }

    const [dialogMessage, setDialogMessage] = useState('')
    const [dialogAction, setDialogAction] = useState(() => () => {})

    const handleClickSeguimiento = async (idPaciente: number) => {
        try {
            const historiaAbierta = await buscarHcOpenById(token, idPaciente)

            if (historiaAbierta) {
                navigate(`/historia-clinica/${idPaciente}?tipo=seguimiento`)
            }
        } catch (error) {
            console.error('Error al buscar historia clínica abierta:', error)
            setDialogMessage(
                'El paciente no tiene historia clínica abierta\n¿desea continuar?',
            )
            setDialogAction(() => () => {
                navigate(`/historia-clinica/${idPaciente}?tipo=inicial`)
            })
            setIsOpenHC(true)
        }
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
                                        value={formatDate(
                                            item.data.fecha_nacimiento,
                                        )}
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
                                    icon={<FaFileMedical size={16} />}
                                    variant="solid"
                                    title=""
                                    onClick={() =>
                                        handleClickSeguimiento(item.data.id)
                                    }
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
                                    <h5 className="text-xl font-semibold mb-4">Historia Clínica del Paciente</h5>
                                    <div className="overflow-x-auto">
                                        <Table>
                                            <Table.THead>
                                                <Table.Tr>
                                                    <Table.Th>Fecha de Historia Clínica</Table.Th>
                                                
                                                    <Table.Th>Opciones</Table.Th>
                                                </Table.Tr>
                                            </Table.THead>
                                            <Table.TBody>
                                                <Table.Tr>
                                                    <Table.Td>22/10/2024</Table.Td>
                                                    <Table.Td>
                                                        <Button 
                                                            icon={<FaDownload size={16} />} 
                                                            variant="solid" 
                                                            onClick={handleGeneratePDF}
                                                        >
                                                            Generar Historia Clínica
                                                        </Button>
                                                    </Table.Td>
                                                </Table.Tr>
                                                <Table.Tr>
                                                    <Table.Td>20/10/2024</Table.Td>
                                                    <Table.Td>
                                                              <Button 
                                                                  icon={<FaDownload size={16} />} 
                                                                  variant="solid" 
                                                                  onClick={handleGeneratePDF}
                                                              >
                                                                  Generar Historia Clínica
                                                              </Button>
                                                    </Table.Td>
                                                </Table.Tr>
                                            </Table.TBody>
                                        </Table>
                                    </div>
                                </div>
                            </Dialog>
                            {/* Dialog tipo consulta */}
                            <Dialog
                                isOpen={dialogIsOpenHC}
                                onClose={onDialogCloseHC}
                                onRequestClose={onDialogCloseHC}
                            >
                                <div className="text-center p-6">
                                    <h5 className="text-lg font-semibold text-gray-900">
                                        {dialogMessage}
                                    </h5>
                                    <div className="flex justify-center space-x-4 mt-6">
                                        <Button
                                            variant="solid"
                                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                                            onClick={() => {
                                                dialogAction()
                                                onDialogCloseHC(
                                                    {} as MouseEvent,
                                                )
                                            }}
                                        >
                                            Continuar
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100"
                                            onClick={onDialogCloseHC}
                                        >
                                            Cancelar
                                        </Button>
                                    </div>
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
                                        <InfoRedPrimaria
                                            data={item.data.redPrimaria}
                                        ></InfoRedPrimaria>
                                    </TabContent>
                                    <TabContent value="acompañante">
                                        <InfoAcompañante
                                            data={item.data.acompaniante}
                                        ></InfoAcompañante>
                                    </TabContent>
                                    <TabContent value="antFamiliar">
                                        <InfoAntecedentes
                                            idPaciente={item.data.id}
                                        ></InfoAntecedentes>
                                    </TabContent>
                                    <TabContent value="antPerinatologicos">
                                        <InfoAntecedentesPerinatologicos
                                            idPaciente={item.data.id}
                                        ></InfoAntecedentesPerinatologicos>
                                    </TabContent>
                                    <TabContent value="vacunas">
                                        <InfoVacunas
                                            idPaciente={item.data.id}
                                        ></InfoVacunas>
                                    </TabContent>
                                    <TabContent value="primeraConsulta">
                                        <InfoDatosIngreso
                                            idPaciente={item.data.id}
                                        ></InfoDatosIngreso>
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
