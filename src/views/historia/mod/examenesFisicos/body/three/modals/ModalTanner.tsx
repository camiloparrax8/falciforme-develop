import { useForm } from 'react-hook-form';
import { Dialog } from '@/components/ui';
import InputSelect from '@/views/common/form/InputSelect';
import Button from '@/components/ui/Button';
import validationSeccionThree from '../../../../../../../validation/validationSeccionThree';
import { defaultValuesTanner } from '../../three/modals/defaultValuesSeccionThree';

export default function ModalTanner({ isOpen, onClose, onRequestClose }) {
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: defaultValuesTanner,
    });

    const onSubmit = (data: any) => {
        console.log('Datos enviados:', data);
        onClose();
    };

    const opcionesTanner = [
        { value: '1', label: 'Estadio 1' },
        { value: '2', label: 'Estadio 2' },
        { value: '3', label: 'Estadio 3' },
        { value: '4', label: 'Estadio 4' },
        { value: '5', label: 'Estadio 5' },
    ];

    return (
        <Dialog
            isOpen={isOpen}
            onClose={onClose}
            onRequestClose={onRequestClose}
        >
            <div className="flex flex-col h-full space-y-4">
                <h5 className="text-lg font-bold">Estadio de Tanner</h5>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col space-y-4"
                >
                    <InputSelect
                        control={control}
                        name="estadioTanner"
                        label="Estadio de Tanner"
                        options={opcionesTanner}
                        validation={validationSeccionThree.estadioTanner}
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
