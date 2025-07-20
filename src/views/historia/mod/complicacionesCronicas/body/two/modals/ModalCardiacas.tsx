/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm } from 'react-hook-form';
import { Dialog } from '@/components/ui';
import SelectMultiple from '@/views/common/form/SelectMultiple';
import Button from '@/components/ui/Button';
import validationSeccionTwoCronicas from '../../../../../../../validation/validationSeccionTwoCronicas';
import { defaultValuesCardiacas } from '../../two/modals/defaultValuesSeccionTwoCronicas';
import InputSelect from '@/views/common/form/InputSelect';
import { useComplicacionesCronicas } from '@/hooks/useComplicacionesCronicas';
import { useUpdateComplicacionesCronicas } from '@/hooks/useUpdateComplicacionesCronicas';
import { useEffect, useState, useCallback } from 'react';
import { useToken, useSessionUser } from '@/store/authStore';
import { useParams } from 'react-router-dom';
import { buscarComplicacionesCronicasPorIdPaciente } from '@/customService/services/complicacionesCronicasService';

export default function ModalCardiacas({ isOpen, onClose, onRequestClose }) {
    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: defaultValuesCardiacas,
    });

    const { complicacionData, setComplicacionData, actualizarComplicacion } = useComplicacionesCronicas();
    const { updateCardiacas, isLoading } = useUpdateComplicacionesCronicas();
    const [showMessage, setShowMessage] = useState(false);
    const [result, setResult] = useState(null);
    const [existeRegistro, setExisteRegistro] = useState(false);
    const { token } = useToken();
    const { user } = useSessionUser();
    const { id_paciente } = useParams();

    const verificarExistenciaRegistro = useCallback(() => {
        if (!complicacionData) return false;

        const tieneDisfuncion = 
            complicacionData.disfuncion_diastolica_vii !== undefined && 
            complicacionData.disfuncion_diastolica_vii !== null;

        const tieneSobrecarga = 
            complicacionData.sobrecarga_ferrica !== undefined && 
            complicacionData.sobrecarga_ferrica !== null;

        const tieneTrombosis = 
            complicacionData.trombosis !== undefined && 
            complicacionData.trombosis !== null;

        return tieneDisfuncion || tieneSobrecarga || tieneTrombosis;
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
                    disfuncionDiastolicaVI: complicacionData.disfuncion_diastolica_vii ? 'Si' : 'No',
                    sobrecargaFerrica: complicacionData.sobrecarga_ferrica ? 'Si' : 'No',
                    trombosis: complicacionData.trombosis ? 'Si' : 'No',
                });
            } else {
                reset(defaultValuesCardiacas);
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
                disfuncionDiastolicaVii: data.disfuncionDiastolicaVI === 'Si',
                sobrecargaFerrica: data.sobrecargaFerrica === 'Si',
                trombosis: data.trombosis === 'Si',
            };

            const result = await updateCardiacas(datosFormateados);
            
            // Si tenemos una respuesta del servidor, consideramos que la operación fue exitosa
            if (result) {
                // Actualizar el contexto inmediatamente
                await actualizarContexto();
                await actualizarComplicacion();
                setResult({
                    success: true,
                    message: 'Complicaciones cardíacas actualizadas correctamente',
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
            console.error('Error al actualizar complicaciones cardíacas:', error);
            setResult({
                success: false,
                message: error.message || 'Error al actualizar las complicaciones cardíacas',
            });
            setShowMessage(true);
        }
    };

    const optionsCardiacas = [
        { value: 'Si', label: 'Si' },
        { value: 'No', label: 'No' },
    ];

    return (
        <Dialog
            width={1200}
            height={400}
            isOpen={isOpen}
            onClose={onClose}
            onRequestClose={onRequestClose}
        >
            <div className="flex flex-col h-full space-y-4">
                <h5 className="text-lg font-bold">Cardiacas</h5>

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
                    className="grid grid-cols-1 md:grid-cols-6 gap-2"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <InputSelect
                        control={control}
                        name="disfuncionDiastolicaVI"
                        label="Disfunción Diastólica del VI"
                        options={optionsCardiacas}
                        validation={validationSeccionTwoCronicas.disfuncionDiastolicaVI}
                        errors={errors}
                        className="col-span-2"
                        placeholder="Disfunción Diastólica del VI"
                        disabled={existeRegistro}
                    />

                    <InputSelect
                        control={control}
                        name="sobrecargaFerrica"
                        label="Sobrecarga Férrica"
                        options={optionsCardiacas}
                        validation={validationSeccionTwoCronicas.sobrecargaFerrica}
                        errors={errors}
                        className="col-span-2"
                        placeholder="Sobrecarga Férrica"
                        disabled={existeRegistro}
                    />

                    <InputSelect
                        control={control}
                        name="trombosis"
                        label="Trombosis"
                        options={optionsCardiacas}
                        validation={validationSeccionTwoCronicas.trombosis}
                        errors={errors}
                        className="col-span-2"
                        placeholder="Trombosis"
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
