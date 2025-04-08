import { Button } from '@/components/ui';
import { useState, useEffect } from 'react';
import { FaUpload, FaEye } from 'react-icons/fa';
import SectionTitle from '@/views/common/form/SectionTitle';
import ModalGenitourinario from './modals/ModalGenitourinario';
import ModalOseas from './modals/ModalOseas';
import { useComplicacionesCronicas } from '@/hooks/useComplicacionesCronicas';

function SeccionTres(){
    const iconEye = <FaEye />
    const icon = <FaUpload />;
    const { complicacionData } = useComplicacionesCronicas();

    // Estados para cada modal
    const [dialogIsOpenGenitoUrinario, setDialogIsOpenGenitoUrinario] = useState(false);
    const [dialogIsOpenOseas, setDialogIsOpenOseas] = useState(false);

    // Métodos para abrir y cerrar modales
    const openDialog = (setDialog) => setDialog(true);
    const closeDialog = (setDialog) => {
        console.log('Modal closed');
        setDialog(false);
    };
    
    const closeModal = () => {
        setDialogIsOpenGenitoUrinario(false);
        setDialogIsOpenOseas(false);
    }

    // Efecto para cerrar modal con ESC
    useEffect(() => {
        const handleEscapeKey = (e) => {
            if (e.key === 'Escape') {
                setDialogIsOpenGenitoUrinario(false);
                setDialogIsOpenOseas(false);
            }
        }
        window.addEventListener('keydown', handleEscapeKey);
        return () => window.removeEventListener('keydown', handleEscapeKey);
    }, []);

    // Funciones para verificar existencia de datos
    const tieneGenitourinario = () => {
        return (
            complicacionData?.nefropatia !== undefined &&
            complicacionData?.nefropatia !== null
        );
    }

    const tieneOseas = () => {
        return (
            complicacionData?.osteonecrosis !== undefined &&
            complicacionData?.osteonecrosis !== null
        );
    }

    return (
        <>
            <SectionTitle text={'Región Genital y Urinaria'} className={'mt-3'} />
            <div className="flex flex-wrap gap-4">
                <Button
                    variant="solid"
                    icon={tieneGenitourinario() ? iconEye : icon}
                    className={`px-4 py-2 ${
                        tieneGenitourinario()
                            ? 'bg-green-500 hover:bg-green-600 text-white'
                            : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}
                    onClick={() => openDialog(setDialogIsOpenGenitoUrinario)}
                >
                    <span className="whitespace-nowrap">
                        {tieneGenitourinario() ? 'Ver Genitourinario' : 'Genitourinario'}
                    </span>
                </Button>
                <Button
                    variant="solid"
                    icon={tieneOseas() ? iconEye : icon}
                    className={`px-4 py-2 ${
                        tieneOseas()
                            ? 'bg-green-500 hover:bg-green-600 text-white'
                            : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}
                    onClick={() => openDialog(setDialogIsOpenOseas)}
                >
                    <span className="whitespace-nowrap">
                        {tieneOseas() ? 'Ver Oseas' : 'Oseas'}
                    </span>
                </Button>
            </div>

            {/* Modales */}
            <ModalGenitourinario
                isOpen={dialogIsOpenGenitoUrinario}
                onClose={closeModal}
                onRequestClose={() => closeDialog(setDialogIsOpenGenitoUrinario)}
            />

            <ModalOseas
                isOpen={dialogIsOpenOseas}
                onClose={closeModal}
                onRequestClose={() => closeDialog(setDialogIsOpenOseas)}
            />
        </>
    )
}

export default SeccionTres;