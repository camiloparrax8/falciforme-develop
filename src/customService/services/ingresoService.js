import axiosInstance from "../adapters/axiosInstance";


export const BuscarIngreso = async (token, id) => {
    try {
        const result = await axiosInstance.get(`/ingreso/${id}`, {
            headers: { Authorization: token }
        });
        return result.data;
    } catch (error) {
        console.log("Error al ingreso del paciente:", error.response?.data || error.message);
        throw error;
    }
};

export const crearPrimeraConsulta = async (token, idUsuario, idPaciente, formData) => {
    try {
        const data = {
            fecha_hematologica: formData.fecha_hematologica,
            edad_consulta: formData.edad_consulta,
            fecha_inicio_sintoma: formData.fecha_inicio_sintoma,
            parentescos_multiples: formData.parentescos_multiples,
            id_paciente: idPaciente,
            id_user_create: idUsuario,
        };

        const result = await axiosInstance.post(`/ingreso`, data, {
            headers: { Authorization: token }
        });

        return result.data;
    } catch (error) {
        console.error("Error al crear la primera consulta:", error);
        throw error;
    }
};

/**
 * Actualiza una primera consulta (ingreso) existente
 * @async
 * @param {string} token - Token de autenticación
 * @param {Object} formData - Datos a actualizar
 * @param {number} formData.id - ID de la primera consulta
 * @param {string} [formData.fecha_hematologica] - Fecha hematológica
 * @param {number} [formData.edad_consulta] - Edad en la consulta
 * @param {string} [formData.fecha_inicio_sintoma] - Fecha de inicio de síntomas
 * @param {Array} [formData.parentescos_multiples] - Parentescos múltiples
 * @param {number} formData.id_user_update - ID del usuario que actualiza
 * @returns {Promise<Object>} Objeto con el estado de la operación
 * @throws {Error} Si hay un error en la actualización
 */
export const actualizarPrimeraConsulta = async (token, formData) => {
    try {
        const data = {
            id: formData.id,
            fecha_hematologica: formData.fecha_hematologica,
            edad_consulta: formData.edad_consulta ? parseInt(formData.edad_consulta) : undefined,
            fecha_inicio_sintoma: formData.fecha_inicio_sintoma,
            parentescos_multiples: formData.parentescos_multiples,
            id_user_update: formData.id_user_update
        };

        const result = await axiosInstance.put(`/ingreso`, data, {
            headers: { Authorization: token },
        });

        return result.data;
    } catch (error) {
        console.error("Error al actualizar la primera consulta:", error.response?.data || error.message);
        if (error.response && error.response.data) {
            return {
                status: 'error',
                message: error.response.data.message || "Error al actualizar la primera consulta",
                errors: error.response.data.errors,
                data: null
            };
        }
        return {
            status: 'error',
            message: "Error al actualizar la primera consulta",
            data: null
        };
    }
};
