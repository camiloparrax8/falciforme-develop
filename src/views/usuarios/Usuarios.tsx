import { Card } from '@/components/ui';
import TableCustom from '../common/TableCustom';
import { useEffect, useState } from "react";
import { getUsuarios } from "../../customService/services/usuariosService.js";
import { useToken } from "@/store/authStore";

function Usuarios() {
    const { token } = useToken();
    const [usuarios, setUsuarios] = useState([]);

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
                        id: usuario.id,
                        Nombre: `${usuario.nombres} ${usuario.apellidos}`, // Combina nombres y apellidos
                        Cedula: usuario.cedula,
                        Correo: usuario.correo,
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
    const header = ['Nombre', 'Cedula', 'Correo', 'Celular', 'Rol', 'Estado'];

    return (
        <div>
            <Card>
                {/* Pasamos los usuarios dinámicos a la tabla */}
                <TableCustom data={usuarios} header={header} className={null}></TableCustom>
            </Card>
        </div>
    );
}

export default Usuarios;
