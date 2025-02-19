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

export const actualizarAcompañante = async (token, formData) => {
  
    console.log("formdata que recibe el servicio", formData);
    try {
        const data = {
            idPaciente: formData.idPaciente,
            idAcompanante: formData.idAcompanante,
        }
       
        console.log("data que organiza el servicio antes de hacer el put", formData);
       

        const result = await axiosInstance.put(`/paciente/acompanante`, data, {
            headers: { Authorization: token },
        })

        return result.data
    } catch (error) {
        console.error(
            'Error al actualizar acompanante:',
            error.response?.data || error.message,
        )
        throw error
    }
}

