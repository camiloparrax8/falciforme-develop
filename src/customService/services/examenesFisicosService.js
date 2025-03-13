import axiosInstance from "../adapters/axiosInstance";
// import { buscarHcOpenById } from '@/customService/services/historiaClinicaService';


export const crearExamenFisico = async (token, formData) => {
    try {
        // const id_hc_open = await buscarHcOpenById(formData.id_paciente);
        const data = {
            id_paciente: parseInt(formData.id_paciente),
            frecuencia_cardiaca: parseInt(formData.frecuencia_cardiaca),
            frecuencia_respiratoria: parseInt(formData.frecuencia_respiratoria),
            saturacion_oxigeno: parseFloat(formData.saturacion_oxigeno),
            tension_arterial: formData.tension_arterial,
            peso: parseFloat(formData.peso),
            talla: parseFloat(formData.talla),
            percentil: parseFloat(formData.percentil),
            imc: parseFloat(formData.imc),
            deficit_zinc: formData.deficit_zinc === 'true',
            deficit_acido_folico: formData.deficit_acido_folico === 'true',
            deficit_vitamina_d: formData.deficit_vitamina_d === 'true',
            desnutricion: formData.desnutricion === 'true',
            obesidad: formData.obesidad === 'true',
            perimetro_cefalico: parseFloat(formData.perimetro_cefalico),
            vision: formData.vision,
            examen_boca: formData.formData_boca,
            examen_nariz: formData.formData_nariz,
            examen_oidos: formData.formData_oidos,
            caries: formData.caries === 'true',
            cuello: formData.cuello,
            cardio_pulmunar: formData.cardio_pulmunar,
            condicion_abdominal: formData.condicion_abdominal,
            tanner: formData.tanner,
            extremidades_observacion: formData.extremidades_observacion,
            extremidades_estado_piel: formData.extremidades_estado_piel,
            extremidades_condicion: formData.extremidades_condicion,
            estado: true,
            id_user_create: formData.id_user_create,
        }

        const result = await axiosInstance.post(`/historia-clinica/examenes-fisicos/`, data, {
            headers: { Authorization: token },
        })

        return result.data;
    } catch (error) {
        console.error("Error al crear el examen físico:", error.response?.data || error.message);
        throw error;
    }
};
