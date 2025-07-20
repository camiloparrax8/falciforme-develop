import { useForm } from 'react-hook-form';
import { Dialog } from '@/components/ui';
import InputSelect from '@/views/common/form/InputSelect';
import Button from '@/components/ui/Button';
import validationSeccionThreeCronicas from '../../../../../../../validation/validationSeccionThreeCronicas';
import { defaultValuesGenitourinario } from '../../three/modals/defaultValuesSeccionThreeCronicas';
import { useComplicacionesCronicas } from '@/hooks/useComplicacionesCronicas';
import { useUpdateComplicacionesCronicas } from '@/hooks/useUpdateComplicacionesCronicas';
import { useEffect, useState, useCallback } from 'react';
import { useToken, useSessionUser } from '@/store/authStore';
import { useParams } from 'react-router-dom';
import { buscarComplicacionesCronicasPorIdPaciente } from '@/customService/services/complicacionesCronicasService';

export default function ModalGenitourinario({ isOpen, onClose, onRequestClose }) {
    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: defaultValuesGenitourinario,
    });

    const { complicacionData, setComplicacionData, actualizarComplicacion } = useComplicacionesCronicas();
    const { updateGenitourinario, isLoading } = useUpdateComplicacionesCronicas();
    const [showMessage, setShowMessage] = useState(false);
    const [result, setResult] = useState(null);
    const [existeRegistro, setExisteRegistro] = useState(false);
    const { token } = useToken();
    const { user } = useSessionUser();
    const { id_paciente } = useParams();

    const verificarExistenciaRegistro = useCallback(() => {
        if (!complicacionData) return false;

        const tieneNefropatia = 
            complicacionData.nefropatia !== undefined && 
            complicacionData.nefropatia !== null;

        const tieneHipostenia = 
            complicacionData.hipostenia !== undefined && 
            complicacionData.hipostenia !== null;

        const tieneAcidosisTubular = 
            complicacionData.acidosis_tubular !== undefined && 
            complicacionData.acidosis_tubular !== null;

        return tieneNefropatia || tieneHipostenia || tieneAcidosisTubular;
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
            
            if (tieneRegistro) {
                reset({
                    nefropatia: complicacionData.nefropatia ? 'Si' : 'No',
                    hipostenia: complicacionData.hipostenia ? 'Si' : 'No',
                    acidosisTubular: complicacionData.acidosis_tubular ? 'Si' : 'No',
                    hematuriaNecrosisRenal: complicacionData.hematuria_necrosis_renal ? 'Si' : 'No',
                    priapismoRecurrente: complicacionData.priapismo_recurrente ? 'Si' : 'No',
                    enfermedadRenalCronica: complicacionData.enfermedad_renal_cronica ? 'Si' : 'No',
                    proteinuria: complicacionData.proteinuria ? 'Si' : 'No',
                });
            } else {
                reset(defaultValuesGenitourinario);
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
                nefropatia: data.nefropatia === 'Si',
                hipostenia: data.hipostenia === 'Si',
                acidosisTubular: data.acidosisTubular === 'Si',
                hematuriaNecrosisRenal: data.hematuriaNecrosisRenal === 'Si',
                priapismoRecurrente: data.priapismoRecurrente === 'Si',
                enfermedadRenalCronica: data.enfermedadRenalCronica === 'Si',
                proteinuria: data.proteinuria === 'Si',
                hipotensia: false,
                hematuriaNecrosisPapilar: data.hematuriaNecrosisRenal === 'Si',
            };

            const result = await updateGenitourinario(datosFormateados);
            
            if (result) {
                await actualizarContexto();
                await actualizarComplicacion();
                setResult({
                    success: true,
                    message: 'Complicaciones genitourinarias actualizadas correctamente',
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
            console.error('Error al actualizar complicaciones genitourinarias:', error);
            setResult({
                success: false,
                message: error.message || 'Error al actualizar las complicaciones genitourinarias',
            });
            setShowMessage(true);
        }
    };

    const options = [
        { value: 'Si', label: 'Si' },
        { value: 'No', label: 'No' },
    ];

    return (
        <Dialog
            width={1200}
            height={500}
            isOpen={isOpen}
            onClose={onClose}
            onRequestClose={onRequestClose}
        >
            <div className="flex flex-col h-full space-y-4">
                <h5 className="text-lg font-bold">Genitourinario</h5>

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
                        name="nefropatia"
                        label="Nefropatía"
                        options={options}
                        validation={validationSeccionThreeCronicas.nefropatia}
                        errors={errors}
                        placeholder="Seleccione una opción"
                        className="col-span-2"
                        disabled={existeRegistro}
                    />

                    <InputSelect
                        control={control}
                        name="hipostenia"
                        label="Hipostenia"
                        options={options}
                        validation={validationSeccionThreeCronicas.hipostenia}
                        errors={errors}
                        placeholder="Seleccione una opción"
                        className="col-span-2"
                        disabled={existeRegistro}
                    />

                    <InputSelect
                        control={control}
                        name="acidosisTubular"
                        label="Acidosis Tubular"
                        options={options}
                        validation={validationSeccionThreeCronicas.acidosisTubular}
                        errors={errors}
                        placeholder="Seleccione una opción"
                        className="col-span-2"
                        disabled={existeRegistro}
                    />

                    <InputSelect
                        control={control}
                        name="hematuriaNecrosisRenal"
                        label="Hematuria y Necrosis Papilar Renal"
                        options={options}
                        validation={validationSeccionThreeCronicas.hematuriaNecrosisRenal}
                        errors={errors}
                        placeholder="Seleccione una opción"
                        className="col-span-2"
                        disabled={existeRegistro}
                    />

                    <InputSelect
                        control={control}
                        name="priapismoRecurrente"
                        label="Priapismo Recurrente"
                        options={options}
                        validation={validationSeccionThreeCronicas.priapismoRecurrente}
                        errors={errors}
                        placeholder="Seleccione una opción"
                        className="col-span-2"
                        disabled={existeRegistro}
                    />

                    <InputSelect
                        control={control}
                        name="enfermedadRenalCronica"
                        label="Enfermedad Renal Crónica"
                        options={options}
                        validation={validationSeccionThreeCronicas.enfermedadRenalCronica}
                        errors={errors}
                        placeholder="Seleccione una opción"
                        className="col-span-2"
                        disabled={existeRegistro}
                    />

                    <InputSelect
                        control={control}
                        name="proteinuria"
                        label="Proteinuria"
                        options={options}
                        validation={validationSeccionThreeCronicas.proteinuria}
                        errors={errors}
                        placeholder="Seleccione una opción"
                        className="col-span-2"
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
