import { useState, useEffect, useCallback } from 'react'
import SectionTitle from '@/views/common/form/SectionTitle'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import FormModalLaboratorios from '@/views/historia/mod/laboratorios/FormModalLaboratorios'
import { RiStickyNoteAddFill } from 'react-icons/ri'
import { useToken, useSessionUser } from '@/store/authStore'
import { useParams } from 'react-router-dom'
import {
    obtenerLaboratoriosPorPaciente,
    eliminarLogicamenteLaboratorio,
} from '@/customService/services/laboratorioService'
import Alert from '@/components/ui/Alert'
import TableCustom from '@/views/common/TableCustom'

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

    const header = [
        'Registro',
        'Fecha',
        'Hemoglobina',
        'Hematíes',
        'Hematocritos',
        'MCV',
        'MCH',
        'MCHC',
        'RDW',
    ]

    const cargarLaboratorios = useCallback(async () => {
        try {
            setLoading(true)
            const resultado = await obtenerLaboratoriosPorPaciente(
                token,
                id_paciente,
            )

            if (resultado.status === 'success' && resultado.data) {
                const datosFormateados = Array.isArray(resultado.data)
                    ? resultado.data
                          .filter((lab) => !lab.is_deleted)
                          .map((lab, index) => ({
                              id: lab.id,
                              Registro: index + 1,
                              Fecha: new Date(
                                  lab.created_at,
                              ).toLocaleDateString(),
                              Hemoglobina: `${lab.hemoglobina} g/dL`,
                              Hematíes: `${lab.hematies} millones/μL`,
                              Hematocritos: `${lab.hematocritos} %`,
                              MCV: `${lab.mcv} fL`,
                              MCH: `${lab.mch} pg`,
                              MCHC: `${lab.mchc} g/dL`,
                              RDW: `${lab.rdw} %`,
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

    const handleEliminarLaboratorio = async (laboratorio) => {
        try {
            setLoading(true)
            const resultado = await eliminarLogicamenteLaboratorio(
                token,
                laboratorio.id,
            )

            if (resultado.status === 'success') {
                await cargarLaboratorios()
                setMensaje({
                    tipo: 'success',
                    texto: 'Laboratorio eliminado correctamente',
                })
                setMostrarMensaje(true)
            } else {
                setMensaje({
                    tipo: 'error',
                    texto:
                        resultado.message || 'Error al eliminar el laboratorio',
                })
                setMostrarMensaje(true)
            }
        } catch (error) {
            console.error('Error al eliminar laboratorio:', error)
            setMensaje({
                tipo: 'error',
                texto: 'Error al eliminar el laboratorio',
            })
            setMostrarMensaje(true)
        } finally {
            setLoading(false)
        }
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
                    <TableCustom
                        data={laboratorios}
                        header={header}
                        className="w-full"
                        showDeleteOption={true}
                        onDelete={handleEliminarLaboratorio}
                    />
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
