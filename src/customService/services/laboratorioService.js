import axiosInstance from "@/customService/adapters/axiosInstance";

export const crearLaboratorio = async (token, formData) => {
    try {
        const data = {
            id_paciente: parseInt(formData.id_paciente),
            hematies: parseFloat(formData.hematies),
            hematocritos: parseFloat(formData.hematocritos),
            mch: parseFloat(formData.mch),
            rdw: parseFloat(formData.rdw),
            hemoglobina: parseFloat(formData.hemoglobina),
            mcv: parseFloat(formData.mcv),
            mchc: parseFloat(formData.mchc),
            id_user_create: formData.id_user_create,
        };

        const result = await axiosInstance.post(`/historia-clinica/laboratorios`, data, {
            headers: { Authorization: token },
        });

        return result.data;
    } catch (error) {
        console.error("Error al crear el laboratorio:", error.response?.data || error.message);
        throw error;
    }
};

export const obtenerLaboratoriosPorPaciente = async (token, idPaciente) => {
    try {
        if (!idPaciente) {
            console.error("ID de paciente no proporcionado en obtenerLaboratoriosPorPaciente");
            throw new Error("ID de paciente no proporcionado");
        }

        const idPacienteNumerico = parseInt(idPaciente);

        if (isNaN(idPacienteNumerico)) {
            console.error(`ID de paciente inválido: ${idPaciente}`);
            throw new Error("ID de paciente inválido");
        }

        const url = `/historia-clinica/laboratorios/${idPacienteNumerico}`;

        const result = await axiosInstance.get(
            url,
            { headers: { Authorization: token } }
        );

        if (result.data) {
            if (result.data.data) {
                return {
                    status: 'success',
                    data: result.data.data
                };
            } else if (Array.isArray(result.data)) {
                return {
                    status: 'success',
                    data: result.data.length > 0 ? result.data : null
                };
            } else {
                return {
                    status: 'success',
                    data: result.data
                };
            }
        } else {
            return {
                status: 'success',
                data: null
            };
        }
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return {
                status: 'error',
                message: "No se encontraron laboratorios",
                data: null
            };
        }
        console.error("Error al consultar laboratorios:", error.response?.data || error.message);
        return {
            status: 'error',
            message: error.response?.data?.message || error.message,
            data: null
        };
    }
};

export const eliminarLogicamenteLaboratorio = async (token, idLaboratorio) => {
    try {
        const response = await axiosInstance.put(
            `/historia-clinica/laboratorios/${idLaboratorio}`,
            { is_deleted: true },
            {
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json',
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error('Error al eliminar laboratorio:', error);
        return {
            status: 'error',
            message: error.response?.data?.message || 'Error al eliminar laboratorio',
        };
    }
};