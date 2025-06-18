import axiosInstance from "../adapters/axiosInstance";

export const BuscarEstadosHBS = async (token, id) => {
    try {
        const result = await axiosInstance.get(`/estado-hbs/${id}`, {
            headers: { Authorization: token }
        });
        return result.data;
    } catch (error) {
        console.log("Error al buscar el estado hbs:", error.response?.data || error.message);
        throw error; // Lanza el error para manejarlo desde el componente que consume este servicio
    }
};

export const crearEstadoHBS = async (token, idUsuario, idPaciente, formData) => {
    try {
        const data = {
            parentesco: formData.parentesco,
            linea_parentesco: formData.linea_parentesco,
            estado: formData.estado,
            id_paciente: idPaciente,
            id_user_create: idUsuario,
        };

        const result = await axiosInstance.post(`/estado-hbs`, data, {
            headers: { Authorization: token }
        });

        return result.data;
    } catch (error) {
        if (error.response) {
            console.error("Error al crear EstadoHBS:", error.response.data);
            alert(JSON.stringify(error.response.data, null, 2));  // Muestra los errores en un alert
        } else {
            console.error("Error al crear EstadoHBS:", error.message);
            alert(error.message);
        }
        throw error;
    }
};

/**
 * Actualiza un estado HBS existente
 * @async
 * @param {string} token - Token de autenticación
 * @param {Object} formData - Datos a actualizar
 * @param {number} formData.id - ID del estado HBS
 * @param {string} [formData.parentesco] - Parentesco
 * @param {string} [formData.linea_parentesco] - Línea de parentesco
 * @param {string} [formData.estado] - Estado
 * @param {number} formData.id_user_update - ID del usuario que actualiza
 * @returns {Promise<Object>} Objeto con el estado de la operación
 * @throws {Error} Si hay un error en la actualización
 */
export const actualizarEstadoHBS = async (token, formData) => {
    try {
        const data = {
            id: formData.id,
            parentesco: formData.parentesco,
            linea_parentesco: formData.linea_parentesco,
            estado: formData.estado,
            id_user_update: formData.id_user_update
        };

        const result = await axiosInstance.put(`/estado-hbs`, data, {
            headers: { Authorization: token },
        });

        return result.data;
    } catch (error) {
        console.error("Error al actualizar el estado HBS:", error.response?.data || error.message);
        if (error.response && error.response.data) {
            return {
                status: 'error',
                message: error.response.data.message || "Error al actualizar el estado HBS",
                errors: error.response.data.errors,
                data: null
            };
        }
        return {
            status: 'error',
            message: "Error al actualizar el estado HBS",
            data: null
        };
    }
};

