import { useForm } from 'react-hook-form';
import { Dialog } from '@/components/ui';
import Button from '@/components/ui/Button';
import validationSeccionOneCronicas from '../../../../../../../validation/validationSeccionOneCronicas';
import { defaultValuesOculares } from '../../one/modals/defaultValuesSeccionOneCronicas';
import InputSelect from '@/views/common/form/InputSelect';

export default function ModalOculares({ isOpen, onClose, onRequestClose }) {
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: defaultValuesOculares,
    });

    const onSubmit = (data: any) => {
        console.log('Datos enviados:', data);
        onClose();
    };

    const optionsOculares = [
        { value: 'si', label: 'Sí' },
        { value: 'no', label: 'No' },
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
                <h5 className="text-lg font-bold">Oculares</h5>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid grid-cols-1 md:grid-cols-6 gap-2"
                >
                    <InputSelect
                        control={control}
                        name="retinopatiaDrepanocitica"
                        label="Retinopatía drepanocítica"
                        options={optionsOculares}
                        validation={validationSeccionOneCronicas.retinopatiaDrepanocitica}
                        errors={errors}
                        className="col-span-2"
                        placeholder="Retinopatía drepanocítica"
                    />

                    <InputSelect
                        control={control}
                        name="hemorragiasVitreas"
                        label="Hemorragias vítreas"
                        options={optionsOculares}
                        validation={validationSeccionOneCronicas.hemorragiasVitreas}
                        errors={errors}
                        className="col-span-2"
                        placeholder="Hemorragias vítreas"
                    />

                    <InputSelect
                        control={control}
                        name="neovascularizacionRetiniana"
                        label="Neovascularización retiniana"
                        options={optionsOculares}
                        validation={validationSeccionOneCronicas.neovascularizacionRetiniana}
                        errors={errors}
                        className="col-span-2"
                        placeholder="Neovascularización retiniana"
                    />

                    <InputSelect
                        control={control}
                        name="iritisOUveitis"
                        label="Iritis o uveítis"
                        options={optionsOculares}
                        validation={validationSeccionOneCronicas.iritisOUveitis}
                        errors={errors}
                        className="col-span-2"
                        placeholder="Iritis o uveítis"
                    />

                    <InputSelect
                        control={control}
                        name="oclusionVasosRetinianos"
                        label="Oclusión de vasos retinianos"
                        options={optionsOculares}
                        validation={validationSeccionOneCronicas.oclusionVasosRetinianos}
                        errors={errors}
                        className="col-span-2"
                        placeholder="Oclusión de vasos retinianos"
                    />

                    <div className="flex justify-end py-7">
                        <Button type="submit" className="ml-2">
                            Guardar
                        </Button>
                    </div>
                </form>
            </div>
        </Dialog>
    );
}
