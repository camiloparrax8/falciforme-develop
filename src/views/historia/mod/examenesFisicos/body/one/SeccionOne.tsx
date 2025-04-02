import { Button } from '@/components/ui'
import { useState, useEffect } from 'react'
import { FaUpload } from 'react-icons/fa'
import ModalPerimetroCefalico from './modals/ModalPerimetroCefalico'
import ModalAgudezaVisual from './modals/ModalAgudezaVisual'
import ModalExamenORL from './modals/ModalExamenORL'
import ModalCaries from './modals/ModalCaries'
import ModalCuello from './modals/ModalCuello'
import SectionTitle from '@/views/common/form/SectionTitle'
import { useExamenFisico } from '@/hooks/useExamenFisico'
import { useParams } from 'react-router-dom'

function SeccionOne() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { idExamenFisico } = useExamenFisico()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id_paciente } = useParams()

    const icon = <FaUpload />

    // Estados para cada modal
    const [dialogIsOpenPerimetroCefalico, setDialogIsOpenPerimetroCefalico] =
        useState(false)
    const [dialogIsOpenAgudezaVisual, setDialogIsOpenAgudezaVisual] =
        useState(false)
    const [dialogIsOpenExamenORL, setDialogIsOpenExamenORL] = useState(false)
    const [dialogIsOpenCaries, setDialogIsOpenCaries] = useState(false)
    const [dialogIsOpenCuello, setDialogIsOpenCuello] = useState(false)

    // Métodos para abrir y cerrar modales
    const openDialog = (setDialog) => setDialog(true)
    const closeDialog = (setDialog) => {
        setDialog(false)
    }

    // Función específica para cerrar el modal al insertar un registro
    const closeModal = () => {
        setDialogIsOpenAgudezaVisual(false)
        setDialogIsOpenPerimetroCefalico(false)
        setDialogIsOpenExamenORL(false)
        setDialogIsOpenCaries(false)
        setDialogIsOpenCuello(false)
    }

    // Efecto para cerrar modal con ESC
    useEffect(() => {
        const handleEscapeKey = (e) => {
            if (e.key === 'Escape') {
                // Cerrar todos los modales abiertos
                setDialogIsOpenPerimetroCefalico(false)
                setDialogIsOpenAgudezaVisual(false)
                setDialogIsOpenExamenORL(false)
                setDialogIsOpenCaries(false)
                setDialogIsOpenCuello(false)
            }
        }
        window.addEventListener('keydown', handleEscapeKey)
        return () => window.removeEventListener('keydown', handleEscapeKey)
    }, [])

    return (
        <>
            <SectionTitle
                text={'Región Cefálica o Superior (Cabeza y Cuello)'}
                className={'mt-3'}
            />

            <Button
                variant="solid"
                icon={icon}
                className="m-2"
                onClick={() => openDialog(setDialogIsOpenPerimetroCefalico)}
            >
                Perímetro Cefálico
            </Button>
            <Button
                variant="solid"
                icon={icon}
                className="m-2"
                onClick={() => openDialog(setDialogIsOpenAgudezaVisual)}
            >
                Agudeza Visual
            </Button>
            <Button
                variant="solid"
                icon={icon}
                className="m-2"
                onClick={() => openDialog(setDialogIsOpenExamenORL)}
            >
                Examen ORL
            </Button>
            <Button
                variant="solid"
                icon={icon}
                className="m-2"
                onClick={() => openDialog(setDialogIsOpenCaries)}
            >
                Caries
            </Button>
            <Button
                variant="solid"
                icon={icon}
                className="m-2"
                onClick={() => openDialog(setDialogIsOpenCuello)}
            >
                Cuello
            </Button>

            {/* Modales */}
            <ModalPerimetroCefalico
                isOpen={dialogIsOpenPerimetroCefalico}
                onClose={closeModal}
                onRequestClose={() =>
                    closeDialog(setDialogIsOpenPerimetroCefalico)
                }
            />

            <ModalAgudezaVisual
                isOpen={dialogIsOpenAgudezaVisual}
                onClose={closeModal}
                onRequestClose={() => closeDialog(setDialogIsOpenAgudezaVisual)}
            />

            <ModalExamenORL
                isOpen={dialogIsOpenExamenORL}
                onClose={closeModal}
                onRequestClose={() => closeDialog(setDialogIsOpenExamenORL)}
            />

            <ModalCaries
                isOpen={dialogIsOpenCaries}
                onClose={closeModal}
                onRequestClose={() => closeDialog(setDialogIsOpenCaries)}
            />

            <ModalCuello
                isOpen={dialogIsOpenCuello}
                onClose={closeModal}
                onRequestClose={() => closeDialog(setDialogIsOpenCuello)}
            />
        </>
    )
}

export default SeccionOne
