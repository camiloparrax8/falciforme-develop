/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from '@/components/ui';
import { useEffect, useState } from 'react';
import { FaUpload, FaEye } from 'react-icons/fa'
import SectionTitle from '@/views/common/form/SectionTitle';
import ModalCerebrales from './modals/ModalCerebrales';
import ModalOculares from './modals/ModalOculares';
import { useComplicacionesCronicas } from '@/hooks/useComplicacionesCronicas';
import { useParams } from 'react-router-dom';


function SeccionOne (){
    const iconEye = <FaEye />
    const icon = <FaUpload />;
    const { id_paciente } = useParams();
    const { complicacionData } = useComplicacionesCronicas();

    // Estados para cada modal
    const [dialogIsOpenCerebrales, setDialogIsOpenCerebrales] = useState(false);
    const [dialogIsOpenOculares, setDialogIsOpenOculares] = useState(false);

    // Métodos para abrir y cerrar modales
    const openDialog = (setDialog) => setDialog(true);
    const closeDialog = (setDialog) => {
        setDialog(false);
    };
    const closeModal = () => {
        setDialogIsOpenCerebrales(false)
        setDialogIsOpenOculares(false)
    }

    useEffect(() => {
        const handleEscapeKey = (e) => {
            if (e.key === 'Escape') {
                setDialogIsOpenCerebrales(false)
                setDialogIsOpenOculares(false)
            }
        }
        window.addEventListener('keydown', handleEscapeKey)
        return () => window.removeEventListener('keydown', handleEscapeKey)
    }, [])

    const tieneCerebrales = () => {
        return (
            complicacionData?.vasculopatia_cerebral !== undefined &&
            complicacionData?.vasculopatia_cerebral !== null
        )
    }

    const tieneOculares = () => {
        return (
            complicacionData?.retinopatia_drepanocitica !== undefined &&
            complicacionData?.retinopatia_drepanocitica !== null
        )
    }
    

    return (
        <>
            <SectionTitle text={'Región Cefálica o Superior (Cabeza y Cuello)'} className={'mt-3'} />

            <div className="flex space-x-4">
                <Button
                    variant="solid"
                    icon={tieneCerebrales() ? iconEye : icon}
                    className={`px-4 py-2 ${
                        tieneCerebrales()
                            ? 'bg-green-500 hover:bg-green-600 text-white'
                            : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}
                    onClick={() => openDialog(setDialogIsOpenCerebrales)}
                >
                    <span className="whitespace-nowrap">
                        {tieneCerebrales() ? 'Ver Cerebrales' : 'Cerebrales'}
                    </span>
                </Button>
                <Button
                    variant="solid"
                    icon={tieneOculares() ? iconEye : icon}
                    className={`px-4 py-2 ${
                        tieneOculares()
                            ? 'bg-green-500 hover:bg-green-600 text-white'
                            : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}
                    onClick={() => openDialog(setDialogIsOpenOculares)}
                >
                    <span className="whitespace-nowrap">
                        {tieneOculares() ? 'Ver Oculares' : 'Oculares'}
                    </span>
                </Button>
            </div>

            {/* Modales */}
            <ModalCerebrales
                isOpen={dialogIsOpenCerebrales}
                onClose={closeModal}
                onRequestClose={() => closeDialog(setDialogIsOpenCerebrales)}
            />
            <ModalOculares
                isOpen={dialogIsOpenOculares}
                onClose={closeModal}
                onRequestClose={() => closeDialog(setDialogIsOpenOculares)}
            />
        </>
    )

}

export default SeccionOne;