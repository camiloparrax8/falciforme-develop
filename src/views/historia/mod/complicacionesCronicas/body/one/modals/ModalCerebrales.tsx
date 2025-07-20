import { useForm } from 'react-hook-form';
import { Dialog } from '@/components/ui';
import Button from '@/components/ui/Button';
import validationSeccionOneCronicas from '../../../../../../../validation/validationSeccionOneCronicas';
import { defaultValuesCerebrales } from '../../one/modals/defaultValuesSeccionOneCronicas';
import InputSelect from '@/views/common/form/InputSelect';
import { useComplicacionesCronicas } from '@/hooks/useComplicacionesCronicas';
import { useUpdateComplicacionesCronicas } from '@/hooks/useUpdateComplicacionesCronicas';
import { useEffect, useState, useCallback } from 'react';
import { useToken, useSessionUser } from '@/store/authStore';
import { useParams } from 'react-router-dom';
import { buscarComplicacionesCronicasPorIdPaciente, crearComplicacionesCronicas, actualizarComplicacionesCronicas } from '@/customService/services/complicacionesCronicasService';

export default function ModalCerebrales({ isOpen, onClose, onRequestClose }) {
    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: defaultValuesCerebrales,
    });

    const { complicacionData, setComplicacionData, actualizarComplicacion } = useComplicacionesCronicas();
    const { isLoading } = useUpdateComplicacionesCronicas();
    const [showMessage, setShowMessage] = useState(false);
    const [result, setResult] = useState(null);
    const [existeRegistro, setExisteRegistro] = useState(false);
    const { token } = useToken();
    const { user } = useSessionUser();
    const { id_paciente } = useParams();

    const verificarExistenciaRegistro = useCallback(() => {
        if (!complicacionData) return false;

        const tieneVasculopatia = 
            complicacionData.vasculopatia_cerebral !== undefined && 
            complicacionData.vasculopatia_cerebral !== null;

        const tieneInfartos = 
            complicacionData.infartos_cerebrales_silentes !== undefined && 
            complicacionData.infartos_cerebrales_silentes !== null;

        const tieneEpilepsia = 
            complicacionData.epilepsia_convulsiones !== undefined && 
            complicacionData.epilepsia_convulsiones !== null;

        const tieneCefaleas = 
            complicacionData.cefaleas_recurrentes !== undefined && 
            complicacionData.cefaleas_recurrentes !== null;

        const tieneDeficit = 
            complicacionData.deficit_cognitivo !== undefined && 
            complicacionData.deficit_cognitivo !== null;

        return tieneVasculopatia || tieneInfartos || tieneEpilepsia || tieneCefaleas || tieneDeficit;
    }, [complicacionData]);

    const actualizarContexto = useCallback(async () => {
        if (!id_paciente || !token) return;

        try {
            const response = await buscarComplicacionesCronicasPorIdPaciente(token, id_paciente);
            
            if (response.status === 'success' && response.data) {
                setComplicacionData(response.data);
            }
        } catch (error) {
            console.error('Error al actualizar datos de complicaciones:', error);
        }
    }, [id_paciente, token, setComplicacionData]);

    useEffect(() => {
        // Si ya se determinó que existe un registro, mantener ese estado
        if (existeRegistro) {
            setExisteRegistro(true)
            return
        }

        if (isOpen) {
            // Actualizar el contexto cuando el modal se abre
            actualizarContexto();
            
            if (complicacionData) {
                // Usar la función verificarExistenciaRegistro para consistencia
                const tieneRegistro = verificarExistenciaRegistro()
                
                // Establecer valores solo si existen
                if (tieneRegistro) {
                    reset({
                        vasculopatiaCerebral: complicacionData.vasculopatia_cerebral ? 'Si' : 'No',
                        infartosCerebralesSilentes: complicacionData.infartos_cerebrales_silentes ? 'Si' : 'No',
                        epilepsiaYConvulsiones: complicacionData.epilepsia_convulsiones ? 'Si' : 'No',
                        cefaleasRecurrentes: complicacionData.cefaleas_recurrentes ? 'Si' : 'No',
                        deficitCognitivo: complicacionData.deficit_cognitivo ? 'Si' : 'No',
                    });
                } else {
                    reset(defaultValuesCerebrales);
                }
                
                // Actualizar el estado de existeRegistro basado en la verificación
                setExisteRegistro(tieneRegistro)
            } else {
                setExisteRegistro(false)
            }
        } else {
            setExisteRegistro(false)
        }
    }, [isOpen, complicacionData, reset, existeRegistro, verificarExistenciaRegistro, actualizarContexto]);

    const onSubmit = async (data: any) => {
        try {
            if (!id_paciente) {
                throw new Error('ID del paciente no proporcionado');
            }

            // Verificar si ya existe una complicación
            if (complicacionData && complicacionData.id) {
                // Actualizar la complicación existente
                const camposActualizados = {
                    vasculopatia_cerebral: data.vasculopatiaCerebral === 'Si',
                    infartos_cerebrales_silentes: data.infartosCerebralesSilentes === 'Si',
                    epilepsia_convulsiones: data.epilepsiaYConvulsiones === 'Si',
                    cefaleas_recurrentes: data.cefaleasRecurrentes === 'Si',
                    deficit_cognitivo: data.deficitCognitivo === 'Si',
                };

                const result = await actualizarComplicacionesCronicas(token, complicacionData.id, camposActualizados);
                
                if (result) {
                    // Actualizar el contexto inmediatamente
                    await actualizarContexto();
                    await actualizarComplicacion();
                    setResult({
                        success: true,
                        message: 'Complicaciones cerebrales actualizadas correctamente',
                        data: result.data,
                    });
                    setShowMessage(true);
                    
                    setTimeout(() => {
                        setShowMessage(false);
                        if (onClose) {
                            onClose();
                        }
                    }, 1000);
                }
            } else {
                // Crear una nueva complicación
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
                
                if (result) {
                    // Actualizar el contexto inmediatamente
                    await actualizarContexto();
                    await actualizarComplicacion();
                    setResult({
                        success: true,
                        message: 'Complicaciones cerebrales creadas correctamente',
                        data: result.data,
                    });
                    setShowMessage(true);
                    
                    setTimeout(() => {
                        setShowMessage(false);
                        if (onClose) {
                            onClose();
                        }
                    }, 1000);
                }
            }
        } catch (error) {
            console.error('Error al procesar complicaciones cerebrales:', error);
            setResult({
                success: false,
                message: error.message || 'Error al procesar las complicaciones cerebrales',
            });
            setShowMessage(true);
        }
    };

    const optionsCerebrales = [
        { value: 'Si', label: 'Si' },
        { value: 'No', label: 'No' },
    ];

    return (
        <Dialog
            width={1200}
            height={400}
            isOpen={isOpen}
            onRequestClose={() => {
                setShowMessage(false);
                onClose();
            }}
            onClose={() => {
                setShowMessage(false);
                onRequestClose();
            }}
        >
            <div className="flex flex-col h-full space-y-4">
                <h5 className="text-lg font-bold">Cerebrales</h5>

                {showMessage && result && (
                    <div
                        className={`p-2 rounded ${result.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                    >
                        {result.message}
                    </div>
                )}

                {existeRegistro && (
                    <div className="bg-yellow-100 text-yellow-800 p-2 rounded">
                        Este registro ya existe y no puede ser modificado.
                    </div>
                )}

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid grid-cols-1 md:grid-cols-6 gap-2"
                >
                    <InputSelect
                        control={control}
                        name="vasculopatiaCerebral"
                        label="Vasculopatía cerebral"
                        options={optionsCerebrales}
                        validation={validationSeccionOneCronicas.vasculopatiaCerebral}
                        errors={errors}
                        className="col-span-2"
                        placeholder="Vasculopatía cerebral"
                        disabled={existeRegistro}
                    />

                    <InputSelect
                        control={control}
                        name="infartosCerebralesSilentes"
                        label="Infartos cerebrales silentes"
                        options={optionsCerebrales}
                        validation={validationSeccionOneCronicas.infartosCerebralesSilentes}
                        errors={errors}
                        className="col-span-2"
                        placeholder="Infartos cerebrales silentes"
                        disabled={existeRegistro}
                    />

                    <InputSelect
                        control={control}
                        name="epilepsiaYConvulsiones"
                        label="Epilepsia y convulsiones"
                        options={optionsCerebrales}
                        validation={validationSeccionOneCronicas.epilepsiaYConvulsiones}
                        errors={errors}
                        className="col-span-2"
                        placeholder="Epilepsia y convulsiones"
                        disabled={existeRegistro}
                    />

                    <InputSelect
                        control={control}
                        name="cefaleasRecurrentes"
                        label="Cefaleas recurrentes"
                        options={optionsCerebrales}
                        validation={validationSeccionOneCronicas.cefaleasRecurrentes}
                        errors={errors}
                        className="col-span-2"
                        placeholder="Cefaleas recurrentes"
                        disabled={existeRegistro}
                    />

                    <InputSelect
                        control={control}
                        name="deficitCognitivo"
                        label="Déficit cognitivo"
                        options={optionsCerebrales}
                        validation={validationSeccionOneCronicas.deficitCognitivo}
                        errors={errors}
                        className="col-span-2"
                        placeholder="Déficit cognitivo"
                        disabled={existeRegistro}
                    />

                    <div className="sticky bottom-0 bg-white py-7 flex justify-center">
                        <Button type="submit" className="ml-2" disabled={isLoading || existeRegistro}>
                            {isLoading ? 'Guardando...' : 'Guardar'}
                        </Button>
                    </div>
                </form>
            </div>
        </Dialog>
    );
}
