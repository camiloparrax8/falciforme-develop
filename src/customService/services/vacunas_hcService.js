import axiosInstance from "@/customService/adapters/axiosInstance";

/**
 * Servicio para la gestión de vacunas en la historia clínica
 * @module vacunas_hcService
 */

/**
 * Crea un nuevo registro de vacuna
 * @async
 * @param {string} token - Token de autenticación
 * @param {Object} formData - Datos del formulario
 * @param {string} formData.id_paciente - ID del paciente
 * @param {string} formData.nombre_vacuna - Nombre de la vacuna
 * @param {Date} formData.fecha - Fecha de aplicación
 * @param {number} formData.id_user_create - ID del usuario que crea el registro
 * @returns {Promise<Object>} Objeto con el estado de la operación
 * @throws {Error} Si hay un error en la creación
 */
export const crearVacuna = async (token, formData) => {
    try {
        // Validación de fecha futura
        if (formData.fecha) {
            const fechaSeleccionada = new Date(formData.fecha);
            const hoy = new Date();
            if (fechaSeleccionada > hoy) {
                return {
                    status: 'error',
                    message: 'La fecha no puede ser futura',
                    data: null
                };
            }
        }

        // Formateo de fecha para el backend
        let fechaFormateada = null;
        if (formData.fecha) {
            const fecha = new Date(formData.fecha);
            const año = fecha.getFullYear();
            const mes = String(fecha.getMonth() + 1).padStart(2, '0');
            const dia = String(fecha.getDate()).padStart(2, '0');
            fechaFormateada = `${año}-${mes}-${dia}`;
        }

        const data = {
            id_paciente: parseInt(formData.id_paciente),
            nombre_vacuna: formData.nombre_vacuna,
            fecha: fechaFormateada,
            id_user_create: formData.id_user_create
        };

        const result = await axiosInstance.post(`/historia-clinica/vacunas`, data, {
            headers: { Authorization: token },
        });

        return result.data;
    } catch (error) {
        console.error("Error al crear la vacuna:", error.response?.data || error.message);
        if (error.response && error.response.data) {
            return {
                status: 'error',
                message: error.response.data.message || "Error al crear la vacuna",
                errors: error.response.data.errors,
                data: null
            };
        }
        return {
            status: 'error',
            message: "Error al crear la vacuna",
            data: null
        };
    }
};

/**
 * Obtiene las vacunas de un paciente específico
 * @async
 * @param {string} token - Token de autenticación
 * @param {string|number} idPaciente - ID del paciente
 * @returns {Promise<Object>} Objeto con los datos de las vacunas
 * @throws {Error} Si el ID del paciente es inválido o no se encuentra
 */
export const obtenerVacunasPorPaciente = async (token, idPaciente) => {
    try {
        // Validaciones de ID
        if (!idPaciente) {
            console.error("ID de paciente no proporcionado en obtenerVacunasPorPaciente");
            throw new Error("ID de paciente no proporcionado");
        }

        const idPacienteNumerico = parseInt(idPaciente);

        if (isNaN(idPacienteNumerico)) {
            console.error(`ID de paciente inválido: ${idPaciente}`);
            throw new Error("ID de paciente inválido");
        }

        const url = `/historia-clinica/vacunas/${idPacienteNumerico}`;

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
                status: 'error',
                message: "No se encontraron vacunas",
                data: null
            };
        }
        console.error("Error al consultar vacunas:", error.response?.data || error.message);
        return {
            status: 'error',
            message: error.response?.data?.message || error.message,
            data: null
        };
    }
};

/**
 * Realiza una eliminación lógica de una vacuna
 * @async
 * @param {string} token - Token de autenticación
 * @param {number} idVacuna - ID de la vacuna a eliminar
 * @returns {Promise<Object>} Objeto con el estado de la operación
 * @throws {Error} Si hay un error en la eliminación
 */
export const eliminarLogicamenteVacuna = async (token, idVacuna) => {
    try {
        const response = await axiosInstance.put(
            `/historia-clinica/vacunas/${idVacuna}`,
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
        console.error('Error al eliminar vacuna:', error);
        return {
            status: 'error',
            message: error.response?.data?.message || 'Error al eliminar vacuna',
        };
    }
};
