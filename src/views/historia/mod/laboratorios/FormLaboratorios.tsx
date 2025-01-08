import { useState } from 'react';
import SectionTitle from '@/views/common/form/SectionTitle';
import Button from '@/components/ui/Button';
import TableCustom from '@/views/common/TableCustom';
import Dialog from '@/components/ui/Dialog';
import FormModalLaboratorios from '../laboratorios/FormModalLaboratorios';
import { RiStickyNoteAddFill } from "react-icons/ri";

function FormLaboratorios() {
    const [dialogIsOpen, setDialogIsOpen] = useState(false);

    const header = ['Tipo', 'Fecha Resultado', 'Fecha Solicitud', 'Entidad'];
    const [data, setData] = useState([
        { Tipo: "Hemograma", "Fecha Resultado": "2025-01-01", "Fecha Solicitud": "2024-12-25", Entidad: "Laboratorio A" },
        { Tipo: "Química sanguínea", "Fecha Resultado": "2025-01-02", "Fecha Solicitud": "2024-12-26", Entidad: "Laboratorio B" },
        { Tipo: "Examen de orina", "Fecha Resultado": "2025-01-03", "Fecha Solicitud": "2024-12-27", Entidad: "Laboratorio C" },
    ]);

    const openDialog = () => setDialogIsOpen(true);
    const closeDialog = () => setDialogIsOpen(false);

    const onSubmitModal = (formData: any) => {
        setData([...data, formData]);
        setDialogIsOpen(false);
    };

    return (
        <>
            <SectionTitle text="Gestion de examenes" className="col-span-1 md:col-span-6" />
    
            
            <div className="flex justify-end mt-4 mb-4">
                <Button
                    icon={<RiStickyNoteAddFill />}
                    variant="solid"
                    title="Añadir Resultados"
                    onClick={openDialog}
                >
                    Cargar examen
                </Button>
            </div>
    
            <TableCustom className="mt-4" data={data} header={header} />
    
            <Dialog 
            
                width={1200}
                height={600}
                isOpen={dialogIsOpen} 
                onClose={closeDialog} 
                onRequestClose={closeDialog}>
                <FormModalLaboratorios eventoForm={onSubmitModal} />
            </Dialog>
        </>
    );
    
}

export default FormLaboratorios;
