import { Button, Card } from '@/components/ui';
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

    useEffect(() => {
        const cargarUsuarios = async () => {
            try {
                if (!token) {
                    console.error("Token no disponible");
                    return;
                }

                const respuesta = await getUsuarios(token);

                if (respuesta?.data) {
                    // Transformar los datos para que coincidan con el formato esperado
                    const usuariosTransformados = respuesta.data.map((usuario) => ({
                        nombreCompleto: `${usuario.nombres} ${usuario.apellidos}`,
                        id: usuario.id,
                        Nombres: usuario.nombres,
                        Apellidos: usuario.apellidos, // Combina nombres y apellidos
                        Cedula: usuario.cedula,
                        Correo: usuario.correo,
                        User: usuario.user,
                        Celular: usuario.celular,
                        Rol: usuario.rol?.nombre || 'Sin rol', // Verifica si existe el rol
                        Estado: usuario.estado ? 'Activo' : 'Inactivo', // Estado como texto
                    }));
                    setUsuarios(usuariosTransformados);
                } else {
                    console.error("Respuesta inesperada:", respuesta);
                }
            } catch (error) {
                console.error("Error al cargar usuarios:", error);
            }
        };

        cargarUsuarios();
    }, [token]);
    // Encabezados de la tabla
    const header = ['nombreCompleto', 'Cedula', 'Correo', 'Celular', 'Rol', 'Estado'];

    const [isOpen, setIsOpen] = useState(false);
    const openDialog = () => setIsOpen(true)
    const closeDialog = () => setIsOpen(false)

    return (
        <div>
            <FormUsuarios isOpen={isOpen} onClose={() => setIsOpen(false)} onRequestClose={() => setIsOpen(false)} setMensaje={setMensaje}/>
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
                <TableUsuario data={usuarios} header={header} className={null}></TableUsuario>
            </Card>
        </div>
    );
}

export default Usuarios;
