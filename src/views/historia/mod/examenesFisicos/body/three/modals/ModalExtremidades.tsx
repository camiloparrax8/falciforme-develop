import { useForm } from 'react-hook-form';
import { Dialog } from '@/components/ui';
import InputForm from '@/views/common/form/InputForm';
import SelectMultiple from '@/views/common/form/SelectMultiple';
import Button from '@/components/ui/Button';
import validationSeccionThree from '../../../../../../../validation/validationSeccionThree';
import { defaultValuesExtremidades } from '../../three/modals/defaultValuesSeccionThree';

export default function ModalExtremidades({ isOpen, onClose, onRequestClose }) {
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: defaultValuesExtremidades,
    });

    const onSubmit = (data: any) => {
        console.log('Datos enviados:', data);
        onClose();
    };

    const opcionesExtremidades = [
        { value: 'edemas', label: 'Edemas' },
        { value: 'ulceras', label: 'Úlceras' },
    ];

    return (
        <Dialog
            isOpen={isOpen}
            onClose={onClose}
            onRequestClose={onRequestClose}
        >
            <div className="flex flex-col h-full space-y-4">
                <h5 className="text-lg font-bold">Extremidades</h5>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col space-y-4"
                >
                    <InputForm
                        control={control}
                        name="observacion"
                        label="Observación"
                        inputPlaceholder="Ingrese observaciones"
                        rules={validationSeccionThree.observacion}
                        errors={errors}
                        className="col-span-3"
                        value=""
                    />

                    <InputForm
                        control={control}
                        name="piel"
                        label="Estado de la piel"
                        inputPlaceholder="Describa el estado de la piel"
                        rules={validationSeccionThree.piel}
                        errors={errors}
                        className="col-span-3"
                        value=""
                    />

                    <SelectMultiple
                        control={control}
                        name="edemasUlceras"
                        label="Edemas y Úlceras"
                        className="col-span-3"
                        placeholder="Seleccione las condiciones"
                        options={opcionesExtremidades}
                        validation={validationSeccionThree.edemasUlceras}
                        defaultValue={[]}
                        errors={errors}
                    />

                    <div className="flex justify-end">
                        <Button
                            type="button"
                            className="mr-2"
                            onClick={onClose}
                        >
                            Cancelar
                        </Button>
                        <Button type="submit" className="ml-2">
                            Guardar
                        </Button>
                    </div>
                </form>
            </div>
        </Dialog>
    );
}
