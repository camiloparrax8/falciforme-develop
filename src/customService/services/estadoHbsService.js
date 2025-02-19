import axiosInstance from "../adapters/axiosInstance";

export const BuscarEstadosHBS= async (token, id) => {
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

export const crearEstadoHBS = async (token, idUsuario, idPaciente, formData) => {
    try {
        const data = {
            parentesco: formData.parentesco,
            linea_parentesco: formData.linea_parentesco,
            estado: formData.estado,
            id_paciente: idPaciente,
            id_user_create: idUsuario,
        };

        const result = await axiosInstance.post(`/estado-hbs`, data, {
            headers: { Authorization: token }
        });

        return result.data;
    } catch (error) {
        if (error.response) {
            console.error("Error al crear EstadoHBS:", error.response.data);
            alert(JSON.stringify(error.response.data, null, 2));  // Muestra los errores en un alert
        } else {
            console.error("Error al crear EstadoHBS:", error.message);
            alert(error.message);
        }
        throw error;
    }
};

