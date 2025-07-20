import axiosInstance from '../adapters/axiosInstance';

export const BuscarEnfermedadCronica = async (token, id_paciente) => {
    try {
        const response = await axiosInstance.get(
            `/enfermedad-cronica/${id_paciente}`,
            {
                headers: {
                    Authorization: token,
                },
            },
        );
        return response.data;
    } catch (error) {
        console.error('Error al buscar enfermedad crónica:', error);
        throw error;
    }
};

export const crearEnfermedadCronica = async (token, id_user, id_paciente, datos) => {
    try {
        const response = await axiosInstance.post(
            '/enfermedad-cronica',
            {
                id_paciente,
                ...datos,
                id_user_create: id_user
            },
            {
                headers: {
                    Authorization: token,
                },
            },
        );
        return response.data;
    } catch (error) {
        console.error('Error al crear enfermedad crónica:', error);
        throw error;
    }
};

/**
 * Actualiza una enfermedad crónica existente
 * @async
 * @param {string} token - Token de autenticación
 * @param {Object} datos - Datos a actualizar
 * @param {number} datos.id - ID de la enfermedad crónica
 * @param {string} [datos.enfermedad] - Enfermedad
 * @param {string} [datos.enfermedad_especifica] - Enfermedad específica
 * @param {string} [datos.portador] - Portador (Sí/No)
 * @param {string} [datos.linea_parentesco_portador] - Línea de parentesco del portador
 * @param {number} datos.id_user_update - ID del usuario que actualiza
 * @returns {Promise<Object>} Objeto con el estado de la operación
 * @throws {Error} Si hay un error en la actualización
 */
export const actualizarEnfermedadCronica = async (token, datos) => {
    try {
        const response = await axiosInstance.put(
            '/enfermedad-cronica',
            datos,
            {
                headers: {
                    Authorization: token,
                },
            },
        );
        return response.data;
    } catch (error) {
        console.error('Error al actualizar enfermedad crónica:', error);
        throw error;
    }
};

