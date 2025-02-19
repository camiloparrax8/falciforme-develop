import axiosInstance from "../adapters/axiosInstance";

export const crearPrimeraConsulta = async (token, idUsuario, idPaciente, formData) => {
    try {
        const data = {
            fecha_hematologica: formData.fecha_hematologica,
            edad_consulta: formData.edad_consulta,
            fecha_inicio_sintoma: formData.fecha_inicio_sintoma,
            parentescos_multiples: formData.parentescos_multiples,
            id_paciente: idPaciente,
            id_user_create: idUsuario,
        };

        const result = await axiosInstance.post(`/primera-consulta`, data, {
            headers: { Authorization: token }
        });

        return result.data;
    } catch (error) {
        console.error("Error al crear la primera consulta:", error);
        throw error;
    }
};
