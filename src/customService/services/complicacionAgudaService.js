import axiosInstance from "../adapters/axiosInstance";

export const crearComplicacionAguda = async (token, formData) => {
    try {
        // Formatear campos tipo SelectMultiple (arrays) a strings separados por comas
        const formatearCampoMultiple = (campo) => {
            // Si es un array y tiene elementos
            if (Array.isArray(campo) && campo.length > 0) {
                // Determinar si los elementos son objetos con propiedad 'value' o strings directos
                const valores = campo.map(item => {
                    // Si es un objeto con propiedad value
                    if (item && typeof item === 'object' && item.value) {
                        return item.value;
                    }
                    // Si es un string directo
                    if (item && typeof item === 'string') {
                        return item;
                    }
                    return null;
                }).filter(item => item !== null); // Eliminar valores nulos

                // Solo unir con comas si hay valores
                if (valores.length > 0) {
                    return valores.join(', ');
                }
            }

            // Si no es un array, no tiene elementos, o algo falló, usar un valor por defecto
            return typeof campo === 'string' ? campo : 'Sin especificar';
        };

        // Obtener valores del formulario y formatearlos adecuadamente
        const data = {
            id_paciente: parseInt(formData.id_paciente),
            fecha: formData.fecha,
            dias_crisis: parseInt(formData.dias_crisis) || 0,
            intensidad: formData.intensidad || '',
            manejo: formData.manejo || '', // Ya no es multiple, es InputSelect
            tratamiento: formatearCampoMultiple(formData.tratamiento),
            huesos_afectados: formatearCampoMultiple(formData.huesos_afectados),
            germen: formData.germen || '',
            tratamiento_infecciones: formatearCampoMultiple(formData.tratamiento_infecciones) || 'Sin tratamiento',
            dias_infeccion: parseInt(formData.dias_infeccion) || 0,
            crisis_aplastica_infecciosa: formData.crisis_aplastica_infecciosa === 'true',
            id_user_create: formData.id_user_create,
        };

        // Debugging: muestra los valores antes de formatear
        console.log("Datos originales:", {
            tratamiento: formData.tratamiento,
            huesos_afectados: formData.huesos_afectados,
            tratamiento_infecciones: formData.tratamiento_infecciones
        });

        console.log("Datos enviados al backend:", data);

        const result = await axiosInstance.post(`/historia-clinica/complicaciones-agudas`, data, {
            headers: { Authorization: token },
        });

        return result.data;
    } catch (error) {
        console.error("Error al crear la complicación aguda:", error.response?.data || error.message);
        throw error;
    }
};

export const obtenerComplicacionAgudaPorPaciente = async (token, idPaciente) => {
    try {
        if (!idPaciente) {
            console.error("ID de paciente no proporcionado en obtenerComplicacionAgudaPorPaciente");
            throw new Error("ID de paciente no proporcionado");
        }

        console.log(`Consultando complicaciones agudas para el paciente ID: ${idPaciente}`);

        // Asegurar que el ID sea un número
        const idPacienteNumerico = parseInt(idPaciente);

        if (isNaN(idPacienteNumerico)) {
            console.error(`ID de paciente inválido: ${idPaciente}`);
            throw new Error("ID de paciente inválido");
        }

        const url = `/historia-clinica/complicaciones-agudas/${idPacienteNumerico}`;

        const result = await axiosInstance.get(
            url,
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
            console.log("No se encontraron complicaciones agudas para este paciente (404)");
            return {
                status: 'error',
                message: "No se encontraron complicaciones agudas",
                data: null
            };
        }
        console.error("Error al consultar complicaciones agudas:", error.response?.data || error.message);
        return {
            status: 'error',
            message: error.response?.data?.message || error.message,
            data: null
        };
    }
};
