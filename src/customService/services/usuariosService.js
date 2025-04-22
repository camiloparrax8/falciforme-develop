import axiosInstance from "../adapters/axiosInstance";


export const getUsuarios = async (token) => {
    const result = await axiosInstance.get('/usuario', {
        headers: { Authorization: token }
    });
    return result.data;
}

export const crearUsuario = async (token, formdata) => {
    try {
        const data = {
            nombres: formdata.nombres,
            apellidos: formdata.apellidos,
            cedula: formdata.cedula,
            correo: formdata.correo,
            celular: formdata.celular,
            user: formdata.user,
            id_rol: formdata.id_rol,
            estado: true
        }
        const result = await axiosInstance.post('/usuario/', data, {
            headers: { Authorization: token }
        });

        return result.data;
    } catch (error) {
        console.error("Error al crear usuario:", error.response?.data || error.message);
        throw error;
    }
}

export const editarUsuario = async (token, id_usuario, usuario) => {
    try {
        const response = await axiosInstance.put(`/usuario/${id_usuario}`, usuario, {
            headers: { Authorization: token }
        });
        return response.data;
    } catch (error) {
        console.error("Error al editar usuario:", error.response?.data || error.message);
        throw error;
    }
};

export const eliminarUsuario = async (token, id_usuario) => {
    try {
        const response = await axiosInstance.delete(`/usuario/${id_usuario}`, {
            headers: { Authorization: token }
        });

        return response.data; // Devuelve la respuesta del backend
    } catch (error) {
        console.error("Error al eliminar usuario:", error.response?.data?.message || error.message || "Error desconocido");
        throw error;
    }
};

/**
 * Cambia el estado de un usuario (activa/desactiva)
 * @async
 * @function cambiarEstado
 * @param {string} token - Token de autenticación
 * @param {number} id_usuario - ID del usuario a cambiar estado
 * @returns {Promise<Object>} Respuesta con el resultado de la operación
 */
export const cambiarEstado = async (token, id_usuario) => {
    try {
        const response = await axiosInstance.put(`/usuario/cambiar-estado/${id_usuario}`, 
            {}, 
            { headers: { Authorization: token } }
        );
        return response.data;
    } catch (error) {
        console.error("Error al cambiar estado del usuario:", error.response?.data || error.message);
        throw error;
    }
};
