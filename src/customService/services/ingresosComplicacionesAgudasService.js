import axiosInstance from "../adapters/axiosInstance";

/**
 * Crea un ingreso para una complicación aguda
 * @param {string} token - Token de autenticación
 * @param {object} formData - Datos del ingreso a crear
 * @returns {Promise} - Promesa con la respuesta del servidor
 */
export const crearIngresoComplicacionAguda = async (token, formData) => {
    try {
        // Formatear campos si son arrays
        const formatearCampoMultiple = (campo) => {
            if (Array.isArray(campo) && campo.length > 0) {
                const valores = campo.map(item => {
                    if (item && typeof item === 'object' && item.value) {
                        return item.value;
                    }
                    if (item && typeof item === 'string') {
                        return item;
                    }
                    return null;
                }).filter(item => item !== null);

                if (valores.length > 0) {
                    return valores.join(', ');
                }
            }
            return typeof campo === 'string' ? campo : 'Sin especificar';
        };

        // Preparar los datos para el backend
        const data = {
            id_complicacion_aguda: parseInt(formData.id_complicacion_aguda),
            tipo_ingreso: formData.tipo_ingreso || '',
            fecha_ingreso: formData.fecha_ingreso,
            duracion_ingreso: parseInt(formData.duracion_ingreso) || 0,
            motivo_ingreso: formatearCampoMultiple(formData.motivo_ingreso)
        };

        const result = await axiosInstance.post(`/historia-clinica/ingresos-complicaciones-agudas`, data, {
            headers: { Authorization: token }
        });

        return result.data;
    } catch (error) {
        console.error("Error al crear ingreso de complicación aguda:", error.response?.data || error.message);
        return {
            status: 'error',
            message: error.response?.data?.message || 'Error al crear ingreso de complicación aguda',
            data: null
        };
    }
};

/**
 * Obtiene los ingresos para una complicación aguda
 * @param {string} token - Token de autenticación
 * @param {number} idComplicacion - ID de la complicación aguda
 * @returns {Promise} - Promesa con la respuesta del servidor
 */
export const obtenerIngresosPorComplicacion = async (token, idComplicacion) => {
    try {
        if (!idComplicacion) {
            console.error("ID de complicación no proporcionado");
            throw new Error("ID de complicación no proporcionado");
        }

        const idComplicacionNumerico = parseInt(idComplicacion);

        if (isNaN(idComplicacionNumerico)) {
            console.error(`ID de complicación inválido: ${idComplicacion}`);
            throw new Error("ID de complicación inválido");
        }

        const result = await axiosInstance.get(
            `/historia-clinica/ingresos-complicaciones-agudas/${idComplicacionNumerico}`,
            { headers: { Authorization: token } }
        );

        // Estructura consistente para la respuesta
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
                message: "No se encontraron ingresos para esta complicación aguda",
                data: null
            };
        }
        console.error("Error al consultar ingresos:", error.response?.data || error.message);
        return {
            status: 'error',
            message: error.response?.data?.message || error.message,
            data: null
        };
    }
};
