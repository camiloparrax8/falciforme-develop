import { useForm } from 'react-hook-form';
import { Dialog } from '@/components/ui';
import SelectMultiple from '@/views/common/form/SelectMultiple';
import Button from '@/components/ui/Button';
import validationValuesSeccionTwo from '../../../../../../../validation/validationSeccionTwo';
import { defaultValuesAbdominal } from '../../two/modals/defaultValuesSeccionTwo';

export default function ModalAbdominal({ isOpen, onClose, onRequestClose }) {
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: defaultValuesAbdominal,
    });

    const onSubmit = (data: any) => {
        console.log('Datos enviados:', data);
        onClose();
    };
    
    const opcionesAbdominal = [
        { value: 'esplenomegalia', label: 'Esplenomegalia' },
        { value: 'hepatomegalia', label: 'Hepatomegalia' }, 
    ];

    return (
        <Dialog
            isOpen={isOpen}
            onClose={onClose}
            onRequestClose={onRequestClose}
        >
            <div className="flex flex-col h-full space-y-4">
                <h5 className="text-lg font-bold">Examen Abdominal</h5>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col space-y-4"
                >
                    <SelectMultiple
                        control={control}
                        name="condicionesAbdominales"
                        label="Condiciones Abdominales"
                        placeholder="Seleccione las condiciones"
                        className="col-span-3"
                        options={opcionesAbdominal}
                        validation={validationValuesSeccionTwo.condicionesAbdominales}
                        defaultValue={[]}
                        errors={errors}
                    />

                    <div className="flex justify-end">
                        <Button type="submit" className="ml-2">
                            Guardar
                        </Button>
                    </div>
                </form>
            </div>
        </Dialog>
    );
}
