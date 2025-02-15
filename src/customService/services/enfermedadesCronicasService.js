import axiosInstance from "../adapters/axiosInstance";

export const BuscarEnfermedadCronica= async (token, id) => {
    try {
        const result = await axiosInstance.get(`/enfermedad-cronica/${id}`, {
            headers: { Authorization: token }
        });
        return result.data;
    } catch (error) {
        console.log("Error al buscar la enfermedad cronica:", error.response?.data || error.message);
        throw error; // Lanza el error para manejarlo desde el componente que consume este servicio
    }
};