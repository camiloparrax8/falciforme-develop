import { useForm } from 'react-hook-form';
import { Dialog } from '@/components/ui';
import InputForm from '@/views/common/form/InputForm';
import Button from '@/components/ui/Button';
import validationSeccionTwoCronicas from '../../../../../../../validation/validationSeccionTwoCronicas';
import { defaultValuesPulmonares } from '../../two/modals/defaultValuesSeccionTwoCronicas';
import InputSelect from '@/views/common/form/InputSelect';
import { useComplicacionesCronicas } from '@/hooks/useComplicacionesCronicas';
import { useUpdateComplicacionesCronicas } from '@/hooks/useUpdateComplicacionesCronicas';
import { useEffect, useState, useCallback } from 'react';
import { useToken, useSessionUser } from '@/store/authStore';
import { useParams, useNavigate } from 'react-router-dom';
import { buscarComplicacionesCronicasPorIdPaciente } from '@/customService/services/complicacionesCronicasService';

export default function ModalPulmonares({ isOpen, onClose, onRequestClose }) {
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
        setValue
    } = useForm({
        defaultValues: defaultValuesPulmonares,
    });

    const { complicacionData, setComplicacionData, actualizarComplicacion } = useComplicacionesCronicas();
    const { updatePulmonares, isLoading } = useUpdateComplicacionesCronicas();
    const [showMessage, setShowMessage] = useState(false);
    const [result, setResult] = useState(null);
    const [existeRegistro, setExisteRegistro] = useState(false);
    const { token } = useToken();
    const { user } = useSessionUser();
    const navigate = useNavigate();
    const { id_paciente } = useParams();

    const verificarExistenciaRegistro = useCallback(() => {
        if (!complicacionData) return false;

        const tieneHipertension = 
            complicacionData.hipertension_pulmonar !== undefined && 
            complicacionData.hipertension_pulmonar !== null;

        const tieneVrt = 
            complicacionData.vrt !== undefined && 
            complicacionData.vrt !== null;

        const tieneCrisisAsma = 
            complicacionData.crisis_asma !== undefined && 
            complicacionData.crisis_asma !== null;

        const tieneTratamientoAsma = 
            complicacionData.tratamiento_asma !== undefined && 
            complicacionData.tratamiento_asma !== null;

        const tieneHipomexia = 
            complicacionData.hipomexia_epfc !== undefined && 
            complicacionData.hipomexia_epfc !== null;

        const tieneSaos = 
            complicacionData.saos_epfc !== undefined && 
            complicacionData.saos_epfc !== null;

        const tieneTratamientoEpfc = 
            complicacionData.tratamiento_epfc !== undefined && 
            complicacionData.tratamiento_epfc !== null;

        return tieneHipertension || tieneVrt || tieneCrisisAsma || tieneTratamientoAsma || 
               tieneHipomexia || tieneSaos || tieneTratamientoEpfc;
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
                    hipertensionPulmonar: complicacionData.hipertension_pulmonar ? 'Si' : 'No',
                    hipomexiaEPFC: complicacionData.hipomexia_epfc ? 'Si' : 'No',
                    saosEPFC: complicacionData.saos_epfc ? 'Si' : 'No',
                });

                // Establecer valores de los campos de texto usando setValue
                setValue('vrt', tieneRegistro ? String(complicacionData.vrt || '') : '');
                setValue('crisisAsma', tieneRegistro ? String(complicacionData.numero_crisis || '') : '');
                setValue('tratamientoAsma', tieneRegistro ? String(complicacionData.tratamientos || '') : '');
                setValue('tratamientoEPFC', tieneRegistro ? String(complicacionData.edpfc_tratamiento || '') : '');
            } else {
                reset(defaultValuesPulmonares);
            }
            
            setExisteRegistro(tieneRegistro);
        } else if (isOpen) {
            reset(defaultValuesPulmonares);
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
                hipertensionPulmonar: data.hipertensionPulmonar === 'Si',
                vrt: data.vrt || '',
                numeroCrisis: data.crisisAsma || '',
                tratamientos: data.tratamientoAsma || '',
                hipomexia: data.hipomexiaEPFC === 'Si',
                saos: data.saosEPFC === 'Si',
                edpfcTratamiento: data.tratamientoEPFC || '',
            };

            const result = await updatePulmonares(datosFormateados);
            
            if (result) {
                await actualizarContexto();
                await actualizarComplicacion();
                setResult({
                    success: true,
                    message: 'Complicaciones pulmonares actualizadas correctamente',
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
            console.error('Error al actualizar complicaciones pulmonares:', error);
            
            // Verificar si es un error de autenticación
            if (error.response && error.response.status === 401) {
                manejarErrorAutenticacion();
            } else {
                setResult({
                    success: false,
                    message: error.message || 'Error al actualizar las complicaciones pulmonares',
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
            height={570}
            isOpen={isOpen}
            onClose={onClose}
            onRequestClose={onRequestClose}
        >
            <div className="flex flex-col h-full space-y-4">
                <h5 className="text-lg font-bold">Pulmonares</h5>

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
                    {/* Hipertensión Pulmonar y VRT en la misma fila */}
                    <div className="grid grid-cols-2 gap-4">
                        <InputSelect
                            control={control}
                            name="hipertensionPulmonar"
                            label="Hipertensión Pulmonar"
                            options={options}
                            validation={validationSeccionTwoCronicas.hipertensionPulmonar}
                            errors={errors}
                            placeholder="Seleccione una opción"
                            className="col-span-1"
                            disabled={existeRegistro}
                        />

                        <InputForm
                            control={control}
                            name="vrt"
                            label="VRT"
                            inputPlaceholder="Ingrese VRT"
                            rules={validationSeccionTwoCronicas.vrt}
                            errors={errors}
                            className="col-span-1"
                            disabled={existeRegistro}
                        />
                    </div>

                    {/* Sección Asma y Sibilancias */}
                    <h6 className="font-semibold">Sección Asma y Sibilancias</h6>
                    <div className="grid grid-cols-3 gap-4">
                        <InputForm
                            control={control}
                            name="crisisAsma"
                            label="Número de crisis / año"
                            inputPlaceholder="Ingrese el número de crisis"
                            rules={validationSeccionTwoCronicas.crisisAsma}
                            errors={errors}
                            className="col-span-1"
                            disabled={existeRegistro}
                        />

                        <InputForm
                            control={control}
                            name="tratamientoAsma"
                            label="Tratamientos"
                            inputPlaceholder="Describa los tratamientos para el asma y las sibilancias"
                            rules={validationSeccionTwoCronicas.tratamientoAsma}
                            errors={errors}
                            className="col-span-2"
                            disabled={existeRegistro}
                        />
                    </div>

                    {/* Sección EPFC */}
                    <h6 className="font-semibold">Sección EPFC</h6>
                    <div className="grid grid-cols-3 gap-4">
                        <InputSelect
                            control={control}
                            name="hipomexiaEPFC"
                            label="Hipomexia"
                            options={options}
                            validation={validationSeccionTwoCronicas.hipomexiaEPFC}
                            errors={errors}
                            placeholder="Seleccione una opción"
                            className="col-span-1"
                            disabled={existeRegistro}
                        />

                        <InputSelect
                            control={control}
                            name="saosEPFC"
                            label="SAOS"
                            options={options}
                            validation={validationSeccionTwoCronicas.saosEPFC}
                            errors={errors}
                            placeholder="Seleccione una opción"
                            className="col-span-1"
                            disabled={existeRegistro}
                        />

                        <InputForm
                            control={control}
                            name="tratamientoEPFC"
                            label="Tratamiento"
                            inputPlaceholder="Describa el tratamiento para la EPFC"
                            rules={validationSeccionTwoCronicas.tratamientoEPFC}
                            errors={errors}
                            className="col-span-1"
                            disabled={existeRegistro}
                        />
                    </div>

                    <div className="flex justify-end py-1">
                        <Button type="submit" className="ml-2" disabled={isLoading || existeRegistro}>
                            {isLoading ? 'Guardando...' : 'Guardar'}
                        </Button>
                    </div>
                </form>
            </div>
        </Dialog>
    );
}
