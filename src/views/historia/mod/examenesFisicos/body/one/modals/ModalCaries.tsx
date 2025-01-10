import { useForm } from 'react-hook-form';
import { Dialog } from '@/components/ui';
import InputSelect from '@/views/common/form/InputSelect';
import Button from '@/components/ui/Button';
import validationSeccionOne from '../../../../../../../validation/validationSeccionOne';
import { defaultValuesCaries } from '../../one/modals/defaultValuesSeccionOne';

export default function ModalCaries({ isOpen, onClose, onRequestClose }) {
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: defaultValuesCaries,
    });

    const onSubmit = (data: any) => {
        console.log('Datos enviados:', data);
        onClose();
    };

    const opcionesCaries = [
        { value: 'Si', label: 'Si' },
        { value: 'No', label: 'No' },  
    ];

    return (
        <Dialog
            isOpen={isOpen}
            onClose={onClose}
            onRequestClose={onRequestClose}
        >
            <div className="flex flex-col h-full space-y-4">
                <h5 className="text-lg font-bold">Caries</h5>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col space-y-4"
                >
                    <InputSelect
                        control={control}
                        name="caries"
                        label="¿Tiene caries?"
                        options={opcionesCaries}
                        validation={validationSeccionOne.caries}
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
