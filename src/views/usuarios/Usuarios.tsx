import { Button, Card, Alert } from '@/components/ui';
import { useEffect, useState } from "react";
import { getUsuarios } from "../../customService/services/usuariosService.js";
import { useToken } from "@/store/authStore";
import TableUsuario from './TableUsuario';
import { FiUserPlus } from 'react-icons/fi';
import FormUsuarios from './FormUsuarios';

function Usuarios() {
    const { token } = useToken();
    const [usuarios, setUsuarios] = useState([]);
    const [mensaje, setMensaje] = useState(null)
    const actualizarUsuarios = async () => {
        try {
            if (!token) return;
            const respuesta = await getUsuarios(token);
            if (respuesta?.data) {
                const usuariosTransformados = respuesta.data.map((usuario) => ({
                    nombreCompleto: `${usuario.nombres} ${usuario.apellidos}`,
                    id: usuario.id,
                    Nombres: usuario.nombres,
                    Apellidos: usuario.apellidos,
                    Cedula: usuario.cedula,
                    Correo: usuario.correo,
                    User: usuario.user,
                    Celular: usuario.celular,
                    Rol: usuario.rol?.nombre || 'Sin rol',
                    Estado: usuario.estado ? 'Activo' : 'Inactivo',
                }));
                setUsuarios(usuariosTransformados);
            }
        } catch (error) {
            console.error("Error al actualizar usuarios:", error);
        }
    };    

    useEffect(() => {
        actualizarUsuarios();
    }, [token]);
    // Encabezados de la tabla
    const header = ['nombreCompleto', 'Cedula', 'Correo', 'Celular', 'Rol', 'Estado'];

    const [isOpen, setIsOpen] = useState(false);
    const openDialog = () => setIsOpen(true)
    const closeDialog = () => setIsOpen(false)

    useEffect(() => {
        if (mensaje && !isOpen) {
            const timeout = setTimeout(() => setMensaje(null), 5000);
            return () => clearTimeout(timeout);
        }
    }, [mensaje, isOpen]);

    return (
        <div>
            <FormUsuarios isOpen={isOpen} onClose={() => setIsOpen(false)} onRequestClose={() => setIsOpen(false)} setMensaje={setMensaje} actualizarUsuarios={actualizarUsuarios}/>
            <Card>
                <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-semibold">Usuarios</h4>
                    <Button
                        variant="solid"
                        onClick={() => openDialog()}
                        size="sm"
                        icon={<FiUserPlus className="text-lg" />}
                    >
                        <span className="flex items-center gap-2">
                            Agregar Usuario
                        </span>
                    </Button>
                </div>
                {/* Pasamos los usuarios dinámicos a la tabla */}
                {mensaje && !isOpen && (
                    <div className="mb-4">
                        <Alert
                            title={mensaje.status === 'error' ? 'Atención' : 'Correcto'}
                            showIcon
                            type={mensaje.status === 'error' ? 'danger' : 'success'}
                            closable
                            duration={5000}
                            onClose={() => setMensaje(null)}
                        >
                            {mensaje.message}
                        </Alert>
                    </div>
                )}
                <TableUsuario data={usuarios} header={header} className={null} actualizarUsuarios={actualizarUsuarios} setMensaje={setMensaje}></TableUsuario>
            </Card>
        </div>
    );
}

export default Usuarios;
