import axiosInstance from "../adapters/axiosInstance";

export const BuscarPerinatologicos= async (token, id) => {
    try {
        const result = await axiosInstance.get(`/antecedente-perinatologico/${id}`, {
            headers: { Authorization: token }
        });
        return result.data;
    } catch (error) {
        console.log("Error al buscar antecedente-perinatologico:", error.response?.data || error.message);
        throw error; // Lanza el error para manejarlo desde el componente que consume este servicio
    }
};