import { Button } from '@/components/ui'
import { FaUpload } from 'react-icons/fa'
import SectionTitle from '@/views/common/form/SectionTitle'
import { useState } from 'react'
import ModalExtremidades from './modals/ModalExtremidades'
import ModalTanner from './modals/ModalTanner'
import { useExamenFisico } from '@/hooks/useExamenFisico'

function SeccionThree() {
    const icon = <FaUpload />

    const { idExamenFisico } = useExamenFisico() // Usar el contexto
    console.log('ID del examen físico en SeccionThree:', idExamenFisico)

    // Estados para cada modal
    const [tanner, setTanner] = useState(false)
    const [extremidades, setExtremidades] = useState(false)

    // Métodos para abrir y cerrar modales
    const openDialog = (setDialog) => setDialog(true)
    const closeDialog = (setDialog) => {
        console.log('Modal closed')
        setDialog(false)
    }

    return (
        <>
            <SectionTitle
                text={
                    'Región Pélvica o Inferior (Pelvis y Extremidades Inferiores)'
                }
                className={'mt-3'}
            ></SectionTitle>
            <Button
                variant="solid"
                icon={icon}
                className="m-2"
                onClick={() => openDialog(setTanner)}
            >
                Tanner (Desarrollo)
            </Button>
            <Button
                variant="solid"
                icon={icon}
                className="m-2"
                onClick={() => openDialog(setExtremidades)}
            >
                Extremidades
            </Button>
            <ModalExtremidades
                isOpen={extremidades}
                onClose={() => closeDialog(setExtremidades)}
                onRequestClose={() => closeDialog(setExtremidades)}
            ></ModalExtremidades>
            <ModalTanner
                isOpen={tanner}
                onClose={() => closeDialog(setTanner)}
                onRequestClose={() => closeDialog(setTanner)}
            ></ModalTanner>
        </>
    )
}

export default SeccionThree
