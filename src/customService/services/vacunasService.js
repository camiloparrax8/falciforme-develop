import axiosInstance from "../adapters/axiosInstance";

export const buscarVacunas= async (token, id) => {
    try {
        const result = await axiosInstance.get(`/esquema-vacunacion/${id}`, {
            headers: { Authorization: token }
        });
        return result.data;
    } catch (error) {
        console.log("Error al buscar esquema-vacunacion:", error.response?.data || error.message);
        throw error; // Lanza el error para manejarlo desde el componente que consume este servicio
    }
};