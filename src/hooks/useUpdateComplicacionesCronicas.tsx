import { useState } from 'react';
import { useToken, useSessionUser } from '@/store/authStore';
import { useComplicacionesCronicas } from './useComplicacionesCronicas';
import { actualizarComplicacionesCronicas, crearComplicacionesCronicas } from '@/customService/services/complicacionesCronicasService';
import { useParams } from 'react-router-dom';

interface UpdateResult {
    success: boolean;
    message: string;
    data?: Record<string, unknown>;
}

interface DatosCerebrales {
    vasculopatiaCerebral: string;
    infartosCerebralesSilentes: string;
    epilepsiaYConvulsiones: string;
    cefaleasRecurrentes: string;
    deficitCognitivo: string;
}

interface DatosOculares {
    retinopatiaDrepanocitica: boolean;
    hemorragiasVitreas: boolean;
    neovascularizacionRetiniana: boolean;
    iritisUveitis: boolean;
    oclusionVasosRetinianos: boolean;
}

interface DatosCardiacas {
    disfuncionDiastolicaVii: boolean;
    sobrecargaFerrica: boolean;
    trombosis: boolean;
}

interface DatosPulmonares {
    hipertensionPulmonar: boolean;
    vrt: boolean;
    numeroCrisis: number;
    tratamientos: string;
    hipomexia: boolean;
    saos: boolean;
    edpfcTratamiento: boolean;
}

interface DatosHepaticas {
    hepatitisViralCronica: boolean;
    esplenomegalia: boolean;
    hiperesplenismo: boolean;
}

interface DatosGenitourinario {
    nefropatia: boolean;
    acidosisTubular: boolean;
    priapismoRecurrente: boolean;
    proteinuria: boolean;
    hipotensia: boolean;
    hematuriaNecrosisPapilar: boolean;
    enfermedadRenalCronica: boolean;
}

interface DatosOseas {
    huesosComprometidos: string;
    osteonecrosis: boolean;
    osteopenia: boolean;
    gradoDiscapacidad: string;
    deformidadesOsea: boolean;
}

