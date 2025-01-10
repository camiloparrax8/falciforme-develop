import { useForm } from 'react-hook-form';
import { Dialog } from '@/components/ui';
import SelectMultiple from '@/views/common/form/SelectMultiple';
import Button from '@/components/ui/Button';
import validationSeccionTwoCronicas from '../../../../../../../validation/validationSeccionTwoCronicas';
import { defaultValuesCardiacas } from '../../two/modals/defaultValuesSeccionTwoCronicas';
import InputSelect from '@/views/common/form/InputSelect';

export default function ModalCardiacas({ isOpen, onClose, onRequestClose }) {
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: defaultValuesCardiacas,
    });

    const onSubmit = (data: any) => {
        console.log('Datos enviados:', data);
        onClose();
    };

    const optionsCardiacas = [
        { value: 'si', label: 'Sí' },
        { value: 'no', label: 'No' },
    ];

    return (
        <Dialog
            isOpen={isOpen}
            onClose={onClose}
            onRequestClose={onRequestClose}
        >
            <div className="flex flex-col h-full space-y-4">
                <h5 className="text-lg font-bold">Cardiacas</h5>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col space-y-4"
                >
                    <InputSelect
                        control={control}
                        name="disfuncionDiastolicaVI"
                        label="Disfunción Diastólica del VI"
                        options={optionsCardiacas}
                        validation={validationSeccionTwoCronicas.disfuncionDiastolicaVI}
                        errors={errors}
                        className="col-span-2"
                        placeholder="Disfunción Diastólica del VI"
                       
                    />

                    <InputSelect
                        control={control}
                        name="sobrecargaFerrica"
                        label="Sobrecarga Férrica"
                        options={optionsCardiacas}
                        validation={validationSeccionTwoCronicas.sobrecargaFerrica}
                        errors={errors}
                        className="col-span-2"
                        placeholder="Sobrecarga Férrica"
                    />

                    <InputSelect
                        control={control}
                        name="trombosis"
                        label="Trombosis"
                        options={optionsCardiacas}
                        validation={validationSeccionTwoCronicas.trombosis}
                        errors={errors}
                        className="col-span-2"
                        placeholder="Trombosis"
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
