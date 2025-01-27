
import { useEffect, useState } from "react";
import {getUsuarios} from "../customService/services/usuariosService";



const Home = () => {

  const [usuario, setUsuarios] = useState([]);

    useEffect(() => {
        const cargarUsuarios = async () => {
          const respuesta = await getUsuarios(token);
          setUsuarios(respuesta.data);
        };
        cargarUsuarios();
      }, []);

      console.log(usuario);
      
    return <div>Inicio</div>
}

export default Home
