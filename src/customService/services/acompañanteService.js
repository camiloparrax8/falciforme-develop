import axiosInstance from "../adapters/axiosInstance";

export const BuscarAcompañante = async (token, identificacion) => {
    try {
        const result = await axiosInstance.get(`/acompanante/${identificacion}`, {
            headers: { Authorization: token }
        });
        return result.data;
    } catch (error) {
        console.error("Error al buscar acompañante:", error.response?.data || error.message);
        throw error; 
    }
};
