import axiosInstance from "@/customService/adapters/axiosInstance";

/**
 * Servicio para la gestión de soportes transfusionales
 * @module soportesTransfusionalesService
 */

/**
 * Crea un nuevo registro de soporte transfusional
 * @async
 * @param {string} token - Token de autenticación
 * @param {Object} formData - Datos del formulario
 * @param {string} formData.id_paciente - ID del paciente
 * @param {Date} formData.fecha - Fecha del soporte
 * @param {string} formData.soporte_transfusional - Tipo de soporte transfusional
 * @param {string} formData.numero_transfusiones - Número de transfusiones
 * @param {string} formData.frecuencia - Frecuencia de transfusiones
 * @param {boolean} formData.aloinmunizacion - Estado de aloinmunización
 * @param {Date} formData.fecha_sobrecarga_hierro - Fecha de sobrecarga de hierro
 * @param {string} formData.quelentes - Quelantes utilizados
 * @param {string} formData.ferritina - Nivel de ferritina
 * @param {string} formData.ferritina_dosis - Dosis de ferritina
 * @param {Date} formData.fecha_sobrecarga_organo - Fecha de sobrecarga de órgano
 * @param {string} formData.lic - LIC
 * @param {string} formData.pancreatica - Estado pancreático
 * @param {string} formData.evaluacion_cardiaca - Evaluación cardíaca
 * @returns {Promise<Object>} Objeto con el estado de la operación
 * @throws {Error} Si hay un error en la creación
 */
export const crearSoporteTransfusional = async (token, formData) => {
    try {
        // Validación de fechas futuras
        const fechasParaValidar = [
            { campo: 'fecha', nombre: 'Fecha del soporte' },
            { campo: 'fecha_sobrecarga_hierro', nombre: 'Fecha de sobrecarga de hierro' },
            { campo: 'fecha_sobrecarga_organo', nombre: 'Fecha de sobrecarga de órgano' }
        ];

        for (const { campo, nombre } of fechasParaValidar) {
            if (formData[campo]) {
                const fechaSeleccionada = new Date(formData[campo]);
                const hoy = new Date();
                if (fechaSeleccionada > hoy) {
                    return {
                        status: 'error',
                        message: `${nombre} no puede ser una fecha futura`,
                        data: null
                    };
                }
            }
        }

        // Formateo de fechas para el backend
        const formatearFecha = (fecha) => {
            if (!fecha) return null;

            const fechaObj = new Date(fecha);
            const año = fechaObj.getFullYear();
            const mes = String(fechaObj.getMonth() + 1).padStart(2, '0');
            const dia = String(fechaObj.getDate()).padStart(2, '0');
            return `${año}-${mes}-${dia}`;
        };

        const data = {
            id_paciente: parseInt(formData.id_paciente),
            fecha: formatearFecha(formData.fecha),
            soporte_transfusional: formData.soporte_transfusional,
            numero_transfusiones: formData.numero_transfusiones,
            frecuencia: formData.frecuencia,
            aloinmunizacion: formData.aloinmunizacion === 'Si',
            fecha_sobrecarga_hierro: formatearFecha(formData.fecha_sobrecarga_hierro),
            quelentes: formData.quelentes,
            ferritina: formData.ferritina,
            ferritina_dosis: formData.ferritina_dosis,
            fecha_sobrecarga_organo: formatearFecha(formData.fecha_sobrecarga_organo),
            lic: formData.lic,
            pancreatica: formData.pancreatica,
            evaluacion_cardiaca: formData.evaluacion_cardiaca,
            id_user_create: formData.id_user_create
        };

        const result = await axiosInstance.post(`/historia-clinica/soportes-transfusionales`, data, {
            headers: { Authorization: token },
        });

        return result.data;
    } catch (error) {
        console.error("Error al crear el soporte transfusional:", error.response?.data || error.message);
        // Retornar los detalles completos del error para mejor diagnóstico
        if (error.response && error.response.data) {
            return {
                status: 'error',
                message: error.response.data.message || "Error al crear el soporte transfusional",
                errors: error.response.data.errors,
                data: null
            };
        }
        return {
            status: 'error',
            message: "Error al crear el soporte transfusional",
            data: null
        };
    }
};

/**
 * Obtiene los soportes transfusionales de un paciente específico
 * @async
 * @param {string} token - Token de autenticación
 * @param {string|number} idPaciente - ID del paciente
 * @returns {Promise<Object>} Objeto con los datos de los soportes transfusionales
 * @throws {Error} Si el ID del paciente es inválido o no se encuentra
 */
export const obtenerSoportesTransfusionalesPorPaciente = async (token, idPaciente) => {
    try {
        // Validaciones de ID
        if (!idPaciente) {
            console.error("ID de paciente no proporcionado en obtenerSoportesTransfusionalesPorPaciente");
            throw new Error("ID de paciente no proporcionado");
        }

        const idPacienteNumerico = parseInt(idPaciente);

        if (isNaN(idPacienteNumerico)) {
            console.error(`ID de paciente inválido: ${idPaciente}`);
            throw new Error("ID de paciente inválido");
        }

        const url = `/historia-clinica/soportes-transfusionales/${idPacienteNumerico}`;

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
                message: "No se encontraron soportes transfusionales",
                data: null
            };
        }
        console.error("Error al consultar soportes transfusionales:", error.response?.data || error.message);
        return {
            status: 'success',
            message: error.response?.data?.message || error.message,
            data: null
        };
    }
};

/**
 * Realiza una eliminación lógica de un soporte transfusional
 * @async
 * @param {string} token - Token de autenticación
 * @param {number} idSoporte - ID del soporte transfusional a eliminar
 * @returns {Promise<Object>} Objeto con el estado de la operación
 * @throws {Error} Si hay un error en la eliminación
 */
export const eliminarLogicamenteSoporteTransfusional = async (token, idSoporte) => {
    try {
        const response = await axiosInstance.put(
            `/historia-clinica/soportes-transfusionales/${idSoporte}`,
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
        console.error('Error al eliminar soporte transfusional:', error);
        return {
            status: 'error',
            message: error.response?.data?.message || 'Error al eliminar soporte transfusional',
        };
    }
};
