import axiosInstance from "../adapters/axiosInstance";

export const obtenerVacunasPaciente= async (token, idPaciente) => {
    try {
        const result = await axiosInstance.get(`/esquema-vacunacion/${idPaciente}`, {
            headers: { Authorization: token }
        });
        return result.data;
    } catch (error) {
        console.log("Error al buscar esquema-vacunacion:", error.response?.data || error.message);
        throw error; // Lanza el error para manejarlo desde el componente que consume este servicio
    }
};
export const inputVacunas= async (token) => {
    try {
        const result = await axiosInstance.get(`/vacunas`, {
            headers: { Authorization: token }
        });
        return result.data;
    } catch (error) {
        console.log("Error al buscar las vacunas:", error.response?.data || error.message);
        throw error; // Lanza el error para manejarlo desde el componente que consume este servicio
    }
};



export const crearEsquemaVacunas = async (token, idUsuario, formData) => {
    try {
        const data = {
            id_paciente: formData.id_paciente,
            id_vacunacion: formData.id_vacunacion,
            estado: formData.estado,
            fecha_vacunacion: formData.fecha_vacunacion,
            dosis: formData.dosis,
            id_user_create: idUsuario           
        };

        const result = await axiosInstance.post(`esquema-vacunacion`, data, {
            headers: { Authorization: token }
        });

        return result.data;
    } catch (error) {
        console.error("Error al esquema-vacunacion:", error.response?.data || error.message);
        throw error;
    }
};
