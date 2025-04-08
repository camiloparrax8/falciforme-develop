import { useForm } from 'react-hook-form';
import { Dialog } from '@/components/ui';
import Button from '@/components/ui/Button';
import validationSeccionTwoCronicas from '../../../../../../../validation/validationSeccionTwoCronicas';
import { defaultValuesHepatico } from '../../two/modals/defaultValuesSeccionTwoCronicas';
import InputSelect from '@/views/common/form/InputSelect';
import { useComplicacionesCronicas } from '@/hooks/useComplicacionesCronicas';
import { useUpdateComplicacionesCronicas } from '@/hooks/useUpdateComplicacionesCronicas';
import { useEffect, useState, useCallback } from 'react';
import { useToken, useSessionUser } from '@/store/authStore';
import { useParams } from 'react-router-dom';
import { buscarComplicacionesCronicasPorIdPaciente } from '@/customService/services/complicacionesCronicasService';

export default function ModalHepatico({ isOpen, onClose, onRequestClose }) {
    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: defaultValuesHepatico,
    });

    const { complicacionData, setComplicacionData, actualizarComplicacion } = useComplicacionesCronicas();
    const { updateHepaticas, isLoading } = useUpdateComplicacionesCronicas();
    const [showMessage, setShowMessage] = useState(false);
    const [result, setResult] = useState(null);
    const [existeRegistro, setExisteRegistro] = useState(false);
    const { token } = useToken();
    const { user } = useSessionUser();
    const { id_paciente } = useParams();

    const verificarExistenciaRegistro = useCallback(() => {
        if (!complicacionData) return false;

        const tieneHepatitis = 
            complicacionData.hepatitis_viral_cronica !== undefined && 
            complicacionData.hepatitis_viral_cronica !== null;

        const tieneEsplenomegalia = 
            complicacionData.esplenomegalia !== undefined && 
            complicacionData.esplenomegalia !== null;

        const tieneHiperesplenismo = 
            complicacionData.hiperesplenismo !== undefined && 
            complicacionData.hiperesplenismo !== null;

        return tieneHepatitis || tieneEsplenomegalia || tieneHiperesplenismo;
    }, [complicacionData]);

    const actualizarContexto = useCallback(async () => {
        if (!id_paciente || !token) return;

        try {
            const response = await buscarComplicacionesCronicasPorIdPaciente(token, id_paciente);
            
            if (response.status === 'success' && response.data) {
                setComplicacionData(response.data);
            }
        } catch (error) {
            console.error('Error al actualizar datos hepáticos:', error);
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
            
            if (tieneRegistro) {
                reset({
                    hepatitisViralCronica: complicacionData.hepatitis_viral_cronica ? 'Si' : 'No',
                    esplenomegalia: complicacionData.esplenomegalia ? 'Si' : 'No',
                    hiperesplenismo: complicacionData.hiperesplenismo ? 'Si' : 'No',
                });
            } else {
                reset(defaultValuesHepatico);
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

            const datosFormateados = {
                hepatitisViralCronica: data.hepatitisViralCronica === 'Si',
                esplenomegalia: data.esplenomegalia === 'Si',
                hiperesplenismo: data.hiperesplenismo === 'Si',
            };

            const result = await updateHepaticas(datosFormateados);
            
            if (result) {
                await actualizarContexto();
                await actualizarComplicacion();
                setResult({
                    success: true,
                    message: 'Complicaciones hepáticas actualizadas correctamente',
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
            console.error('Error al actualizar complicaciones hepáticas:', error);
            setResult({
                success: false,
                message: error.message || 'Error al actualizar las complicaciones hepáticas',
            });
            setShowMessage(true);
        }
    };

    const optionsHepatico = [
        { value: 'Si', label: 'Si' },
        { value: 'No', label: 'No' },
    ];

    return (
        <Dialog
            width={800}
            height={500}
            isOpen={isOpen}
            onClose={onClose}
            onRequestClose={onRequestClose}
        >
            <div className="flex flex-col h-full space-y-4">
                <h5 className="text-lg font-bold">Hepático</h5>

                {showMessage && result && (
                    <div className={`p-2 rounded ${result.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
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
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                    <InputSelect
                        control={control}
                        name="hepatitisViralCronica"
                        label="Hepatitis Viral Crónica"
                        options={optionsHepatico}
                        validation={validationSeccionTwoCronicas.hepatitisViralCronica}
                        errors={errors}
                        placeholder="Seleccione una opción"
                        className="col-span-2"
                        disabled={existeRegistro}
                    />

                    <InputSelect
                        control={control}
                        name="esplenomegalia"
                        label="Esplenomegalia"
                        options={optionsHepatico}
                        validation={validationSeccionTwoCronicas.esplenomegalia}
                        errors={errors}
                        placeholder="Seleccione una opción"
                        className="col-span-2"
                        disabled={existeRegistro}
                    />

                    <InputSelect
                        control={control}
                        name="hiperesplenismo"
                        label="Hiperesplenismo"
                        options={optionsHepatico}
                        validation={validationSeccionTwoCronicas.hiperesplenismo}
                        errors={errors}
                        placeholder="Seleccione una opción"
                        className="col-span-2"
                        disabled={existeRegistro}
                    />

                    <div className="flex justify-end col-span-2">
                        <Button type="submit" className="ml-2" disabled={isLoading || existeRegistro}>
                            {isLoading ? 'Guardando...' : 'Guardar'}
                        </Button>
                    </div>
                </form>
            </div>
        </Dialog>
    );
}
