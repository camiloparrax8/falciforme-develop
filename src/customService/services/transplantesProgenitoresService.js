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
            throw new Error("ID de paciente no proporcionado");
        }

        const result = await axiosInstance.get(
            `historia-clinica/trasplantes-progenitores/${idPaciente}`,
            { headers: { Authorization: token } }
        );

        return result.data?.data || result.data;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return null;
        }
        console.error("Error al consultar transplantes de progenitores:", error.response?.data || error.message);
        throw error;
    }
};
