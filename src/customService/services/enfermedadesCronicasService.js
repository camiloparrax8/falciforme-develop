import axiosInstance from "../adapters/axiosInstance";

export const BuscarEnfermedadCronica= async (token, id) => {
    try {
        const result = await axiosInstance.get(`/enfermedad-cronica/${id}`, {
            headers: { Authorization: token }
        });
        return result.data;
    } catch (error) {
        console.log("Error al buscar la enfermedad cronica:", error.response?.data || error.message);
        throw error; 
    }
};


export const crearEnfermedadCronica = async (token, idUsuario, idPaciente, formData) => {
    try {
        const data = {
            id_paciente: idPaciente, 
            enfermedad: formData.enfermedad,
            enfermedad_especifica: formData.enfermedad_especifica,
            portador: "Sí",  
            linea_parentesco_portador: formData.parentescos, 
            id_user_create: idUsuario
        };

        const result = await axiosInstance.post(`/enfermedad-cronica`, data, {
            headers: { Authorization: token }
        });

        return result.data;
    } catch (error) {
        console.error("Error al crear la enfermedad crónica:", error.response?.data || error.message);
        throw error;
    }
};

