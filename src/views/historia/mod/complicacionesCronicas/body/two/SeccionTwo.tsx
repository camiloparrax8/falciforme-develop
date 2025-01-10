import { Button } from '@/components/ui';
import { useState } from 'react';
import { FaUpload } from 'react-icons/fa';
import SectionTitle from '@/views/common/form/SectionTitle';
import ModalCardiacas from './modals/ModalCardiacas';
import ModalPulmonares from './modals/ModalPulmonares';
import ModalHepatico from './modals/ModalHepatico';

function SeccionTwo (){
    const icon = <FaUpload />;

    // Estados para cada modal
    const [dialogIsOpenCardiacas, setDialogIsOpenCardiacas] = useState(false);
    const [dialogIsOpenPulmonar, setDialogIsOpenPulmonar] = useState(false);
    const [dialogIsOpenHepatica, setDialogIsOpenHepatica] = useState(false);

    // Métodos para abrir y cerrar modales
    const openDialog = (setDialog) => setDialog(true);
    const closeDialog = (setDialog) => {
        console.log('Modal closed');
        setDialog(false);
    };

    return (
        <>
            <SectionTitle text={'Región Toracoabdominal o Media (Tórax y Abdomen)'} className={'mt-3'} />
            <div className="flex flex-wrap gap-4">
                <Button
                    variant="solid"
                    icon={icon}
                    className="m-2"
                    onClick={() => openDialog(setDialogIsOpenCardiacas)}
                >
                    Cardíacas
                </Button>
                <Button
                    variant="solid"
                    icon={icon}
                    className="m-2"
                    onClick={() => openDialog(setDialogIsOpenPulmonar)}
                >
                    Pulmonares
                </Button>
                <Button
                    variant="solid"
                    icon={icon}
                    className="m-2"
                    onClick={() => openDialog(setDialogIsOpenHepatica)}
                >
                    Hepáticas
                </Button>

            {/* Modales */}

            <ModalCardiacas
                isOpen={dialogIsOpenCardiacas}
                onClose={() => closeDialog(setDialogIsOpenCardiacas)}
                onRequestClose={() => closeDialog(setDialogIsOpenCardiacas)}
            />

            <ModalPulmonares
                isOpen={dialogIsOpenPulmonar}
                onClose={() => closeDialog(setDialogIsOpenPulmonar)}
                onRequestClose={() => closeDialog(setDialogIsOpenPulmonar)}
            />

            <ModalHepatico
                isOpen={dialogIsOpenHepatica}
                onClose={() => closeDialog(setDialogIsOpenHepatica)}
                onRequestClose={() => closeDialog(setDialogIsOpenHepatica)}
            />
            </div>
        </>
    )
}

export default SeccionTwo;