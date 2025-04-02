import { Button } from '@/components/ui'
import SectionTitle from '@/views/common/form/SectionTitle'
import { useState, useEffect } from 'react'
import { FaUpload } from 'react-icons/fa'
import ModalCardiopulmunar from './modals/ModalCardiopulmunar'
import ModalAbdominal from './modals/ModalAbdominal'
import { useExamenFisico } from '@/hooks/useExamenFisico'

export default function SeccionTwo() {
    const icon = <FaUpload />

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { idExamenFisico } = useExamenFisico() // Usar el contexto

    // Estados para cada modal
    const [Cardiopulmunar, setCardiopulmunar] = useState(false)
    const [Abdomen, setAbdomen] = useState(false)

    // Métodos para abrir y cerrar modales
    const openDialog = (setDialog) => setDialog(true)
    const closeDialog = (setDialog) => {
        setDialog(false)
    }

    const closeModal = () => {
        setCardiopulmunar(false)
        setAbdomen(false)
    }

        // Efecto para cerrar modal con ESC
        useEffect(() => {
        const handleEscapeKey = (e) => {
            if (e.key === 'Escape') {
                // Cerrar todos los modales abiertos
                setCardiopulmunar(false)
                setAbdomen(false)
            }
        }
        window.addEventListener('keydown', handleEscapeKey)
            return () => window.removeEventListener('keydown', handleEscapeKey)
        }, [])

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
                Cardio Pulmonar
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
                onClose={closeModal}
                onRequestClose={() => closeDialog(setCardiopulmunar)}
            ></ModalCardiopulmunar>
            <ModalAbdominal
                isOpen={Abdomen}
                onClose={closeModal}
                onRequestClose={() => closeDialog(setAbdomen)}
            ></ModalAbdominal>
        </>
    )
}
