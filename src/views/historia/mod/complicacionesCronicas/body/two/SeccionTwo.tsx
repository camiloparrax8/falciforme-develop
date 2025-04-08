import { Button } from '@/components/ui';
import { useState, useEffect } from 'react';
import { FaUpload, FaEye } from 'react-icons/fa';
import SectionTitle from '@/views/common/form/SectionTitle';
import ModalCardiacas from './modals/ModalCardiacas';
import ModalPulmonares from './modals/ModalPulmonares';
import ModalHepatico from './modals/ModalHepatico';
import { useComplicacionesCronicas } from '@/hooks/useComplicacionesCronicas';

function SeccionTwo (){
    const iconEye = <FaEye />
    const icon = <FaUpload />;
    const { complicacionData } = useComplicacionesCronicas();

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
    
    const closeModal = () => {
        setDialogIsOpenCardiacas(false);
        setDialogIsOpenPulmonar(false);
        setDialogIsOpenHepatica(false);
    }

    // Efecto para cerrar modal con ESC
    useEffect(() => {
        const handleEscapeKey = (e) => {
            if (e.key === 'Escape') {
                setDialogIsOpenCardiacas(false);
                setDialogIsOpenPulmonar(false);
                setDialogIsOpenHepatica(false);
            }
        }
        window.addEventListener('keydown', handleEscapeKey);
        return () => window.removeEventListener('keydown', handleEscapeKey);
    }, []);

    // Funciones para verificar existencia de datos
    const tieneCardiacas = () => {
        return (
            complicacionData?.disfuncion_diastolica_vii !== undefined &&
            complicacionData?.disfuncion_diastolica_vii !== null
        );
    }

    const tienePulmonares = () => {
        return (
            complicacionData?.hipertension_pulmonar !== undefined &&
            complicacionData?.hipertension_pulmonar !== null
        );
    }

    const tieneHepatico = () => {
        return (
            complicacionData?.hepatitis_viral_cronica !== undefined &&
            complicacionData?.hepatitis_viral_cronica !== null
        );
    }

    return (
        <>
            <SectionTitle text={'Región Toracoabdominal o Media (Tórax y Abdomen)'} className={'mt-3'} />
            <div className="flex flex-wrap gap-4">
                <Button
                    variant="solid"
                    icon={tieneCardiacas() ? iconEye : icon}
                    className={`px-4 py-2 ${
                        tieneCardiacas()
                            ? 'bg-green-500 hover:bg-green-600 text-white'
                            : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}
                    onClick={() => openDialog(setDialogIsOpenCardiacas)}
                >
                    <span className="whitespace-nowrap">
                        {tieneCardiacas() ? 'Ver Cardíacas' : 'Cardíacas'}
                    </span>
                </Button>
                <Button
                    variant="solid"
                    icon={tienePulmonares() ? iconEye : icon}
                    className={`px-4 py-2 ${
                        tienePulmonares()
                            ? 'bg-green-500 hover:bg-green-600 text-white'
                            : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}
                    onClick={() => openDialog(setDialogIsOpenPulmonar)}
                >
                    <span className="whitespace-nowrap">
                        {tienePulmonares() ? 'Ver Pulmonares' : 'Pulmonares'}
                    </span>
                </Button>
                <Button
                    variant="solid"
                    icon={tieneHepatico() ? iconEye : icon}
                    className={`px-4 py-2 ${
                        tieneHepatico()
                            ? 'bg-green-500 hover:bg-green-600 text-white'
                            : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}
                    onClick={() => openDialog(setDialogIsOpenHepatica)}
                >
                    <span className="whitespace-nowrap">
                        {tieneHepatico() ? 'Ver Hepáticas' : 'Hepáticas'}
                    </span>
                </Button>
            </div>

            {/* Modales */}
            <ModalCardiacas
                isOpen={dialogIsOpenCardiacas}
                onClose={closeModal}
                onRequestClose={() => closeDialog(setDialogIsOpenCardiacas)}
            />

            <ModalPulmonares
                isOpen={dialogIsOpenPulmonar}
                onClose={closeModal}
                onRequestClose={() => closeDialog(setDialogIsOpenPulmonar)}
            />

            <ModalHepatico
                isOpen={dialogIsOpenHepatica}
                onClose={closeModal}
                onRequestClose={() => closeDialog(setDialogIsOpenHepatica)}
            />
        </>
    )
}

export default SeccionTwo;