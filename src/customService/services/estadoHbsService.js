import axiosInstance from "../adapters/axiosInstance";

export const BuscarEstadosHBSid= async (token, id) => {
    try {
        const result = await axiosInstance.get(`/estado-hbs/${id}`, {
            headers: { Authorization: token }
        });
        return result.data;
    } catch (error) {
        console.log("Error al buscar el estado hbs:", error.response?.data || error.message);
        throw error; // Lanza el error para manejarlo desde el componente que consume este servicio
    }
};