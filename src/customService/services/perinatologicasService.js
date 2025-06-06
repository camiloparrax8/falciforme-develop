import axiosInstance from "../adapters/axiosInstance";

export const BuscarPerinatologicos = async (token, id) => {
    try {
        const result = await axiosInstance.get(`/antecedente-perinatologico/${id}`, {
            headers: { Authorization: token }
        });
        return result.data;
    } catch (error) {
        console.log("Error al buscar antecedente-perinatologico:", error.response?.data || error.message);
        throw error; // Lanza el error para manejarlo desde el componente que consume este servicio
    }
};


export const CrearPerinatologico = async (token, idUsuario, idPaciente, formData) => {
    try {
        const data = {
            peso_al_nacer: formData.peso_al_nacer,
            talla_al_nacer: formData.talla_al_nacer,
            nota: formData.nota,
            condicion_al_nacer: formData.condicion_al_nacer,
            cuidado_neonatal: formData.cuidado_neonatal,
            etirico_neonatal: formData.etirico_neonatal,
            id_paciente: idPaciente,
            id_user_create: idUsuario,
        };

        const result = await axiosInstance.post(`/antecedente-perinatologico`, data, {
            headers: { Authorization: token }
        });

        return result.data;
    } catch (error) {
        if (error.response) {
            console.error("Error al crear antecedentes perinatológicos:", error.response.data);
            alert(JSON.stringify(error.response.data, null, 2)); // Muestra los errores en un alert
        } else {
            console.error("Error al crear antecedentes perinatológicos:", error.message);
            alert(error.message);
        }
        throw error;
    }
};

/**
 * Actualiza un antecedente perinatológico existente
 * @async
 * @param {string} token - Token de autenticación
 * @param {Object} formData - Datos a actualizar
 * @param {number} formData.id - ID del antecedente perinatológico
 * @param {string} [formData.peso_al_nacer] - Peso al nacer
 * @param {string} [formData.talla_al_nacer] - Talla al nacer
 * @param {string} [formData.nota] - Nota
 * @param {string} [formData.condicion_al_nacer] - Condición al nacer
 * @param {string} [formData.cuidado_neonatal] - Cuidado neonatal
 * @param {string} [formData.etirico_neonatal] - Etírico neonatal
 * @param {number} formData.id_user_update - ID del usuario que actualiza
 * @returns {Promise<Object>} Objeto con el estado de la operación
 * @throws {Error} Si hay un error en la actualización
 */
export const actualizarAntecedentePerinatologico = async (token, formData) => {
    try {
        const data = {
            id: formData.id,
            peso_al_nacer: formData.peso_al_nacer,
            talla_al_nacer: formData.talla_al_nacer,
            nota: formData.nota,
            condicion_al_nacer: formData.condicion_al_nacer,
            cuidado_neonatal: formData.cuidado_neonatal,
            etirico_neonatal: formData.etirico_neonatal,
            id_user_update: formData.id_user_update
        };

        const result = await axiosInstance.put(`/antecedente-perinatologico`, data, {
            headers: { Authorization: token },
        });

        return result.data;
    } catch (error) {
        console.error("Error al actualizar el antecedente perinatológico:", error.response?.data || error.message);
        if (error.response && error.response.data) {
            return {
                status: 'error',
                message: error.response.data.message || "Error al actualizar el antecedente perinatológico",
                errors: error.response.data.errors,
                data: null
            };
        }
        return {
            status: 'error',
            message: "Error al actualizar el antecedente perinatológico",
            data: null
        };
    }
};
