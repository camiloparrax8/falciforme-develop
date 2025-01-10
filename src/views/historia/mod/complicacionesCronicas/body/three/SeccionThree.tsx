import { Button } from '@/components/ui';
import { useState } from 'react';
import { FaUpload } from 'react-icons/fa';
import SectionTitle from '@/views/common/form/SectionTitle';
import ModalGenitourinario from './modals/ModalGenitourinario';
import ModalOseas from './modals/ModalOseas';

function SeccionTres(){
    const icon = <FaUpload />

    // Estados para cada modal
    const [dialogIsOpenGenitoUrinario, setDialogIsOpenGenitoUrinario] = useState(false);
    const [dialogIsOpenOseas, setDialogIsOpenOseas] = useState(false);

    // Métodos para abrir y cerrar modales
    const openDialog = (setDialog) => setDialog(true);
    const closeDialog = (setDialog) => {
        console.log('Modal closed');
        setDialog(false);
    };

    return (
        <>
            <SectionTitle text={'Región Genital y Urinaria'} className={'mt-3'} />
            <Button
            variant="solid"
            icon={icon}
            className="m-2"
            onClick={() => openDialog(setDialogIsOpenGenitoUrinario)}
            >
                Genitourinario
            </Button>
            <Button
            variant="solid"
            icon={icon}
            className="m-2"
            onClick={() => openDialog(setDialogIsOpenOseas)}       
            >
                Oseas
            </Button>

            {/* Modales */}

            <ModalGenitourinario
                isOpen={dialogIsOpenGenitoUrinario}
                onClose={() => closeDialog(setDialogIsOpenGenitoUrinario)}
                onRequestClose={() => closeDialog(setDialogIsOpenGenitoUrinario)}
            />

            <ModalOseas
                isOpen={dialogIsOpenOseas}
                onClose={() => closeDialog(setDialogIsOpenOseas)}
                onRequestClose={() => closeDialog(setDialogIsOpenOseas)}
            />
        </>
    )
}

export default SeccionTres;