import axiosInstance from "@/customService/adapters/axiosInstance";

/**
 * Servicio para la gestión de tratamientos
 * @module tratamientosService
 */

/**
 * Crea un nuevo tratamiento
 * @async
 * @param {string} token - Token de autenticación
 * @param {Object} formData - Datos del formulario
 * @param {string} formData.id_paciente - ID del paciente
 * @param {string} formData.titulo - Título del tratamiento (Tratamiento individual o Manejo de dolor)
 * @param {number} formData.n_dias - Número de días
 * @param {string} formData.dosis - Dosis del tratamiento
 * @param {string} formData.tipo - Tipo de tratamiento
 * @param {number} formData.id_user_create - ID del usuario que crea el tratamiento
 * @returns {Promise<Object>} Objeto con el estado de la operación
 * @throws {Error} Si hay un error en la creación
 */
export const crearTratamiento = async (token, formData) => {
    try {
        const data = {
            id_paciente: parseInt(formData.id_paciente),
            titulo: formData.titulo,
            n_dias: parseInt(formData.n_dias),
            dosis: formData.dosis,
            tipo: formData.tipo,
            id_user_create: formData.id_user_create
        };

        const result = await axiosInstance.post(`/historia-clinica/tratamientos`, data, {
            headers: { Authorization: token },
        });

        return result.data;
    } catch (error) {
        console.error("Error al crear el tratamiento:", error.response?.data || error.message);
        // Retornar los detalles completos del error para mejor diagnóstico
        if (error.response && error.response.data) {
            return {
                status: 'error',
                message: error.response.data.message || "Error al crear el tratamiento",
                errors: error.response.data.errors,
                data: null
            };
        }
        return {
            status: 'error',
            message: "Error al crear el tratamiento",
            data: null
        };
    }
};

/**
 * Obtiene los tratamientos de un paciente específico
 * @async
 * @param {string} token - Token de autenticación
 * @param {string|number} idPaciente - ID del paciente
 * @returns {Promise<Object>} Objeto con los datos de los tratamientos
 * @throws {Error} Si el ID del paciente es inválido o no se encuentra
 */
export const obtenerTratamientosPorPaciente = async (token, idPaciente) => {
    try {
        // Validaciones de ID
        if (!idPaciente) {
            console.error("ID de paciente no proporcionado en obtenerTratamientosPorPaciente");
            throw new Error("ID de paciente no proporcionado");
        }

        const idPacienteNumerico = parseInt(idPaciente);

        if (isNaN(idPacienteNumerico)) {
            console.error(`ID de paciente inválido: ${idPaciente}`);
            throw new Error("ID de paciente inválido");
        }

        const url = `/historia-clinica/tratamientos/${idPacienteNumerico}`;

        const result = await axiosInstance.get(
            url,
            { headers: { Authorization: token } }
        );

        if (result.data) {
            if (result.data.data) {
                return {
                    status: 'success',
                    data: result.data.data
                };
            } else if (Array.isArray(result.data)) {
                return {
                    status: 'success',
                    data: result.data.length > 0 ? result.data : null
                };
            } else {
                return {
                    status: 'success',
                    data: result.data
                };
            }
        } else {
            return {
                status: 'success',
                data: null
            };
        }
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return {
                status: 'success',
                message: "No se encontraron tratamientos",
                data: null
            };
        }
        console.error("Error al consultar tratamientos:", error.response?.data || error.message);
        return {
            status: 'success',
            message: error.response?.data?.message || error.message,
            data: null
        };
    }
};

/**
 * Realiza una eliminación lógica de un tratamiento
 * @async
 * @param {string} token - Token de autenticación
 * @param {number} idTratamiento - ID del tratamiento a eliminar
 * @returns {Promise<Object>} Objeto con el estado de la operación
 * @throws {Error} Si hay un error en la eliminación
 */
export const eliminarLogicamenteTratamiento = async (token, idTratamiento) => {
    try {
        const response = await axiosInstance.put(
            `/historia-clinica/tratamientos/${idTratamiento}`,
            { is_deleted: true },
            {
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json',
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error('Error al eliminar tratamiento:', error);
        return {
            status: 'error',
            message: error.response?.data?.message || 'Error al eliminar tratamiento',
        };
    }
};
