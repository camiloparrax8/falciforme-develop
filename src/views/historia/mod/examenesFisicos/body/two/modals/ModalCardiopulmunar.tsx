import { useForm } from 'react-hook-form';
import { Dialog } from '@/components/ui';
import InputForm from '@/views/common/form/InputForm';
import Button from '@/components/ui/Button';
import validationValuesSeccionTwo from '../../../../../../../validation/validationSeccionTwo';
import { defaultValuesCardiopulmonar } from '../../two/modals/defaultValuesSeccionTwo';

export default function ModalCardiopulmonar({ isOpen, onClose, onRequestClose }) {
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: defaultValuesCardiopulmonar,
    });

    const onSubmit = (data: any) => {
        console.log('Datos enviados:', data);
        onClose();
    };

    return (
        <Dialog
            isOpen={isOpen}
            onClose={onClose}
            onRequestClose={onRequestClose}
        >
            <div className="flex flex-col h-full space-y-4">
                <h5 className="text-lg font-bold">Cardiopulmonar</h5>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col space-y-4"
                >
                    <InputForm
                        control={control}
                        name="observacion"
                        label="Observación"
                        inputPlaceholder="Ingrese la observación"
                        rules={validationValuesSeccionTwo.observacion}
                        className="col-span-3"
                        errors={errors}
                        value=""
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
