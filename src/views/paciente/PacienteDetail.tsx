import { Card, Tabs } from '@/components/ui'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import Tooltip from '@/components/ui/Tooltip'
import { useState, type MouseEvent } from 'react'
import {
    buscarHcOpenById,
    obtenerHistoriasClinicasPorPaciente,
} from '@/customService/services/historiaClinicaService'
import { useToken } from '@/store/authStore'
import { useNavigate } from 'react-router-dom'
import { TbInfoSquareRoundedFilled } from 'react-icons/tb'
import InfoRedPrimaria from './add/RedPrimaria/InfoRedPrimaria'
import InfoAcompañante from './add/Acompañante/InfoAcompañante'
import InfoAntecedentes from './add/AntecedentesPerinatologicos/InfoAntecedentes'
import InfoAntecedentesPerinatologicos from './add/AntecedentesPerinatologicos/InfoAntecedentesPerinatologicos'
import InfoVacunas from './add/Vacunas/InfoVacunas'
import InfoDatosIngreso from './add/Ingreso/InfoDatosIngreso'
import Field from '@/views/common/Field'
import Section from '@/views/common/Section'
import {
    FaFileMedical,
    FaClinicMedical,
    FaFilePdf,
    FaEdit,
} from 'react-icons/fa'
import { useFormattedDate } from '@/hooks/useFormattedDate'
import { useCalculateAge } from '@/hooks/useCalculateAge'
import { Table } from '@/components/ui/Table'
import { Spinner } from '@/components/ui/Spinner'
import { Badge } from '@/components/ui/Badge'
import { useGeneratePDF } from '@/hooks/useGeneratePDF'
import EditAntPerinatologicos from './add/AntecedentesPerinatologicos/EditAntPerinatologicos'
import EditEstadoHBS from './add/AntencedentesFamiliares/EditEstadoHBS'
import EditEsquemaVacunacion from './add/Vacunas/EditEsquemaVacunacion'
import EditPrimeraConsulta from './add/Ingreso/EditPrimeraConsulta'

const { TabNav, TabList, TabContent } = Tabs

