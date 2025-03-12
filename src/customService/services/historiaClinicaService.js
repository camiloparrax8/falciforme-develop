import axiosInstance from "../adapters/axiosInstance";

export const buscarHcOpenById = async (token, idPaciente) => {
    try {
        const result = await axiosInstance.get(`/historia-clinica/paciente/${idPaciente}/abierta`, {
            headers: { Authorization: token }
        });
        return result.data;
    } catch (error) {
        console.error("Error al buscar la historia clínica abierta:", error.response?.data || error.message);
        throw error;
    }
};