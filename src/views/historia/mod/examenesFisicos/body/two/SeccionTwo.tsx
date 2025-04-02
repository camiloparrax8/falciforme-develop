import { Button } from '@/components/ui'
import SectionTitle from '@/views/common/form/SectionTitle'
import { useState, useEffect } from 'react'
import { FaUpload, FaEye } from 'react-icons/fa'
import ModalCardiopulmunar from './modals/ModalCardiopulmunar'
import ModalAbdominal from './modals/ModalAbdominal'
import { useExamenFisico } from '@/hooks/useExamenFisico'

export default function SeccionTwo() {
    const icon = <FaUpload />
    const iconEye = <FaEye />

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { idExamenFisico, examenData } = useExamenFisico() // Usar el contexto

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

        const tieneCardiopulmunar = () => {
            return (
                examenData?.cardio_pulmunar !== undefined &&
                examenData?.cardio_pulmunar !== null &&
                examenData?.cardio_pulmunar !== ''
            )
        }

        const tieneAbdominal = () => {
            return (
                examenData?.condicion_abdominal !== undefined &&
                examenData?.condicion_abdominal !== null &&
                examenData?.condicion_abdominal !== ''
            )
        }


    return (
        <>
            <SectionTitle
                text={'Región Toracoabdominal o Media (Tórax y Abdomen)'}
                className={''}
            ></SectionTitle>
            <div className="flex flex-wrap gap-3 mb-6">
                <Button
                    variant="solid"
                    icon={tieneCardiopulmunar() ? iconEye : icon}
                className={`px-4 py-2 ${
                    tieneCardiopulmunar()
                        ? 'bg-green-500 hover:bg-green-600 text-white'
                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
                onClick={() => openDialog(setCardiopulmunar)}
            >
                <span className="whitespace-nowrap">
                    {tieneCardiopulmunar() ? 'Ver Cardio Pulmonar' : 'Cardio Pulmonar'}
                </span>
            </Button>
            <Button
                variant="solid"
                icon={tieneAbdominal() ? iconEye : icon}
                className={`px-4 py-2 ${
                    tieneAbdominal()
                        ? 'bg-green-500 hover:bg-green-600 text-white'
                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
                onClick={() => openDialog(setAbdomen)}
            >
                <span className="whitespace-nowrap">
                        {tieneAbdominal() ? 'Ver Abdomen' : 'Abdomen'}
                    </span>
                </Button>
            </div>

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
