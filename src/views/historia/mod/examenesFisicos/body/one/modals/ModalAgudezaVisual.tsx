import { Dialog } from '@/components/ui';
import InputForm from '@/views/common/form/InputForm';
import { useForm } from 'react-hook-form';
import validationSeccionOne from  '../../../../../../../validation/validationSeccionOne';
import {defaultValuesVisual} from '../../one/modals/defaultValuesSeccionOne';
import Button from '@/components/ui/Button';
export default function ModalAgudezaVisual({ isOpen, onClose, onRequestClose }) {
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: defaultValuesVisual });

    const onSubmit = (data: any) => {
        console.log('Datos del formulario:', data);
        onClose(); 
    };

    return (
        <Dialog
            isOpen={isOpen}
            onClose={onClose}
            onRequestClose={onRequestClose}
        >
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4 h-full">
                <h5 className="text-lg font-semibold">Agudeza Visual</h5>
                
                <InputForm
                    control={control}
                    name="visualizacion"
                    label="Visión"
                    inputPlaceholder="Ingrese la visión"
                    rules={validationSeccionOne.visualizacion}
                    className="col-span-3"
                    errors={errors}
                    value = ""
                />

                <div className="flex justify-end">
                    
                        <Button type="submit" className="ml-2">
                            Guardar
                        </Button>
                </div>
            </form>
        </Dialog>
    );
}

