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


export const CrearPerinatologico = async (token, idUsuario, idPaciente, formData) => {
    try {
        const data = {
            peso_al_nacer: formData.peso_al_nacer,
            talla_al_nacer: formData.talla_al_nacer,
            nota: formData.nota,
            condicion_al_nacer: formData.condicion_al_nacer,
            cuidado_neonatal: formData.cuidado_neonatal,
            etirico_neonatal: formData.etirico_neonatal,
            id_paciente: idPaciente,
            id_user_create: idUsuario,
        };

        const result = await axiosInstance.post(`/antecedente-perinatologico`, data, {
            headers: { Authorization: token }
        });

        return result.data;
    } catch (error) {
        if (error.response) {
            console.error("Error al crear antecedentes perinatológicos:", error.response.data);
            alert(JSON.stringify(error.response.data, null, 2)); // Muestra los errores en un alert
        } else {
            console.error("Error al crear antecedentes perinatológicos:", error.message);
            alert(error.message);
        }
        throw error;
    }
};
