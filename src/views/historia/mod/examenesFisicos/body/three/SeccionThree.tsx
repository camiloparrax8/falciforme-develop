import { Button } from '@/components/ui'
import { FaUpload, FaEye } from 'react-icons/fa'
import SectionTitle from '@/views/common/form/SectionTitle'
import { useState, useEffect } from 'react'
import ModalExtremidades from './modals/ModalExtremidades'
import ModalTanner from './modals/ModalTanner'
import { useExamenFisico } from '@/hooks/useExamenFisico'

function SeccionThree() {
    const icon = <FaUpload />
    const iconEye = <FaEye />

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { idExamenFisico, examenData } = useExamenFisico()

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

        const tieneTanner = () => {
            return (
                examenData?.tanner !== undefined &&
                examenData?.tanner !== null &&
                examenData?.tanner !== ''
            )
        }

        const tieneExtremidades = () => {
            return (
                (examenData?.extremidades_observacion !== undefined &&
                examenData?.extremidades_observacion !== null &&
                examenData?.extremidades_observacion !== '') ||
                (examenData?.extremidades_estado_piel !== undefined &&
                examenData?.extremidades_estado_piel !== null &&
                examenData?.extremidades_estado_piel !== '') ||
                (Array.isArray(examenData?.extremidades_condicion) &&
                examenData?.extremidades_condicion.length > 0)
            )
        }

    return (
        <>
            <SectionTitle
                text={
                    'Región Pélvica o Inferior (Pelvis y Extremidades Inferiores)'
                }
                className={'mt-3'}
            ></SectionTitle>
            <div className="flex flex-wrap gap-3 mb-6">
            <Button
                variant="solid"
                icon={tieneTanner() ? iconEye : icon}
                className={`px-4 py-2 ${
                    tieneTanner()
                        ? 'bg-green-500 hover:bg-green-600 text-white'
                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
                onClick={() => openDialog(setTanner)}
            >
                <span className="whitespace-nowrap">
                    {tieneTanner() ? 'Ver Tanner' : 'Tanner (Desarrollo)'}
                </span>
            </Button>
            <Button
                variant="solid"
                icon={tieneExtremidades() ? iconEye : icon}
                className={`px-4 py-2 ${
                    tieneExtremidades()
                        ? 'bg-green-500 hover:bg-green-600 text-white'
                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
                onClick={() => openDialog(setExtremidades)}
            >
                <span className="whitespace-nowrap">
                    {tieneExtremidades() ? 'Ver Extremidades' : 'Extremidades'}
                </span>
            </Button>
            </div>

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
