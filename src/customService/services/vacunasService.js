import axiosInstance from "../adapters/axiosInstance";

export const obtenerVacunasPaciente = async (token, idPaciente) => {

    const result = await axiosInstance.get(`/esquema-vacunacion/${idPaciente}`, {
        headers: { Authorization: token }
    });
    return result.data;
};

export const inputVacunas = async (token) => {

    const result = await axiosInstance.get(`/vacunas`, {
        headers: { Authorization: token }
    });
    return result.data;
};


export const crearEsquemaVacunas = async (token, idUsuario, formData) => {
    try {
        const data = {
            id_paciente: formData.id_paciente,
            id_vacunacion: formData.id_vacunacion,
            estado: formData.estado,
            fecha_vacunacion: formData.fecha_vacunacion,
            dosis: formData.dosis,
            id_user_create: idUsuario
        };

        const result = await axiosInstance.post(`/esquema-vacunacion`, data, {
            headers: { Authorization: token }
        });

        return result.data;
    } catch (error) {
        console.error("Error al esquema-vacunacion:", error.response?.data || error.message);
        throw error;
    }
};

/**
 * Actualiza un esquema de vacunación existente
 * @async
 * @param {string} token - Token de autenticación
 * @param {Object} formData - Datos a actualizar
 * @param {number} formData.id - ID del esquema de vacunación
 * @param {string} [formData.estado] - Estado de la vacunación
 * @param {string} [formData.fecha_vacunacion] - Fecha de la vacunación
 * @param {number} [formData.dosis] - Dosis de la vacuna
 * @param {number} formData.id_user_update - ID del usuario que actualiza
 * @returns {Promise<Object>} Objeto con el estado de la operación
 * @throws {Error} Si hay un error en la actualización
 */
export const actualizarEsquemaVacunacion = async (token, formData) => {
    try {
        const data = {
            id: formData.id,
            estado: formData.estado,
            fecha_vacunacion: formData.fecha_vacunacion,
            dosis: formData.dosis ? parseInt(formData.dosis) : undefined,
            id_user_update: formData.id_user_update,
            id_vacunacion: formData.id_vacunacion ? parseInt(formData.id_vacunacion) : undefined,
        };

        const result = await axiosInstance.put(`/esquema-vacunacion`, data, {
            headers: { Authorization: token },
        });

        return result.data;
    } catch (error) {
        console.error("Error al actualizar el esquema de vacunación:", error);
        console.error("Detalles del error:", {
            response: error.response?.data,
            status: error.response?.status,
            headers: error.response?.headers,
            config: error.config
        });

        if (error.response && error.response.data) {
            return {
                status: 'error',
                message: error.response.data.message || "Error al actualizar el esquema de vacunación",
                errors: error.response.data.errors,
                data: null
            };
        }
        return {
            status: 'error',
            message: "Error al actualizar el esquema de vacunación",
            data: null
        };
    }
};
