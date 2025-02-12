import { useEffect, useState } from "react";
import {getUsuarios} from "../customService/services/usuariosService";
import { useToken } from "@/store/authStore";



const Home = () => {
    const [usuarios, setUsuarios] = useState([]); // Aseguramos que el estado inicial sea un arreglo
    const {token} = useToken();
  
    useEffect(() => {
      const cargarUsuarios = async () => {
        try {
          if (!token) {
            console.error("Token no disponible");
            return;
          }
  
          const respuesta = await getUsuarios(token);
  
          if (respuesta?.data) {
            setUsuarios(respuesta.data); // Asumimos que 'data' es un arreglo de usuarios
          } else {
            console.error("Respuesta inesperada:", respuesta);
          }
        } catch (error) {
          console.error("Error al cargar usuarios:", error);
        }
      };
      cargarUsuarios();
    }, [token]);
  
    return (
      <div>
        <h1>Lista de Usuarios</h1>
        {Array.isArray(usuarios) && usuarios.length > 0 ? (
          <ul>
            {usuarios.map((usuario) => (
              <li key={usuario.id}>
                <strong>Nombre:</strong> {usuario.nombres} {usuario.apellidos} <br />
                <strong>Correo:</strong> {usuario.correo} <br />
                <strong>Celular:</strong> {usuario.celular}
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay usuarios para mostrar o aún se están cargando...</p>
        )}
      </div>
    );
  };
  
  export default Home;
