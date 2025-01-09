import { useForm } from 'react-hook-form';
import { Dialog } from '@/components/ui';
import InputForm from '@/views/common/form/InputForm';
import Button from '@/components/ui/Button';
import {defaultValuesPC} from '../../one/modals/defaultValuesSeccionOne';
import validationSeccionOne from '../../../../../../../validation/validationSeccionOne';

export default function ModalPerimetroCefalico({ isOpen, onClose, onRequestClose }) {
    const { control, handleSubmit, formState: { errors } } = useForm({defaultValues: defaultValuesPC});

    const onSubmit = (data: any) => {
        console.log("Datos enviados:", data);
        onClose();
    };

    return (
        <Dialog
            isOpen={isOpen}
            onClose={onClose}
            onRequestClose={onRequestClose}
        >
            <div className="flex flex-col h-full space-y-4">
                <h5 className="text-lg font-bold">Perímetro Cefálico</h5>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col space-y-4"
                >
                    <InputForm
                        control={control}
                        name="perimetroCefalico"
                        label="Perímetro Cefálico al diagnóstico (<2 años)"
                        inputPlaceholder="Ingrese el valor en cm"
                        rules={validationSeccionOne.perimetroCefalico}
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
