import { useForm } from 'react-hook-form';
import { Dialog } from '@/components/ui';
import Button from '@/components/ui/Button';
import validationSeccionOneCronicas from '../../../../../../../validation/validationSeccionOneCronicas';
import { defaultValuesCerebrales } from '../../one/modals/defaultValuesSeccionOneCronicas';
import InputSelect from '@/views/common/form/InputSelect';

export default function ModalCerebrales({ isOpen, onClose, onRequestClose }) {
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: defaultValuesCerebrales,
    });

    const onSubmit = (data: any) => {
        console.log('Datos enviados:', data);
        onClose();
    };

    const optionsCerebrales = [
        { value: 'Si', label: 'Si' },
        { value: 'No', label: 'No' },
       
    ];

    return (
        <Dialog
            width={1200}
            height={400}
            isOpen={isOpen}
            onClose={onClose}
            onRequestClose={onRequestClose}
        >
            <div className="flex flex-col h-full space-y-4">
                <h5 className="text-lg font-bold">Cerebrales</h5>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid grid-cols-1 md:grid-cols-6 gap-2"
                >
                    <InputSelect
                        control={control}
                        name="vasculopatiaCerebral"
                        label="Vasculopatía cerebral"
                        options={optionsCerebrales}
                        validation={validationSeccionOneCronicas.vasculopatiaCerebral}
                        errors={errors}
                        className="col-span-2"
                        placeholder="Vasculopatía cerebral"
                    />

                    <InputSelect
                        control={control}
                        name="infartosCerebralesSilentes"
                        label="Infartos cerebrales silentes"
                        options={optionsCerebrales}
                        validation={validationSeccionOneCronicas.infartosCerebralesSilentes}
                        errors={errors}
                        className="col-span-2"
                        placeholder="Infartos cerebrales silentes"
                    />

                    <InputSelect
                        control={control}
                        name="epilepsiaYConvulsiones"
                        label="Epilepsia y convulsiones"
                        options={optionsCerebrales}
                        validation={validationSeccionOneCronicas.epilepsiaYConvulsiones}
                        errors={errors}
                        className="col-span-2"
                        placeholder="Epilepsia y convulsiones"
                    />

                    <InputSelect
                        control={control}
                        name="cefaleasRecurrentes"
                        label="Cefaleas recurrentes"
                        options={optionsCerebrales}
                        validation={validationSeccionOneCronicas.cefaleasRecurrentes}
                        errors={errors}
                        className="col-span-2"
                        placeholder="Cefaleas recurrentes"
                    />

                    <InputSelect
                        control={control}
                        name="deficitCognitivo"
                        label="Déficit cognitivo"
                        options={optionsCerebrales}
                        validation={validationSeccionOneCronicas.deficitCognitivo}
                        errors={errors}
                        className="col-span-2"
                        placeholder="Déficit cognitivo"
                    />

                    <div className="sticky bottom-0 bg-white py-7 flex justify-center">
                        <Button type="submit" className="ml-2">
                            Guardar
                        </Button>
                    </div>
                </form>
            </div>
        </Dialog>
    );
}