export const PacienteDetail = ({ item }) => {
    const { token } = useToken()
    const navigate = useNavigate()
    const { formatDate } = useFormattedDate()
    const { calculateAge } = useCalculateAge()
    const { generatePDF } = useGeneratePDF()

    const handleGeneratePDF = async (historiaId: number) => {
        // Buscar la historia clínica por ID en el array de historias
        const historiaClinica = historiasClinicas.find(
            (historia) => historia.id === historiaId,
        )

        if (!historiaClinica) {
            console.error('Historia clínica no encontrada')
            return
        }

        // Preparar los datos para el PDF incluyendo información del paciente
        const datosParaPDF = {
            paciente: {
                ...item.data,
                nombre: `${item.data.nombre} ${item.data.apellido}`,
                edad: calculateAge(item.data.fecha_nacimiento),
            },
            ...historiaClinica,
        }

        // Abrir una nueva ventana para el PDF
        const newWindow = window.open('', '_blank')
        // Generar el PDF con los datos completos
        await generatePDF(datosParaPDF, newWindow)
    }

    const [dialogIsOpenPaciente, setIsOpenPaciente] = useState(false)
    const [dialogIsOpenHC, setIsOpenHC] = useState(false)
    const [dialogIsOpenHistoriaClinica, setIsOpenHistoriaClinica] =
        useState(false)
    const [dialogIsOpenEditar, setIsOpenEditar] = useState(false)
    const [historiasClinicas, setHistoriasClinicas] = useState([])
    const [loadingHistorias, setLoadingHistorias] = useState(false)

    const openDialogHistoriaClinica = () => {
        setIsOpenHistoriaClinica(true)
        cargarHistoriasClinicas()
    }

    const closeDialogHistoriaClinica = () => setIsOpenHistoriaClinica(false)

    const openDialogPaciente = () => {
        setIsOpenPaciente(true)
    }

    const openDialogEditar = () => {
        setIsOpenEditar(true)
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const onDialogClosePaciente = (e: MouseEvent) => {
        setIsOpenPaciente(false)
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const onDialogCloseHC = (e: MouseEvent) => {
        setIsOpenHC(false)
    }

    const closeDialogEditar = () => setIsOpenEditar(false)

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

    const cargarHistoriasClinicas = async () => {
        if (!item.data.id) return

        setLoadingHistorias(true)
        try {
            const response = await obtenerHistoriasClinicasPorPaciente(
                token,
                item.data.id,
            )
            if (response && response.length > 0) {
                // Ordenar las historias clínicas por fecha de creación (descendente)
                const historiasOrdenadas = [...response].sort((a, b) => {
                    const fechaA = new Date(a.fecha_creacion).getTime()
                    const fechaB = new Date(b.fecha_creacion).getTime()
                    return fechaB - fechaA // Orden descendente (más reciente primero)
                })
                setHistoriasClinicas(historiasOrdenadas)
            } else {
                setHistoriasClinicas([])
            }
        } catch (error) {
            console.error('Error al cargar historias clínicas:', error)
            setHistoriasClinicas([])
        } finally {
            setLoadingHistorias(false)
        }
    }

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
                                        value={`${calculateAge(item.data.fecha_nacimiento)}`}
                                    />
                                </div>
                            </div>

                            {/* Botón centrado */}
                            <div className="flex mt-4 gap-x-1">
                                <Tooltip title="Ver información del paciente">
                                    <Button
                                        variant="solid"
                                        icon={hc}
                                        onClick={() => openDialogPaciente()}
                                    ></Button>
                                </Tooltip>
                                <Tooltip title="Ver historias clínicas">
                                    <Button
                                        variant="solid"
                                        icon={<FaClinicMedical />}
                                        onClick={() =>
                                            openDialogHistoriaClinica()
                                        }
                                    ></Button>
                                </Tooltip>

                                <Tooltip title="Iniciar nueva historia clínica">
                                    <Button
                                        icon={<FaFileMedical size={16} />}
                                        variant="solid"
                                        onClick={() =>
                                            handleClickSeguimiento(item.data.id)
                                        }
                                    />
                                </Tooltip>

                                <Tooltip title="Editar información del paciente">
                                    <Button
                                        icon={<FaEdit size={16} />}
                                        variant="solid"
                                        onClick={openDialogEditar}
                                    />
                                </Tooltip>
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
                                width={1000}
                                height={500}
                                onClose={closeDialogHistoriaClinica}
                                onRequestClose={closeDialogHistoriaClinica}
                            >
                                <div className="flex flex-col h-full space-y-4">
                                    <h5 className="text-xl font-semibold mb-4">
                                        Historia Clínica del Paciente
                                    </h5>
                                    <div className="overflow-x-auto">
                                        {loadingHistorias ? (
                                            <div className="flex justify-center items-center h-24">
                                                <Spinner size={40} />
                                            </div>
                                        ) : historiasClinicas.length === 0 ? (
                                            <div className="text-center py-4 text-gray-500">
                                                No hay historias clínicas
                                                disponibles para este paciente.
                                            </div>
                                        ) : (
                                            <Table>
                                                <Table.THead>
                                                    <Table.Tr>
                                                        <Table.Th>
                                                            Usuario Creador
                                                        </Table.Th>
                                                        <Table.Th>
                                                            Fecha de Creación
                                                        </Table.Th>
                                                        <Table.Th>
                                                            Usuario Finalizador
                                                        </Table.Th>
                                                        <Table.Th>
                                                            Fecha de
                                                            Finalización
                                                        </Table.Th>
                                                        <Table.Th>
                                                            Estado
                                                        </Table.Th>
                                                        <Table.Th>PDF</Table.Th>
                                                    </Table.Tr>
                                                </Table.THead>
                                                <Table.TBody>
                                                    {historiasClinicas.map(
                                                        (historia) => (
                                                            <Table.Tr
                                                                key={
                                                                    historia.id
                                                                }
                                                            >
                                                                <Table.Td>
                                                                    {historia
                                                                        .usuario_creador
                                                                        ?.nombres &&
                                                                    historia
                                                                        .usuario_creador
                                                                        ?.apellidos
                                                                        ? `${historia.usuario_creador.nombres} ${historia.usuario_creador.apellidos}`
                                                                        : historia.id_usuario
                                                                          ? `ID: ${historia.id_usuario}`
                                                                          : 'No disponible'}
                                                                </Table.Td>
                                                                <Table.Td>
                                                                    {new Date(
                                                                        historia.fecha_creacion,
                                                                    ).toLocaleDateString(
                                                                        'es-ES',
                                                                    )}
                                                                </Table.Td>
                                                                <Table.Td>
                                                                    {historia
                                                                        .usuario_finalizador
                                                                        ?.nombres &&
                                                                    historia
                                                                        .usuario_finalizador
                                                                        ?.apellidos
                                                                        ? `${historia.usuario_finalizador.nombres} ${historia.usuario_finalizador.apellidos}`
                                                                        : historia.id_user_update
                                                                          ? `ID: ${historia.id_user_update}`
                                                                          : historia.estado
                                                                            ? ''
                                                                            : ''}
                                                                </Table.Td>
                                                                <Table.Td>
                                                                    {historia.estado
                                                                        ? ''
                                                                        : historia.updated_at
                                                                          ? new Date(
                                                                                historia.updated_at,
                                                                            ).toLocaleDateString(
                                                                                'es-ES',
                                                                            )
                                                                          : 'No disponible'}
                                                                </Table.Td>
                                                                <Table.Td>
                                                                    <Badge
                                                                        className={
                                                                            historia.estado
                                                                                ? 'bg-emerald-500'
                                                                                : 'bg-red-500'
                                                                        }
                                                                        content={
                                                                            historia.estado
                                                                                ? 'Abierta'
                                                                                : 'Cerrada'
                                                                        }
                                                                    />
                                                                </Table.Td>
                                                                <Table.Td>
                                                                    <Button
                                                                        icon={
                                                                            <FaFilePdf
                                                                                size={
                                                                                    16
                                                                                }
                                                                            />
                                                                        }
                                                                        variant="solid"
                                                                        onClick={() =>
                                                                            handleGeneratePDF(
                                                                                historia.id,
                                                                            )
                                                                        }
                                                                    ></Button>
                                                                </Table.Td>
                                                            </Table.Tr>
                                                        ),
                                                    )}
                                                </Table.TBody>
                                            </Table>
                                        )}
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
                            {/* Dialog de edición */}
                            <Dialog
                                isOpen={dialogIsOpenEditar}
                                width={1200}
                                height={550}
                                onClose={closeDialogEditar}
                                onRequestClose={closeDialogEditar}
                            >
                                <div className="flex flex-col h-full">
                                    <h5 className="mb-4">
                                        Editar información del paciente
                                    </h5>
                                    <Tabs
                                        defaultValue="datosBasicos"
                                        className="flex-1 flex flex-col"
                                    >
                                        <TabList className="flex flex-wrap space-x-4 border-b pb-2 overflow-hidden">
                                            <TabNav
                                                value="datosBasicos"
                                                className="cursor-pointer"
                                            >
                                                Datos Básicos
                                            </TabNav>
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
                                                value="antPerinatologicos"
                                                className="cursor-pointer"
                                            >
                                                Perinatológicos
                                            </TabNav>
                                            <TabNav
                                                value="estadoHbs"
                                                className="cursor-pointer"
                                            >
                                                Estado HBS
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
                                        <div className="overflow-y-auto p-4 flex-1">
                                            {/* Contenido de cada pestaña para edición */}
                                            <TabContent value="datosBasicos">
                                                {/* Aquí se incluirá el formulario de edición de datos básicos */}
                                                <p>
                                                    Formulario de edición de
                                                    datos básicos del paciente
                                                </p>
                                            </TabContent>
                                            <TabContent value="redPrimaria">
                                                {/* Formulario de red primaria */}
                                                <p>
                                                    Formulario de edición de red
                                                    primaria
                                                </p>
                                            </TabContent>
                                            <TabContent value="acompañante">
                                                {/* Formulario de acompañante */}
                                                <p>
                                                    Formulario de edición de
                                                    acompañante
                                                </p>
                                            </TabContent>
                                            <TabContent value="antPerinatologicos">
                                                {/* Formulario de antecedentes perinatológicos */}
                                                <EditAntPerinatologicos
                                                    idPaciente={item.data.id}
                                                    onClose={closeDialogEditar}
                                                />
                                            </TabContent>
                                            <TabContent value="estadoHbs">
                                                {/* Formulario de estado HBS */}
                                                <EditEstadoHBS
                                                    idPaciente={item.data.id}
                                                    onClose={closeDialogEditar}
                                                />
                                            </TabContent>
                                            <TabContent value="vacunas">
                                                {/* Formulario de vacunas */}
                                                <EditEsquemaVacunacion
                                                    idPaciente={item.data.id}
                                                    onClose={closeDialogEditar}
                                                />
                                            </TabContent>
                                            <TabContent value="primeraConsulta">
                                                {/* Formulario de primera consulta */}
                                                <EditPrimeraConsulta
                                                    idPaciente={item.data.id}
                                                    onClose={closeDialogEditar}
                                                />
                                            </TabContent>
                                        </div>
                                    </Tabs>
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
                                        {item.data.redPrimaria ? (
                                            <InfoRedPrimaria
                                                data={item.data.redPrimaria}
                                            />
                                        ) : (
                                            <div className="text-gray-500 italic">
                                                No hay información de red
                                                primaria registrada.
                                            </div>
                                        )}
                                    </TabContent>
                                    <TabContent value="acompañante">
                                        {item.data.acompaniante ? (
                                            <InfoAcompañante
                                                data={item.data.acompaniante}
                                            />
                                        ) : (
                                            <div className="text-gray-500 italic">
                                                No hay información de
                                                acompañante registrada.
                                            </div>
                                        )}
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
