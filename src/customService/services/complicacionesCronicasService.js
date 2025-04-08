import axiosInstance from "../adapters/axiosInstance";

export const crearComplicacionesCronicas = async (token, formData) => {
    try {
        const data = {
            id_paciente: parseInt(formData.id_paciente),
            vasculopatia_cerebral: formData.vasculopatia_cerebral,
            infartos_cerebrales_silentes: formData.infartos_cerebrales_silentes,
            epilepsia_convulsiones: formData.epilepsia_convulsiones,
            cefaleas_recurrentes: formData.cefaleas_recurrentes,
            deficit_cognitivo: formData.deficit_cognitivo,
            retinopatia_drepanocitica: formData.retinopatia_drepanocitica || null,
            hemorragias_vitreas: formData.hemorragias_vitreas || null,
            neovascularizacion_retiniana: formData.neovascularizacion_retiniana || null,
            iritis_uveitis: formData.iritis_uveitis || null,
            oclusion_vasos_retinianos: formData.oclusion_vasos_retinianos || null,
            disfuncion_diastolica_vii: formData.disfuncion_diastolica_vii || null,
            sobrecarga_ferrica: formData.sobrecarga_ferrica || null,
            trombosis: formData.trombosis || null,
            hipertension_pulmonar: formData.hipertension_pulmonar || null,
            vrt: formData.vrt || null,
            numero_crisis: formData.numero_crisis ? parseInt(formData.numero_crisis) : null,
            tratamientos: formData.tratamientos || null,
            hipomexia: formData.hipomexia || null,
            saos: formData.saos || null,
            edpfc_tratamiento: formData.edpfc_tratamiento || null,
            hepatitis_viral_cronica: formData.hepatitis_viral_cronica || null,
            esplenomegalia: formData.esplenomegalia || null,
            hiperesplenismo: formData.hiperesplenismo || null,
            nefropatia: formData.nefropatia || null,
            acidosis_tubular: formData.acidosis_tubular || null,
            priapismo_recurrente: formData.priapismo_recurrente || null,
            proteinuria: formData.proteinuria || null,
            hipotensia: formData.hipotensia || null,
            hematuria_necrosis_papilar: formData.hematuria_necrosis_papilar || null,
            enfermedad_renal_cronica: formData.enfermedad_renal_cronica || null,
            huesos_comprometidos: formData.huesos_comprometidos || null,
            osteonecrosis: formData.osteonecrosis || null,
            osteopenia: formData.osteopenia || null,
            grado_discapacidad: formData.grado_discapacidad || null,
            deformidades_osea: formData.deformidades_osea || null,
            estado: true,
            id_user_create: formData.id_user_create,
        };
 

        const result = await axiosInstance.post(
            '/historia-clinica/complicaciones-cronicas',
            data,
            { headers: { Authorization: token } }
        );

        if (result.data.status === 'error') {
            throw new Error(result.data.message);
        }

        return result.data;
    } catch (error) {
        console.error("Error al crear las complicaciones crónicas:", error.response?.data || error.message);
        throw error;
    }
};

export const actualizarComplicacionesCronicas = async (token, id, camposActualizar) => {
    try {
        if (!id) {
            throw new Error("ID de complicación no proporcionado");
        }

      
        const result = await axiosInstance.put(
            `/historia-clinica/complicaciones-cronicas/${id}`,
            camposActualizar,
            { headers: { Authorization: token } }
        );

        if (!result.data) {
            throw new Error("No se encontró la complicación crónica");
        }

        return result.data;
    } catch (error) {
        console.error("Error al actualizar las complicaciones crónicas:", error.response?.data || error.message);
        throw error;
    }
};

export const buscarComplicacionesCronicasPorIdPaciente = async (token, idPaciente) => {
    try {
        if (!idPaciente) {
            throw new Error("ID de paciente no proporcionado");
        }

        const result = await axiosInstance.get(
            `/historia-clinica/complicaciones-cronicas/${idPaciente}`,
            { headers: { Authorization: token } }
        );

        if (result.data.status === 'error') {
            throw new Error(result.data.message);
        }

        return result.data;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return {
                status: 'error',
                message: "No se encontraron complicaciones crónicas para el paciente",
                data: null
            };
        }
        console.error("Error al consultar complicaciones crónicas:", error.response?.data || error.message);
        throw error;
    }
}; 