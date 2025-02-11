import axiosInstance from "../adapters/axiosInstance";


export const postPaciente = async (token, data) => {
    try {
    const result = await axiosInstance.post('/paciente', data, {
        headers: { Authorization: token }
    });
    return result.data;
} catch (error) {
    console.error("Error al crear el paciente:", error.response?.data || error.message);
    throw error; // Lanza el error para manejarlo desde el componente que consume este servicio
}
}