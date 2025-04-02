import { Button } from '@/components/ui'
import { FaUpload } from 'react-icons/fa'
import SectionTitle from '@/views/common/form/SectionTitle'
import { useState, useEffect } from 'react'
import ModalExtremidades from './modals/ModalExtremidades'
import ModalTanner from './modals/ModalTanner'
import { useExamenFisico } from '@/hooks/useExamenFisico'

function SeccionThree() {
    const icon = <FaUpload />

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { idExamenFisico } = useExamenFisico()

    // Estados para cada modal
    const [tanner, setTanner] = useState(false)
    const [extremidades, setExtremidades] = useState(false)

    // Métodos para abrir y cerrar modales
    const openDialog = (setDialog) => setDialog(true)
    const closeDialog = (setDialog) => {
        setDialog(false)
    }

        // Función específica para cerrar el modal al insertar un registro
        const closeModal = () => {
        setTanner(false)
        setExtremidades(false)
    }

        // Efecto para cerrar modal con ESC
        useEffect(() => {
            const handleEscapeKey = (e) => {
            if (e.key === 'Escape') {
                // Cerrar todos los modales abiertos
                setTanner(false)
                setExtremidades(false)
            }
            }
            window.addEventListener('keydown', handleEscapeKey)
            return () => window.removeEventListener('keydown', handleEscapeKey)
        }, [])

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
                onClose={() => closeModal()}
                onRequestClose={() => closeDialog(setExtremidades)}
            ></ModalExtremidades>
            <ModalTanner
                isOpen={tanner}
                onClose={() => closeModal()}
                onRequestClose={() => closeDialog(setTanner)}
            ></ModalTanner>
        </>
    )
}

export default SeccionThree
