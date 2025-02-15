import axiosInstance from "../adapters/axiosInstance";

export const buscarHospital = async (token, hospital) => {
    try {
        const result = await axiosInstance.get(`/redPrimaria/${hospital}`, {
            headers: { Authorization: token }
        });
        return result.data;
    } catch (error) {
        console.error("Error al buscar la red primaria:", error.response?.data || error.message);
        throw error; // Lanza el error para manejarlo desde el componente que consume este servicio
    }
};
