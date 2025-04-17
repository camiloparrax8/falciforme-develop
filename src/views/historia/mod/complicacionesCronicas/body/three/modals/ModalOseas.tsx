import { useForm } from 'react-hook-form';
import { Dialog } from '@/components/ui';
import InputForm from '@/views/common/form/InputForm';
import InputSelect from '@/views/common/form/InputSelect';
import Button from '@/components/ui/Button';
import validationSeccionThreeCronicas from '../../../../../../../validation/validationSeccionThreeCronicas';
import { defaultValuesOseas } from '../../three/modals/defaultValuesSeccionThreeCronicas';
import { useComplicacionesCronicas } from '@/hooks/useComplicacionesCronicas';
import { useUpdateComplicacionesCronicas } from '@/hooks/useUpdateComplicacionesCronicas';
import { useEffect, useState, useCallback } from 'react';
import { useToken, useSessionUser } from '@/store/authStore';
import { useParams, useNavigate } from 'react-router-dom';
import { buscarComplicacionesCronicasPorIdPaciente } from '@/customService/services/complicacionesCronicasService';

export default function ModalOseas({ isOpen, onClose, onRequestClose }) {
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
        setValue
    } = useForm({
        defaultValues: defaultValuesOseas,
    });

    const { complicacionData, setComplicacionData, actualizarComplicacion } = useComplicacionesCronicas();
    const { updateOseas, isLoading } = useUpdateComplicacionesCronicas();
    const [showMessage, setShowMessage] = useState(false);
    const [result, setResult] = useState(null);
    const [existeRegistro, setExisteRegistro] = useState(false);
    const { token } = useToken();
    const { user } = useSessionUser();
    const navigate = useNavigate();
    const { id_paciente } = useParams();

    const verificarExistenciaRegistro = useCallback(() => {
        if (!complicacionData) return false;

        const tieneOsteonecrosis = 
            complicacionData.osteonecrosis !== undefined && 
            complicacionData.osteonecrosis !== null;

        const tieneDeformidadesOseas = 
            complicacionData.deformidades_oseas !== undefined && 
            complicacionData.deformidades_oseas !== null;

        const tieneOsteopenia = 
            complicacionData.osteopenia !== undefined && 
            complicacionData.osteopenia !== null;

        const tieneHuesoComprometido = 
            complicacionData.hueso_comprometido !== undefined && 
            complicacionData.hueso_comprometido !== null;

        const tieneGradoDiscapacidad = 
            complicacionData.grado_discapacidad !== undefined && 
            complicacionData.grado_discapacidad !== null;

        return tieneOsteonecrosis || tieneDeformidadesOseas || tieneOsteopenia || 
               tieneHuesoComprometido || tieneGradoDiscapacidad;
    }, [complicacionData]);

    const manejarErrorAutenticacion = useCallback(() => {
        setResult({
            success: false,
            message: 'Su sesión ha expirado. Por favor, inicie sesión nuevamente.',
        });
        setShowMessage(true);
        
        // Cerrar el modal después de un breve retraso
        setTimeout(() => {
            if (onClose) onClose();
            
            // Redirigir al login
            navigate('/login');
        }, 2000);
    }, [navigate, onClose]);

    const actualizarContexto = useCallback(async () => {
        if (!id_paciente || !token) return;

        try {
            const response = await buscarComplicacionesCronicasPorIdPaciente(token, id_paciente);
            
            if (response.status === 'success' && response.data) {
                setComplicacionData(response.data);
            }
        } catch (error) {
            console.error('Error al actualizar datos de complicaciones:', error);
            
            // Verificar si es un error de autenticación
            if (error.response && error.response.status === 401) {
                manejarErrorAutenticacion();
            }
        }
    }, [id_paciente, token, setComplicacionData, manejarErrorAutenticacion]);

    useEffect(() => {
        let isMounted = true;
        
        if (isOpen && isMounted) {
            actualizarContexto();
        }
        
        return () => {
            isMounted = false;
        };
    }, [isOpen]);

    useEffect(() => {
        if (isOpen && complicacionData) {
            const tieneRegistro = verificarExistenciaRegistro();
            
            if (tieneRegistro) {
                // Establecer valores de los campos select
                reset({
                    osteonecrosis: complicacionData.osteonecrosis ? 'Si' : 'No',
                    deformidades_osea: complicacionData.deformidades_osea ? 'Si' : 'No',
                    osteopenia: complicacionData.osteopenia ? 'Si' : 'No',
                });

                // Establecer valores de los campos de texto usando setValue
                setValue('huesoComprometido', tieneRegistro ? String(complicacionData.huesos_comprometidos || '') : '');
                setValue('gradoDiscapacidad', tieneRegistro ? String(complicacionData.grado_discapacidad || '') : '');
            } else {
                reset(defaultValuesOseas);
            }
            
            setExisteRegistro(tieneRegistro);
        } else if (isOpen) {
            reset(defaultValuesOseas);
            setExisteRegistro(false);
        }
    }, [isOpen, complicacionData, reset, setValue, verificarExistenciaRegistro]);

    const onSubmit = async (data: any) => {
        try {
            if (!id_paciente) {
                throw new Error('ID del paciente no proporcionado');
            }

            if (!token) {
                throw new Error('No hay token de autenticación. Por favor, inicie sesión nuevamente.');
            }

            const datosFormateados = {
                osteonecrosis: data.osteonecrosis === 'Si',
                deformidadesOsea: data.deformidades_osea === 'Si',
                osteopenia: data.osteopenia === 'Si',
                huesoComprometido: data.huesoComprometido || '',
                gradoDiscapacidad: data.gradoDiscapacidad || '',
                huesosComprometidos: data.huesoComprometido || '',
            };

            const result = await updateOseas(datosFormateados);
            
            if (result) {
                await actualizarContexto();
                await actualizarComplicacion();
                setResult({
                    success: true,
                    message: 'Complicaciones óseas actualizadas correctamente',
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
            console.error('Error al actualizar complicaciones óseas:', error);
            
            // Verificar si es un error de autenticación
            if (error.response && error.response.status === 401) {
                manejarErrorAutenticacion();
            } else {
                setResult({
                    success: false,
                    message: error.message || 'Error al actualizar las complicaciones óseas',
                });
                setShowMessage(true);
            }
        }
    };

    const options = [
        { value: 'Si', label: 'Si' },
        { value: 'No', label: 'No' },
    ];

    return (
        <Dialog
            width={1200}
            height={450}
            isOpen={isOpen}
            onClose={onClose}
            onRequestClose={onRequestClose}
        >
            <div className="flex flex-col h-full space-y-4">
                <h5 className="text-lg font-bold">Oseas</h5>

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
                    className="grid grid-cols-1 gap-2"
                >
                    {/* Campos de texto */}
                    <div className="grid grid-cols-2 gap-4">
                        <InputForm
                            control={control}
                            name="huesoComprometido"
                            label="Hueso Comprometido"
                            inputPlaceholder="Especifique el hueso comprometido"
                            rules={validationSeccionThreeCronicas.huesoComprometido}
                            errors={errors}
                            className="col-span-1"
                            disabled={existeRegistro}
                        />

                        <InputForm
                            control={control}
                            name="gradoDiscapacidad"
                            label="Grado de Discapacidad"
                            inputPlaceholder="Ingrese el grado de discapacidad"
                            rules={validationSeccionThreeCronicas.gradoDiscapacidad}
                            errors={errors}
                            className="col-span-1"
                            disabled={existeRegistro}
                        />
                    </div>

                    {/* Campos select */}
                    <div className="grid grid-cols-3 gap-4">
                        <InputSelect
                            control={control}
                            name="osteonecrosis"
                            label="Osteonecrosis"
                            options={options}
                            validation={validationSeccionThreeCronicas.osteonecrosis}
                            errors={errors}
                            placeholder="Seleccione una opción"
                            className="col-span-1"
                            disabled={existeRegistro}
                        />

                        <InputSelect
                            control={control}
                            name="deformidades_osea"
                            label="Deformidades Óseas"
                            options={options}
                            validation={validationSeccionThreeCronicas.deformidadesOseas}
                            errors={errors}
                            placeholder="Seleccione una opción"
                            className="col-span-1"
                            disabled={existeRegistro}
                        />

                        <InputSelect
                            control={control}
                            name="osteopenia"
                            label="Osteopenia"
                            options={options}
                            validation={validationSeccionThreeCronicas.osteopenia}
                            errors={errors}
                            placeholder="Seleccione una opción"
                            className="col-span-1"
                            disabled={existeRegistro}
                        />
                    </div>

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
       
  