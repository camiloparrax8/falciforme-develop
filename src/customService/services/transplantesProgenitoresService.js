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

        console.log("Datos enviados al backend:", data);

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

        console.log(`Consultando trasplantes para el paciente ID: ${idPaciente}`);

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
            console.log("No se encontraron trasplantes para este paciente (404)");
            return {
                status: 'error',
                message: "No se encontraron trasplantes",
                data: null
            };
        }
        console.error("Error al consultar transplantes de progenitores:", error.response?.data || error.message);
        return {
            status: 'error',
            message: error.response?.data?.message || error.message,
            data: null
        };
    }
};
