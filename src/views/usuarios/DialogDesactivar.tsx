import Dialog from "@/components/ui/Dialog";
import { useToken, useSessionUser } from "@/store/authStore";
import { useState } from "react";
import Button from "@/components/ui/Button";
import { cambiarEstado } from "@/customService/services/usuariosService";

function DialogDesactivar({ isOpen, onClose, onRequestClose, selectedRow, onDialogCloseDelete, onDialogOkDelete, actualizarUsuarios, setMensaje}) {
    const { token } = useToken();
    const { user } = useSessionUser();
    const [loading, setLoading] = useState(false);

    const handleOk = async () => {
        if (!selectedRow) return;

        setLoading(true);
        setMensaje([]); // Limpiar mensajes previos
        
        try {
            if (!token) {
                throw new Error('No hay token de autenticación disponible');
            }
            const response = await cambiarEstado(token, selectedRow.id);
            
            setMensaje({ 
                status: 'success', 
                message: response.message || 'Estado actualizado con éxito.' 
            });

            await actualizarUsuarios();
            await onDialogOkDelete(selectedRow);
            onClose();
        } catch (error) {
            setMensaje({ 
                status: 'error', 
                message: error.response?.data?.message || 'Error al cambiar estado del usuario.' 
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog
            isOpen={isOpen}
            onClose={onClose}
            onRequestClose={onRequestClose}
        >
            <h5 className="mb-4">
                {selectedRow?.Estado === "Activo" ? 'Confirmar Desactivación' : 'Confirmar Activación'}
            </h5>
            {selectedRow && (
                <p>
                    ¿Estás seguro de que deseas {selectedRow.Estado === "Activo" ? 'desactivar' : 'activar'} el usuario con la
                    siguiente información?
                    <br />
                    <strong>Identificación:</strong> {selectedRow?.Cedula}
                    <br />
                    <strong>Nombre:</strong> {selectedRow?.Nombres} {selectedRow?.Apellidos}
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
                    {selectedRow?.Estado === "Activo" ? 'Desactivar' : 'Activar'}
                </Button>
            </div>
      </Dialog>
    )
}

export default DialogDesactivar;