export const useUpdateComplicacionesCronicas = () => {
    const { token } = useToken();
    const { complicacionData, actualizarComplicacion } = useComplicacionesCronicas();
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<UpdateResult | null>(null);
    const { user } = useSessionUser();
    const { id_paciente } = useParams();

    const updateCerebrales = async (data: DatosCerebrales) => {
        setIsLoading(true);
        setResult(null);

        try {
            

            if (!id_paciente) {
                throw new Error('ID del paciente no proporcionado');
            }

            const nuevaComplicacion = {
                id_paciente: id_paciente,
                fecha_diagnostico: new Date().toISOString(),
                estado: 'Activo',
                id_user_create: user.id,
                vasculopatia_cerebral: data.vasculopatiaCerebral === 'Si',
                infartos_cerebrales_silentes: data.infartosCerebralesSilentes === 'Si',
                epilepsia_convulsiones: data.epilepsiaYConvulsiones === 'Si',
                cefaleas_recurrentes: data.cefaleasRecurrentes === 'Si',
                deficit_cognitivo: data.deficitCognitivo === 'Si',
            };

            const result = await crearComplicacionesCronicas(token, nuevaComplicacion);
            
            if (result.status === 'success') {
                await actualizarComplicacion();
                setResult({
                    success: true,
                    message: 'Complicaciones cerebrales creadas correctamente',
                    data: result.data,
                });
            } else {
                throw new Error(result.message || 'Error al crear la complicación crónica');
            }
        } catch (error) {
            setResult({
                success: false,
                message: error.message || 'Error al crear las complicaciones cerebrales',
            });
        } finally {
            setIsLoading(false);
        }
    };

    // Actualizar Campos Oculares
    async function updateOculares(datos: DatosOculares) {
        setIsLoading(true);
        setResult(null);

        try {
            if (!complicacionData?.id) {
                throw new Error('No hay una complicación crónica activa');
            }

            const camposActualizados = {
                retinopatia_drepanocitica: datos.retinopatiaDrepanocitica,
                hemorragias_vitreas: datos.hemorragiasVitreas,
                neovascularizacion_retiniana: datos.neovascularizacionRetiniana,
                iritis_uveitis: datos.iritisUveitis,
                oclusion_vasos_retinianos: datos.oclusionVasosRetinianos,
            };

            const response = await actualizarComplicacionesCronicas(
                token,
                complicacionData.id,
                camposActualizados
            );

            setResult({
                success: true,
                message: 'Campos oculares actualizados correctamente',
                data: response,
            });

            return response;
        } catch (error) {
            const errorMessage = error.message || 'Error al actualizar los campos oculares';
            setResult({
                success: false,
                message: errorMessage,
            });
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    // Actualizar Campos Cardíacos
    async function updateCardiacas(datos: DatosCardiacas) {
        setIsLoading(true);
        setResult(null);

        try {
            if (!complicacionData?.id) {
                throw new Error('No hay una complicación crónica activa');
            }

            const camposActualizados = {
                disfuncion_diastolica_vii: datos.disfuncionDiastolicaVii,
                sobrecarga_ferrica: datos.sobrecargaFerrica,
                trombosis: datos.trombosis,
            };

            const response = await actualizarComplicacionesCronicas(
                token,
                complicacionData.id,
                camposActualizados
            );

            setResult({
                success: true,
                message: 'Campos cardíacos actualizados correctamente',
                data: response,
            });

            return response;
        } catch (error) {
            const errorMessage = error.message || 'Error al actualizar los campos cardíacos';
            setResult({
                success: false,
                message: errorMessage,
            });
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    // Actualizar Retinopatía
    

    // Actualizar Nefropatía
    const updateNefropatia = async (datos: { nefropatia: boolean }) => {
        setIsLoading(true);
        setResult(null);

        try {
            if (!complicacionData?.id) {
                throw new Error('No hay una complicación crónica activa');
            }

            const camposActualizados = {
                nefropatia: datos.nefropatia,
            };

            const response = await actualizarComplicacionesCronicas(
                token,
                complicacionData.id,
                camposActualizados
            );

            setResult({
                success: true,
                message: 'Nefropatía actualizada correctamente',
                data: response,
            });

            return response;
        } catch (error) {
            const errorMessage = error.message || 'Error al actualizar la nefropatía';
            setResult({
                success: false,
                message: errorMessage,
            });
            throw error;
        } finally {
            setIsLoading(false);
        }
    }




    // Actualizar Campos Pulmonares
    async function updatePulmonares(datos: DatosPulmonares) {
        setIsLoading(true);
        setResult(null);

        try {
            if (!complicacionData?.id) {
                throw new Error('No hay una complicación crónica activa');
            }

            const camposActualizados = {
                hipertension_pulmonar: datos.hipertensionPulmonar,
                vrt: datos.vrt,
                numero_crisis: datos.numeroCrisis,
                tratamientos: datos.tratamientos,
                hipomexia: datos.hipomexia,
                saos: datos.saos,
                edpfc_tratamiento: datos.edpfcTratamiento,
            };

            const response = await actualizarComplicacionesCronicas(
                token,
                complicacionData.id,
                camposActualizados
            );

            setResult({
                success: true,
                message: 'Campos pulmonares actualizados correctamente',
                data: response,
            });

            return response;
        } catch (error) {
            const errorMessage = error.message || 'Error al actualizar los campos pulmonares';
            setResult({
                success: false,
                message: errorMessage,
            });
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    // Actualizar Campos Hepáticos
    async function updateHepaticas(datos: DatosHepaticas) {
        setIsLoading(true);
        setResult(null);

        try {
            if (!complicacionData?.id) {
                throw new Error('No hay una complicación crónica activa');
            }

            const camposActualizados = {
                hepatitis_viral_cronica: datos.hepatitisViralCronica,
                esplenomegalia: datos.esplenomegalia,
                hiperesplenismo: datos.hiperesplenismo,
            };

            const response = await actualizarComplicacionesCronicas(
                token,
                complicacionData.id,
                camposActualizados
            );

            setResult({
                success: true,
                message: 'Campos hepáticos actualizados correctamente',
                data: response,
            });

            return response;
        } catch (error) {
            const errorMessage = error.message || 'Error al actualizar los campos hepáticos';
            setResult({
                success: false,
                message: errorMessage,
            });
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    // Actualizar Campos Genitourinarios
    async function updateGenitourinario(datos: DatosGenitourinario) {
        setIsLoading(true);
        setResult(null);

        try {
            if (!complicacionData?.id) {
                throw new Error('No hay una complicación crónica activa');
            }

            const camposActualizados = {
                nefropatia: datos.nefropatia,
                acidosis_tubular: datos.acidosisTubular,
                priapismo_recurrente: datos.priapismoRecurrente,
                proteinuria: datos.proteinuria,
                hipotensia: datos.hipotensia,
                hematuria_necrosis_papilar: datos.hematuriaNecrosisPapilar,
                enfermedad_renal_cronica: datos.enfermedadRenalCronica,
            };

            const response = await actualizarComplicacionesCronicas(
                token,
                complicacionData.id,
                camposActualizados
            );

            setResult({
                success: true,
                message: 'Campos genitourinarios actualizados correctamente',
                data: response,
            });

            return response;
        } catch (error) {
            const errorMessage = error.message || 'Error al actualizar los campos genitourinarios';
            setResult({
                success: false,
                message: errorMessage,
            });
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    // Actualizar Campos Óseos
    async function updateOseas(datos: DatosOseas) {
        setIsLoading(true);
        setResult(null);

        try {
            if (!complicacionData?.id) {
                throw new Error('No hay una complicación crónica activa');
            }

            const camposActualizados = {
                huesos_comprometidos: datos.huesosComprometidos,
                osteonecrosis: datos.osteonecrosis,
                osteopenia: datos.osteopenia,
                grado_discapacidad: datos.gradoDiscapacidad,
                deformidades_osea: datos.deformidadesOsea,
            };

            const response = await actualizarComplicacionesCronicas(
                token,
                complicacionData.id,
                camposActualizados
            );

            setResult({
                success: true,
                message: 'Campos óseos actualizados correctamente',
                data: response,
            });

            return response;
        } catch (error) {
            const errorMessage = error.message || 'Error al actualizar los campos óseos';
            setResult({
                success: false,
                message: errorMessage,
            });
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    return {
        isLoading,
        result,
        updateCerebrales,
        updateOculares,
        updateCardiacas,
        updatePulmonares,
        updateHepaticas,
        updateGenitourinario,
        updateOseas
    };
}