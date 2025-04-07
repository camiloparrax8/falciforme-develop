import axiosInstance from "@/customService/adapters/axiosInstance";

/**
 * Servicio para la gestión de imágenes diagnósticas
 * @module imagenDiagnosticaService
 */

/**
 * Crea un nuevo registro de imagen diagnóstica
 * @async
 * @param {string} token - Token de autenticación
 * @param {Object} formData - Datos del formulario
 * @param {string} formData.id_paciente - ID del paciente
 * @param {string} formData.imagenDiagnostica - Tipo de imagen diagnóstica
 * @param {Date} formData.fecha - Fecha del estudio
 * @param {string} formData.tipoResultado - Tipo de resultado
 * @param {string} formData.resultado - Descripción del resultado
 * @returns {Promise<Object>} Objeto con el estado de la operación
 * @throws {Error} Si hay un error en la creación
 */
export const crearImagenDiagnostica = async (token, formData) => {
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
            imagenes_diagnosticas: formData.imagenDiagnostica,
            fecha: fechaFormateada,  // Fecha formateada sin conversión a UTC
            tipo_resultado: formData.tipoResultado,
            resultado: formData.resultado
        };

        const result = await axiosInstance.post(`/historia-clinica/imagenes-diagnosticas`, data, {
            headers: { Authorization: token },
        });

        return result.data;
    } catch (error) {
        console.error("Error al crear la imagen diagnóstica:", error.response?.data || error.message);
        // Retornar los detalles completos del error para mejor diagnóstico
        if (error.response && error.response.data) {
            return {
                status: 'error',
                message: error.response.data.message || "Error al crear la imagen diagnóstica",
                errors: error.response.data.errors,
                data: null
            };
        }
        return {
            status: 'error',
            message: "Error al crear la imagen diagnóstica",
            data: null
        };
    }
};

/**
 * Obtiene las imágenes diagnósticas de un paciente específico
 * @async
 * @param {string} token - Token de autenticación
 * @param {string|number} idPaciente - ID del paciente
 * @returns {Promise<Object>} Objeto con los datos de las imágenes diagnósticas
 * @throws {Error} Si el ID del paciente es inválido o no se encuentra
 */
export const obtenerImagenesDiagnosticasPorPaciente = async (token, idPaciente) => {
    try {
        // Validaciones de ID
        if (!idPaciente) {
            console.error("ID de paciente no proporcionado en obtenerImagenesDiagnosticasPorPaciente");
            throw new Error("ID de paciente no proporcionado");
        }

        const idPacienteNumerico = parseInt(idPaciente);

        if (isNaN(idPacienteNumerico)) {
            console.error(`ID de paciente inválido: ${idPaciente}`);
            throw new Error("ID de paciente inválido");
        }

        const url = `/historia-clinica/imagenes-diagnosticas/${idPacienteNumerico}`;

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
                message: "No se encontraron imágenes diagnósticas",
                data: null
            };
        }
        console.error("Error al consultar imágenes diagnósticas:", error.response?.data || error.message);
        return {
            status: 'error',
            message: error.response?.data?.message || error.message,
            data: null
        };
    }
};

/**
 * Realiza una eliminación lógica de una imagen diagnóstica
 * @async
 * @param {string} token - Token de autenticación
 * @param {number} idImagen - ID de la imagen diagnóstica a eliminar
 * @returns {Promise<Object>} Objeto con el estado de la operación
 * @throws {Error} Si hay un error en la eliminación
 */
export const eliminarLogicamenteImagenDiagnostica = async (token, idImagen) => {
    try {
        const response = await axiosInstance.put(
            `/historia-clinica/imagenes-diagnosticas/${idImagen}`,
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
        console.error('Error al eliminar imagen diagnóstica:', error);
        return {
            status: 'error',
            message: error.response?.data?.message || 'Error al eliminar imagen diagnóstica',
        };
    }
};
