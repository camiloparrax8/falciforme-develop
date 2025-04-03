import { useState, useEffect, useCallback } from 'react'
import SectionTitle from '@/views/common/form/SectionTitle'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import FormModalLaboratorios from '../laboratorios/FormModalLaboratorios'
import { RiStickyNoteAddFill } from 'react-icons/ri'
import { useToken, useSessionUser } from '@/store/authStore'
import { useParams } from 'react-router-dom'
import { obtenerLaboratoriosPorPaciente } from '@/customService/services/laboratorioService'
import Alert from '@/components/ui/Alert'
import { Table } from '@/components/ui'
import Tr from '@/components/ui/Table/Tr'
import TBody from '@/components/ui/Table/TBody'
import Td from '@/components/ui/Table/Td'
import Th from '@/components/ui/Table/Th'
import THead from '@/components/ui/Table/THead'

function FormLaboratorios() {
    const { token } = useToken()
    const { user } = useSessionUser()
    const { id_paciente } = useParams()
    const [dialogIsOpen, setDialogIsOpen] = useState(false)
    const [loading, setLoading] = useState(true)
    const [mensaje, setMensaje] = useState<{
        tipo: 'success' | 'error' | 'info'
        texto: string
    } | null>(null)
    const [mostrarMensaje, setMostrarMensaje] = useState(true)
    const [laboratorios, setLaboratorios] = useState([])

    const cargarLaboratorios = useCallback(async () => {
        try {
            setLoading(true)
            const resultado = await obtenerLaboratoriosPorPaciente(
                token,
                id_paciente,
            )

            if (resultado.status === 'success' && resultado.data) {
                const datosFormateados = Array.isArray(resultado.data)
                    ? resultado.data.map((lab) => ({
                          Fecha: new Date(lab.created_at).toLocaleDateString(),
                          Hematíes: lab.hematies,
                          Hematocritos: lab.hematocritos,
                          MCH: lab.mch,
                          RDW: lab.rdw,
                          Hemoglobina: lab.hemoglobina,
                          MCV: lab.mcv,
                          MCHC: lab.mchc,
                      }))
                    : []
                setLaboratorios(datosFormateados)
            } else {
                setLaboratorios([])
            }
        } catch (error) {
            console.error('Error al cargar laboratorios:', error)
            setMensaje({
                tipo: 'error',
                texto: 'Error al cargar los laboratorios',
            })
        } finally {
            setLoading(false)
        }
    }, [token, id_paciente])

    useEffect(() => {
        cargarLaboratorios()
    }, [cargarLaboratorios])

    const openDialog = () => setDialogIsOpen(true)
    const closeDialog = () => setDialogIsOpen(false)

    const onSubmitModal = async (success = false) => {
        setDialogIsOpen(false)

        if (success) {
            try {
                await cargarLaboratorios()
                setMensaje({
                    tipo: 'success',
                    texto: 'Laboratorio guardado correctamente',
                })
                setMostrarMensaje(true)
            } catch (error) {
                console.error('Error al guardar laboratorio:', error)
                setMensaje({
                    tipo: 'error',
                    texto: 'Error al guardar el laboratorio',
                })
                setMostrarMensaje(true)
            }
        }
    }

    const handleCloseAlert = () => {
        setMostrarMensaje(false)
    }

    return (
        <>
            <SectionTitle
                text="Gestion de Laboratorios"
                className="col-span-1 md:col-span-6"
            />

            {mensaje && mensaje.texto && mostrarMensaje && (
                <div className="mb-4">
                    <Alert
                        showIcon
                        closable
                        title={
                            mensaje.tipo === 'success' ? 'Correcto' : 'Atención'
                        }
                        type={mensaje.tipo === 'success' ? 'success' : 'danger'}
                        duration={2000}
                        onClose={handleCloseAlert}
                    >
                        {mensaje.texto}
                    </Alert>
                </div>
            )}

            <div className="mt-4 mb-4">
                <Button
                    icon={<RiStickyNoteAddFill />}
                    variant="solid"
                    title="Añadir Resultados"
                    onClick={openDialog}
                >
                    Cargar examen
                </Button>
            </div>

            {loading ? (
                <div className="p-4 text-center">Cargando laboratorios...</div>
            ) : laboratorios.length > 0 ? (
                <div className="mt-8 mb-8 p-4 border border-gray-200 rounded-lg">
                    <Table>
                        <THead>
                            <Tr>
                                <Th>Fecha</Th>
                                <Th>Hemoglobina</Th>
                                <Th>Hematocritos</Th>
                                <Th>MCH</Th>
                                <Th>RDW</Th>
                                <Th>Hematíes</Th>
                                <Th>MCV</Th>
                                <Th>MCHC</Th>
                            </Tr>
                        </THead>
                        <TBody>
                            {laboratorios.map((lab, index) => (
                                <Tr key={index}>
                                    <Td>{lab.Fecha}</Td>
                                    <Td>{lab.Hemoglobina} g/dL</Td>
                                    <Td>{lab.Hematocritos}%</Td>
                                    <Td>{lab.MCH} pg</Td>
                                    <Td>{lab.RDW}%</Td>
                                    <Td>{lab.Hematíes} millones/μL</Td>
                                    <Td>{lab.MCV} fL</Td>
                                    <Td>{lab.MCHC} g/dL</Td>
                                </Tr>
                            ))}
                        </TBody>
                    </Table>
                </div>
            ) : (
                <div className="p-4 text-center text-gray-500">
                    No hay laboratorios registrados
                </div>
            )}

            <Dialog
                width={1000}
                isOpen={dialogIsOpen}
                className="overflow-visible"
                onClose={closeDialog}
                onRequestClose={closeDialog}
            >
                <div className="max-h-[80vh] overflow-y-auto">
                    <FormModalLaboratorios
                        eventoForm={onSubmitModal}
                        idPaciente={id_paciente}
                        idUser={user.id.toString()}
                    />
                </div>
            </Dialog>
        </>
    )
}

export default FormLaboratorios
