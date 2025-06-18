import axiosInstance from "../adapters/axiosInstance";

export const BuscarEnfermedadCronica = async (token, id) => {
    try {
        const result = await axiosInstance.get(`/enfermedad-cronica/${id}`, {
            headers: { Authorization: token }
        });
        return result.data;
    } catch (error) {
        console.log("Error al buscar la enfermedad cronica:", error.response?.data || error.message);
        throw error;
    }
};


export const crearEnfermedadCronica = async (token, idUsuario, idPaciente, formData) => {
    try {
        const data = {
            id_paciente: idPaciente,
            enfermedad: formData.enfermedad,
            enfermedad_especifica: formData.enfermedad_especifica,
            portador: "Sí",
            linea_parentesco_portador: formData.parentescos,
            id_user_create: idUsuario
        };

        const result = await axiosInstance.post(`/enfermedad-cronica`, data, {
            headers: { Authorization: token }
        });

        return result.data;
    } catch (error) {
        console.error("Error al crear la enfermedad crónica:", error.response?.data || error.message);
        throw error;
    }
};

/**
 * Actualiza una enfermedad crónica existente
 * @async
 * @param {string} token - Token de autenticación
 * @param {Object} formData - Datos a actualizar
 * @param {number} formData.id - ID de la enfermedad crónica
 * @param {string} [formData.enfermedad] - Enfermedad
 * @param {string} [formData.enfermedad_especifica] - Enfermedad específica
 * @param {string} [formData.portador] - Portador (Sí/No)
 * @param {string} [formData.linea_parentesco_portador] - Línea de parentesco del portador
 * @param {number} formData.id_user_update - ID del usuario que actualiza
 * @returns {Promise<Object>} Objeto con el estado de la operación
 * @throws {Error} Si hay un error en la actualización
 */
export const actualizarEnfermedadCronica = async (token, formData) => {
    try {
        const data = {
            id: formData.id,
            enfermedad: formData.enfermedad,
            enfermedad_especifica: formData.enfermedad_especifica,
            portador: formData.portador,
            linea_parentesco_portador: formData.linea_parentesco_portador,
            id_user_update: formData.id_user_update
        };

        const result = await axiosInstance.put(`/enfermedad-cronica`, data, {
            headers: { Authorization: token },
        });

        return result.data;
    } catch (error) {
        console.error("Error al actualizar la enfermedad crónica:", error.response?.data || error.message);
        if (error.response && error.response.data) {
            return {
                status: 'error',
                message: error.response.data.message || "Error al actualizar la enfermedad crónica",
                errors: error.response.data.errors,
                data: null
            };
        }
        return {
            status: 'error',
            message: "Error al actualizar la enfermedad crónica",
            data: null
        };
    }
};

