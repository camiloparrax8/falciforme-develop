import Dialog from "@/components/ui/Dialog";
import { useToken } from "@/store/authStore";
import { useSessionUser } from "@/store/authStore";
import { useState } from "react";
import Button from "@/components/ui/Button";
import {eliminarUsuario} from '@/customService/services/usuariosService'
function DialogDelete({ 
    isOpen, 
    onClose, 
    onRequestClose, 
    selectedRow, 
    onDialogCloseDelete, 
    onDialogOkDelete, 
    setMensaje 
}) {
    const { token } = useToken();
    const { user } = useSessionUser();
    const [loading, setLoading] = useState(false);

    const handleOk = async () => {
        if (!selectedRow) return;

        setLoading(true);
        setMensaje([]); // Limpiar mensajes previos
        
        try {
            const response = await eliminarUsuario(token, selectedRow.id);
            
            setMensaje({ 
                status: 'success', 
                message: response.message || 'Usuario eliminado con éxito.' 
            });

            await onDialogOkDelete(selectedRow); // Ejecutar acción después de eliminar
            onClose();
        } catch (error) {
            setMensaje({ 
                status: 'error', 
                message: error.response?.data?.message || 'Error al eliminar usuario.' 
            });
        } finally {
            setLoading(false); // Asegurar que loading se desactiva
        }
    };
    
    return (
        <Dialog
            isOpen={isOpen}
            onClose={onClose}
            onRequestClose={onRequestClose}
        >
            <h5 className="mb-4">Confirmar Eliminación</h5>
            {selectedRow && (
                <p>
                    ¿Estás seguro de que deseas eliminar el siguiente usuario?
                    <br />
                    <strong>Identificación:</strong> {selectedRow.Cedula}
                    <br />
                    <strong>Nombre:</strong> {selectedRow.Nombre}
                </p>
            )}
            <div className="text-right mt-6">
                <Button 
                    className="ltr:mr-2 rtl:ml-2"
                    variant="plain"
                    onClick={onDialogCloseDelete}
                    disabled={loading}
                >
                    Cancelar
                </Button>
                
                <Button 
                    variant="solid" 
                    onClick={handleOk} 
                    disabled={loading}
                >
                    {loading ? "Eliminando..." : "Eliminar"}
                </Button>
            </div>
        </Dialog>
    );
}

export default DialogDelete;
