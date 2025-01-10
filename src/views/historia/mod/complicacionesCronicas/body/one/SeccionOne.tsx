import { Button } from '@/components/ui';
import { useState } from 'react';
import { FaUpload } from 'react-icons/fa';
import SectionTitle from '@/views/common/form/SectionTitle';
import ModalCerebrales from './modals/ModalCerebrales';
import ModalOculares from './modals/ModalOculares';

function SeccionOne (){
    const icon = <FaUpload />;

    // Estados para cada modal
    const [dialogIsOpenCerebrales, setDialogIsOpenCerebrales] = useState(false);
    const [dialogIsOpenOculares, setDialogIsOpenOculares] = useState(false);

    // Métodos para abrir y cerrar modales
    const openDialog = (setDialog) => setDialog(true);
    const closeDialog = (setDialog) => {
        console.log('Modal closed');
        setDialog(false);
    };

    return (
        <>
            <SectionTitle text={'Región Cefálica o Superior (Cabeza y Cuello)'} className={'mt-3'} />

            <Button
                variant="solid"
                icon={icon}
                className="m-2"
                onClick={() => openDialog(setDialogIsOpenCerebrales)}
            >
                Cerebrales
            </Button>
            <Button
                variant="solid"
                icon={icon}
                className="m-2"
                onClick={() => openDialog(setDialogIsOpenOculares)}
            >
                Oculares
            </Button>

            {/* Modales */}
            <ModalCerebrales
                isOpen={dialogIsOpenCerebrales}
                onClose={() => closeDialog(setDialogIsOpenCerebrales)}
                onRequestClose={() => closeDialog(setDialogIsOpenCerebrales)}
            />
            <ModalOculares
                isOpen={dialogIsOpenOculares}
                onClose={() => closeDialog(setDialogIsOpenOculares)}
                onRequestClose={() => closeDialog(setDialogIsOpenOculares)}
            />
        </>
    )

}

export default SeccionOne;