import axiosInstance from "../adapters/axiosInstance";

export const crearTransplanteProgenitores = async (token, formData) => {
    try {
        const data = {
            id_paciente: parseInt(formData.id_paciente),
            paciente: formData.paciente,
            padres: formData.padres,
            hermanos: formData.hermanos,
            tipo_indicaciones: formData.tipo,
            id_user_create: formData.id_user_create,
        };

        const result = await axiosInstance.post(`/historia-clinica/trasplantes-progenitores`, data, {
            headers: { Authorization: token },
        });

        return result.data;
    } catch (error) {
        console.error("Error al crear el transplante de progenitores:", error.response?.data || error.message);
        throw error;
    }
};

export const consultarTransplantesProgenitoresPorPaciente = async (token, idPaciente) => {
    try {
        if (!idPaciente) {
            console.error("ID de paciente no proporcionado en consultarTransplantesProgenitoresPorPaciente");
            throw new Error("ID de paciente no proporcionado");
        }


        // Asegurar que el ID sea un número
        const idPacienteNumerico = parseInt(idPaciente);

        if (isNaN(idPacienteNumerico)) {
            console.error(`ID de paciente inválido: ${idPaciente}`);
            throw new Error("ID de paciente inválido");
        }

        const url = `/historia-clinica/trasplantes-progenitores/${idPacienteNumerico}`;

        const result = await axiosInstance.get(
            url,
            { headers: { Authorization: token } }
        );

        // Estructura consistente para la respuesta
        if (result.data) {
            // Si hay datos en la respuesta
            if (result.data.data) {
                // Si los datos tienen una propiedad data (estructura API)
                if (result.data.data.id) {
                    // Y esa data tiene un ID, entonces hay un trasplante
                    return {
                        status: 'success',
                        data: result.data.data
                    };
                } else {
                    // Si no tiene ID, no hay trasplante real
                    return {
                        status: 'success',
                        data: null
                    };
                }
            } else if (Array.isArray(result.data)) {
                // Si es un array, verificar si tiene elementos
                return {
                    status: 'success',
                    data: result.data.length > 0 ? result.data[0] : null
                };
            } else if (result.data.id) {
                // Si el objeto tiene un ID directamente
                return {
                    status: 'success',
                    data: result.data
                };
            } else {
                // Cualquier otro caso, no hay datos válidos
                return {
                    status: 'success',
                    data: null
                };
            }
        } else {
            // Si no hay datos en la respuesta
            return {
                status: 'success',
                data: null
            };
        }
    } catch (error) {
        // Si el error es porque no hay historia clínica activa, lo tratamos como éxito con datos nulos
        if (error.response &&
            error.response.data &&
            error.response.data.message === "El paciente no tiene una historia clínica activa") {
            return {
                status: 'success',
                message: "No hay trasplantes disponibles",
                data: null
            };
        }

        if (error.response && error.response.status === 404) {
            return {
                status: 'success',
                message: "No se encontraron trasplantes",
                data: null
            };
        }
        console.error("Error al consultar transplantes de progenitores:", error.response?.data || error.message);
        return {
            status: 'success', // Cambiamos a success para evitar errores en componente
            message: error.response?.data?.message || error.message,
            data: null
        };
    }
};
