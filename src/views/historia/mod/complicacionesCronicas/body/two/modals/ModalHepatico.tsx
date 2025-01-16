import { useForm } from 'react-hook-form';
import { Dialog } from '@/components/ui';
import Button from '@/components/ui/Button';
import validationSeccionTwoCronicas from '../../../../../../../validation/validationSeccionTwoCronicas';
import { defaultValuesHepatico } from '../../two/modals/defaultValuesSeccionTwoCronicas';
import InputSelect from '@/views/common/form/InputSelect';

export default function ModalHepatico({ isOpen, onClose, onRequestClose }) {
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: defaultValuesHepatico,
    });

    const onSubmit = (data: any) => {
        console.log('Datos enviados:', data);
        onClose();
    };

    const optionsHepatico = [
        { value: 'si', label: 'Sí' },
        { value: 'no', label: 'No' },
    ];

    return (
        <Dialog
            width={800}
            height={500}
            isOpen={isOpen}
            onClose={onClose}
            onRequestClose={onRequestClose}
        >
            <div className="flex flex-col h-full space-y-4">
                <h5 className="text-lg font-bold">Hepático</h5>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                    <InputSelect
                        control={control}
                        name="hepatitisViralCronica"
                        label="Hepatitis Viral Crónica"
                        options={optionsHepatico}
                        validation={validationSeccionTwoCronicas.hepatitisViralCronica}
                        errors={errors}
                        placeholder="Seleccione una opción"
                        className="col-span-2"
                    
                    />

                    <InputSelect
                        control={control}
                        name="esplenomegalia"
                        label="Esplenomegalia"
                        options={optionsHepatico}
                        validation={validationSeccionTwoCronicas.esplenomegalia}
                        errors={errors}
                        placeholder="Seleccione una opción"
                        className="col-span-2"
                        
                    />

                    <InputSelect
                        control={control}
                        name="hiperesplenismo"
                        label="Hiperesplenismo"
                        options={optionsHepatico}
                        validation={validationSeccionTwoCronicas.hiperesplenismo}
                        errors={errors}
                        placeholder="Seleccione una opción"
                        className="col-span-2"
                        
                    />

                    <div className="flex justify-end col-span-2">
                        <Button type="submit" className="ml-2">
                            Guardar
                        </Button>
                    </div>
                </form>
            </div>
        </Dialog>
    );
}
