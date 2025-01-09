import { useForm } from 'react-hook-form';
import { Dialog } from '@/components/ui';
import InputForm from '@/views/common/form/InputForm';
import Button from '@/components/ui/Button';
import validationSeccionOne from  '../../../../../../../validation/validationSeccionOne';
import { defaultValuesExamenORL } from '../../one/modals/defaultValuesSeccionOne';

export default function ModalExamenORL({ isOpen, onClose, onRequestClose }) {
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: defaultValuesExamenORL,
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
                <h5 className="text-lg font-bold">Examen ORL</h5>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col space-y-4"
                >
                    <InputForm
                        control={control}
                        name="boca"
                        label="Examen de la Boca"
                        inputPlaceholder="Describa el examen de la boca"
                        rules={validationSeccionOne.boca}
                        errors={errors}
                        className="col-span-3"
                        value=""
                    />

                    <InputForm
                        control={control}
                        name="nariz"
                        label="Examen de la Nariz"
                        inputPlaceholder="Describa el examen de la nariz"
                        rules={validationSeccionOne.nariz}
                        errors={errors}
                        className="col-span-3"
                        value=""
                    />

                    <InputForm
                        control={control}
                        name="oidos"
                        label="Examen de los Oídos"
                        inputPlaceholder="Describa el examen de los oídos"
                        rules={validationSeccionOne.oidos}
                        errors={errors}
                        className="col-span-3"
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
