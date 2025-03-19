import { Button } from '@/components/ui'
import SectionTitle from '@/views/common/form/SectionTitle'
import { useState } from 'react'
import { FaUpload } from 'react-icons/fa'
import ModalCardiopulmunar from './modals/ModalCardiopulmunar'
import ModalAbdominal from './modals/ModalAbdominal'
import { useExamenFisico } from '@/hooks/useExamenFisico'

export default function SeccionTwo() {
    const icon = <FaUpload />

    const { idExamenFisico } = useExamenFisico() // Usar el contexto
    console.log('ID del examen físico en SeccionTwo:', idExamenFisico)

    // Estados para cada modal
    const [Cardiopulmunar, setCardiopulmunar] = useState(false)
    const [Abdomen, setAbdomen] = useState(false)

    // Métodos para abrir y cerrar modales
    const openDialog = (setDialog) => setDialog(true)
    const closeDialog = (setDialog) => {
        console.log('Modal closed')
        setDialog(false)
    }

    return (
        <>
            <SectionTitle
                text={'Región Toracoabdominal o Media (Tórax y Abdomen)'}
                className={''}
            ></SectionTitle>
            <Button
                variant="solid"
                icon={icon}
                className="m-2"
                onClick={() => openDialog(setCardiopulmunar)}
            >
                Cardio Pulmunar
            </Button>
            <Button
                variant="solid"
                icon={icon}
                className="m-2"
                onClick={() => openDialog(setAbdomen)}
            >
                Abdominal
            </Button>

            <ModalCardiopulmunar
                isOpen={Cardiopulmunar}
                onClose={() => closeDialog(setCardiopulmunar)}
                onRequestClose={() => closeDialog(setCardiopulmunar)}
            ></ModalCardiopulmunar>
            <ModalAbdominal
                isOpen={Abdomen}
                onClose={() => closeDialog(setAbdomen)}
                onRequestClose={() => closeDialog(setAbdomen)}
            ></ModalAbdominal>
        </>
    )
}
