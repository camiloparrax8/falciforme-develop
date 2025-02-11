import { AdaptiveCard, Container } from "@/components/shared"
import ButtonNavigation from "@/views/common/ButtonNavigation"
import { Button } from '@/components/ui';
import { useState } from "react"
import { FaRegIdCard, FaSearch } from "react-icons/fa";
import FormRedPrimaria from "./FormRedPrimaria";
import SectionTitle from "@/views/common/form/SectionTitle";

const RedPrimaria = () => {
    const icon = <FaRegIdCard />;
    const iconBuscar = <FaSearch/>;

    // Estados para cada modal
    const [dialogIsOpenRP, setDialogIsOpenRP] = useState(false)
    const [dialogIsOpenRPS, setDialogIsOpenRPS] = useState(false)
    // Métodos para abrir y cerrar modales
    const openDialog = (setDialog) => setDialog(true);
    const closeDialog = (setDialog) => {
        console.log('Modal closed');
        setDialog(false);
    };
    return (
        <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            <SectionTitle text="Información Básica del Acompañante" className="col-span-1 md:col-span-2 lg:col-span-4" />
                <Button
                    variant="solid"
                    icon={iconBuscar}
                    className="col-span-1"
                    onClick={() => openDialog(setDialogIsOpenRPS)}
                >
                    Buscar
                </Button>
                <Button
                    variant="solid"
                    icon={icon}
                    className="col-span-1"
                    onClick={() => openDialog(setDialogIsOpenRP)}
                >
                    Registrar
                </Button>
            </div>
            <FormRedPrimaria
                isOpen={dialogIsOpenRP}
                onClose={() => closeDialog(setDialogIsOpenRP)}
                onRequestClose={() => closeDialog(setDialogIsOpenRP)}
            />
        </Container>

    )
}

export default RedPrimaria