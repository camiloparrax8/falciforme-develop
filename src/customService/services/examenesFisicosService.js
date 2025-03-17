import axiosInstance from "../adapters/axiosInstance";
// import { buscarHcOpenById } from '@/customService/services/historiaClinicaService';


export const crearExamenFisico = async (token, formData) => {
    try {
        // const id_hc_open = await buscarHcOpenById(formData.id_paciente);
        const data = {
            id_paciente: parseInt(formData.id_paciente),
            frecuencia_cardiaca: formData.frecuencia_cardiaca ? parseInt(formData.frecuencia_cardiaca) : null,
            frecuencia_respiratoria: formData.frecuencia_respiratoria ? parseInt(formData.frecuencia_respiratoria) : null,
            saturacion_oxigeno: formData.saturacion_oxigeno ? parseFloat(formData.saturacion_oxigeno) : null,
            tension_arterial: formData.tension_arterial || null,
            peso: formData.peso ? parseFloat(formData.peso) : null,
            talla: formData.talla ? parseFloat(formData.talla) : null,
            percentil: formData.percentil ? parseFloat(formData.percentil) : null,
            imc: formData.imc ? parseFloat(formData.imc) : null,
            deficit_zinc: formData.deficit_zinc === 'true',
            deficit_acido_folico: formData.deficit_acido_folico === 'true',
            deficit_vitamina_d: formData.deficit_vitamina_d === 'true',
            desnutricion: formData.desnutricion === 'true',
            obesidad: formData.obesidad === 'true',
            perimetro_cefalico: formData.perimetro_cefalico ? parseFloat(formData.perimetro_cefalico) : null,
            vision: formData.vision || null,
            examen_boca: formData.formData_boca || null,
            examen_nariz: formData.formData_nariz || null,
            examen_oidos: formData.formData_oidos || null,
            caries: formData.caries === 'true',
            cuello: formData.cuello || null,
            cardio_pulmunar: formData.cardio_pulmunar || null,
            condicion_abdominal: formData.condicion_abdominal || null,
            tanner: formData.tanner || null,
            extremidades_observacion: formData.extremidades_observacion || null,
            extremidades_estado_piel: formData.extremidades_estado_piel || null,
            extremidades_condicion: formData.extremidades_condicion || null,
            estado: true,
            id_user_create: formData.id_user_create,
        };

        console.log("Datos enviados al backend:", data);

        const result = await axiosInstance.post(`/historia-clinica/examenes-fisicos/`, data, {
            headers: { Authorization: token },
        });

        return result.data;
    } catch (error) {
        console.error("Error al crear el examen físico:", error.response?.data || error.message);
        throw error;
    }
};

// Consultar si existe un examen físico para un paciente
export const consultarExamenFisicoPorPaciente = async (token, idPaciente) => {
    try {
        if (!idPaciente) {
            throw new Error("ID de paciente no proporcionado");
        }

        const result = await axiosInstance.get(
            `/historia-clinica/examenes-fisicos/${idPaciente}`,
            { headers: { Authorization: token } }
        );

        // La API podría retornar: { message: "...", data: { ... } }
        // o directamente el objeto del examen
        return result.data?.data || result.data;
    } catch (error) {
        // Si el error es 404, significa que no hay examen físico para este paciente
        if (error.response && error.response.status === 404) {
            return null;
        }
        console.error("Error al consultar examen físico:", error.response?.data || error.message);
        throw error;
    }
};

// Nuevo método para actualizar campos específicos del examen físico
export const actualizarCamposExamenFisico = async (token, idExamen, camposActualizados) => {
    try {
        if (!idExamen) {
            throw new Error("ID de examen físico no proporcionado");
        }

        const result = await axiosInstance.put(
            `/historia-clinica/examenes-fisicos/${idExamen}`,
            camposActualizados,
            { headers: { Authorization: token } }
        );

        return result.data;
    } catch (error) {
        console.error("Error al actualizar el examen físico:", error.response?.data || error.message);
        throw error;
    }
};
