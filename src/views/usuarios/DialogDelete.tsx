import Dialog from "@/components/ui/Dialog";
import { useToken } from "@/store/authStore";
import { useSessionUser } from "@/store/authStore";
import { useState } from "react";
import Button from "@/components/ui/Button";
function DialogDelete({ isOpen, onClose, onRequestClose, selectedRow, onDialogCloseDelete, onDialogOkDelete}) {

    const { token } = useToken();
    const { user } = useSessionUser();
    const [loading, setLoading] = useState(false);

    const handleOk = async () => {
        await onDialogOkDelete(selectedRow);
        onClose();
    }
    
    return (
        <Dialog
        isOpen={isOpen}
        onClose={onClose}
        onRequestClose={onRequestClose}
    >
        <h5 className="mb-4">Confirmar Eliminación</h5>
        {selectedRow && (
            <p>
                ¿Estás seguro de que deseas eliminar el registro con la
                siguiente información?
                <br />
                <strong>Identificacion:</strong> {selectedRow.Cedula}
                <br />
                <strong>Nombre:</strong> {selectedRow.Nombre}
            </p>
        )}
        <div className="text-right mt-6">
            <Button
                className="ltr:mr-2 rtl:ml-2"
                variant="plain"
                onClick={onDialogCloseDelete}
            >
                Cancelar
            </Button>
            
            <Button variant="solid" onClick={handleOk}>
                Eliminar
            </Button>
            
        </div>
    </Dialog>
    )
}

export default DialogDelete;
