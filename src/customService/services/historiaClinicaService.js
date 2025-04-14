import axiosInstance from "../adapters/axiosInstance";

export const buscarHcOpenById = async (token, idPaciente) => {
    try {
        const response = await axiosInstance.get(
            `/historia-clinica/paciente/${idPaciente}/abierta`,
            {
                headers: { Authorization: token }
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error al buscar la historia clínica abierta:", error.response?.data || error.message);
        throw error;
    }
};

/**
 * Obtiene todas las historias clínicas de un paciente específico incluyendo información de usuarios
 * @async
 * @param {string} token - Token de autenticación
 * @param {string|number} idPaciente - ID del paciente
 * @returns {Promise<Object>} Objeto con los datos de las historias clínicas
 */
export const obtenerHistoriasClinicasPorPaciente = async (token, idPaciente) => {
    try {
        // Validaciones de ID
        if (!idPaciente) {
            console.error("ID de paciente no proporcionado en obtenerHistoriasClinicasPorPaciente");
            throw new Error("ID de paciente no proporcionado");
        }

        const idPacienteNumerico = parseInt(idPaciente);

        if (isNaN(idPacienteNumerico)) {
            console.error(`ID de paciente inválido: ${idPaciente}`);
            throw new Error("ID de paciente inválido");
        }

        const response = await axiosInstance.get(
            `/historia-clinica/paciente/${idPacienteNumerico}?includeUsers=true`,
            {
                headers: { Authorization: token }
            }
        );

        // Verificar si la respuesta contiene datos y procesar la información
        if (response.data && Array.isArray(response.data)) {
            return response.data;
        }

        return response.data;
    } catch (error) {
        console.error("Error al obtener las historias clínicas:", error.response?.data || error.message);
        if (error.response && error.response.status === 404) {
            return {
                status: 'success',
                message: "No se encontraron historias clínicas para este paciente",
                data: []
            };
        }
        return {
            status: 'error',
            message: error.response?.data?.message || error.message,
            data: []
        };
    }
};

/**
 * Cierra una historia clínica específica
 * @async
 * @param {string} token - Token de autenticación
 * @param {number} idHistoriaClinica - ID de la historia clínica a cerrar
 * @returns {Promise<Object>} Resultado de la operación
 */
export const cerrarHistoriaClinica = async (token, idHistoriaClinica) => {
    try {
        const response = await axiosInstance.put(
            `/historia-clinica/${idHistoriaClinica}/cerrar`,
            {},
            {
                headers: { Authorization: token }
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error al cerrar la historia clínica:", error.response?.data || error.message);
        return {
            status: 'error',
            message: error.response?.data?.message || "Error al cerrar la historia clínica",
            data: null
        };
    }
};