import { useForm } from 'react-hook-form';
import { Dialog } from '@/components/ui';
import Button from '@/components/ui/Button';
import validationSeccionOneCronicas from '../../../../../../../validation/validationSeccionOneCronicas';
import { defaultValuesOculares } from '../../one/modals/defaultValuesSeccionOneCronicas';
import InputSelect from '@/views/common/form/InputSelect';
import { useComplicacionesCronicas } from '@/hooks/useComplicacionesCronicas';
import { useUpdateComplicacionesCronicas } from '@/hooks/useUpdateComplicacionesCronicas';
import { useEffect, useState, useCallback } from 'react';
import { useToken, useSessionUser } from '@/store/authStore';
import { useParams } from 'react-router-dom';
import { buscarComplicacionesCronicasPorIdPaciente } from '@/customService/services/complicacionesCronicasService';

export default function ModalOculares({ isOpen, onClose, onRequestClose }) {
    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: defaultValuesOculares,
    });

    const { complicacionData, setComplicacionData, actualizarComplicacion } = useComplicacionesCronicas();
    const { updateOculares, isLoading } = useUpdateComplicacionesCronicas();
    const [showMessage, setShowMessage] = useState(false);
    const [result, setResult] = useState(null);
    const [existeRegistro, setExisteRegistro] = useState(false);
    const { token } = useToken();
    const { user } = useSessionUser();
    const { id_paciente } = useParams();

    const verificarExistenciaRegistro = useCallback(() => {
        if (!complicacionData) return false;

        const tieneRetinopatia = 
            complicacionData.retinopatia_drepanocitica !== undefined && 
            complicacionData.retinopatia_drepanocitica !== null;

        const tieneHemorragias = 
            complicacionData.hemorragias_vitreas !== undefined && 
            complicacionData.hemorragias_vitreas !== null;

        const tieneNeovascularizacion = 
            complicacionData.neovascularizacion_retiniana !== undefined && 
            complicacionData.neovascularizacion_retiniana !== null;

        const tieneIritis = 
            complicacionData.iritis_uveitis !== undefined && 
            complicacionData.iritis_uveitis !== null;

        const tieneOclusion = 
            complicacionData.oclusion_vasos_retinianos !== undefined && 
            complicacionData.oclusion_vasos_retinianos !== null;

        return tieneRetinopatia || tieneHemorragias || tieneNeovascularizacion || tieneIritis || tieneOclusion;
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
        if (isOpen) {
            actualizarContexto();
        }
    }, [isOpen, actualizarContexto]);

    useEffect(() => {
        if (isOpen && complicacionData) {
            const tieneRegistro = verificarExistenciaRegistro();
            
            // Establecer valores solo si existen
            if (tieneRegistro) {
                reset({
                    retinopatiaDrepanocitica: complicacionData.retinopatia_drepanocitica ? 'Si' : 'No',
                    hemorragiasVitreas: complicacionData.hemorragias_vitreas ? 'Si' : 'No',
                    neovascularizacionRetiniana: complicacionData.neovascularizacion_retiniana ? 'Si' : 'No',
                    iritisUveitis: complicacionData.iritis_uveitis ? 'Si' : 'No',
                    oclusionVasosRetinianos: complicacionData.oclusion_vasos_retinianos ? 'Si' : 'No',
                });
            } else {
                reset(defaultValuesOculares);
            }
            
            setExisteRegistro(tieneRegistro);
        } else {
            setExisteRegistro(false);
        }
    }, [isOpen, complicacionData, reset, verificarExistenciaRegistro]);

    const onSubmit = async (data: any) => {
        try {
            if (!id_paciente) {
                throw new Error('ID del paciente no proporcionado');
            }

        
            // Convertir los valores a booleanos para el backend
            const datosFormateados = {
                retinopatiaDrepanocitica: data.retinopatiaDrepanocitica === 'Si',
                hemorragiasVitreas: data.hemorragiasVitreas === 'Si',
                neovascularizacionRetiniana: data.neovascularizacionRetiniana === 'Si',
                iritisUveitis: data.iritisUveitis === 'Si',
                oclusionVasosRetinianos: data.oclusionVasosRetinianos === 'Si',
            };

            
            const result = await updateOculares(datosFormateados);
            console.log('Respuesta de actualización:', result);
            
            // Si tenemos una respuesta del servidor, consideramos que la operación fue exitosa
            if (result) {
                // Actualizar el contexto inmediatamente
                await actualizarContexto();
                await actualizarComplicacion();
                setResult({
                    success: true,
                    message: 'Complicaciones oculares actualizadas correctamente',
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
        } catch (error) {
            console.error('Error al actualizar complicaciones oculares:', error);
            setResult({
                success: false,
                message: error.message || 'Error al actualizar las complicaciones oculares',
            });
            setShowMessage(true);
        }
    };

    const optionsOculares = [
        { value: 'Si', label: 'Si' },
        { value: 'No', label: 'No' },
    ];

    return (
        <Dialog
            width={1200}
            height={400}
            isOpen={isOpen}
            onClose={() => {
                setShowMessage(false);
                onClose();
            }}
            onRequestClose={() => {
                setShowMessage(false);
                onRequestClose();
            }}
        >
            <div className="flex flex-col h-full space-y-4">
                <h5 className="text-lg font-bold">Oculares</h5>

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
                        name="retinopatiaDrepanocitica"
                        label="Retinopatía drepanocítica"
                        options={optionsOculares}
                        validation={validationSeccionOneCronicas.retinopatiaDrepanocitica}
                        errors={errors}
                        className="col-span-2"
                        placeholder="Retinopatía drepanocítica"
                        disabled={existeRegistro}
                    />

                    <InputSelect
                        control={control}
                        name="hemorragiasVitreas"
                        label="Hemorragias vítreas"
                        options={optionsOculares}
                        validation={validationSeccionOneCronicas.hemorragiasVitreas}
                        errors={errors}
                        className="col-span-2"
                        placeholder="Hemorragias vítreas"
                        disabled={existeRegistro}
                    />

                    <InputSelect
                        control={control}
                        name="neovascularizacionRetiniana"
                        label="Neovascularización retiniana"
                        options={optionsOculares}
                        validation={validationSeccionOneCronicas.neovascularizacionRetiniana}
                        errors={errors}
                        className="col-span-2"
                        placeholder="Neovascularización retiniana"
                        disabled={existeRegistro}
                    />

                    <InputSelect
                        control={control}
                        name="iritisUveitis"
                        label="Iritis o uveítis"
                        options={optionsOculares}
                        validation={validationSeccionOneCronicas.iritisOUveitis}
                        errors={errors}
                        className="col-span-2"
                        placeholder="Iritis o uveítis"
                        disabled={existeRegistro}
                    />

                    <InputSelect
                        control={control}
                        name="oclusionVasosRetinianos"
                        label="Oclusión de vasos retinianos"
                        options={optionsOculares}
                        validation={validationSeccionOneCronicas.oclusionVasosRetinianos}
                        errors={errors}
                        className="col-span-2"
                        placeholder="Oclusión de vasos retinianos"
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
