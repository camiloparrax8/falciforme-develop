import { useForm } from 'react-hook-form';
import { Dialog } from '@/components/ui';
import InputSelect from '@/views/common/form/InputSelect';
import Button from '@/components/ui/Button';
import validationSeccionThreeCronicas from '../../../../../../../validation/validationSeccionThreeCronicas';
import { defaultValuesGenitourinario } from '../../three/modals/defaultValuesSeccionThreeCronicas';

export default function ModalGenitourinario({ isOpen, onClose, onRequestClose }) {
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: defaultValuesGenitourinario, // Valores por defecto
    });

    const onSubmit = (data: any) => {
        console.log('Datos enviados:', data);
        onClose();
    };

    const options = [
        { value: 'si', label: 'Sí' },
        { value: 'no', label: 'No' },
    ];

    return (
        <Dialog
            width={900}
            height={530}
            isOpen={isOpen}
            onClose={onClose}
            onRequestClose={onRequestClose}
        >
            <div className="flex flex-col h-full space-y-4">
                <h5 className="text-lg font-bold">Genitourinario</h5>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                    <InputSelect
                        control={control}
                        name="nefropatia"
                        label="Nefropatía"
                        options={options}
                        validation={validationSeccionThreeCronicas.nefropatia}
                        errors={errors}
                        placeholder="Seleccione una opción"
                        className="col-span-1"
                    />

                    <InputSelect
                        control={control}
                        name="hipostenia"
                        label="Hipostenia"
                        options={options}
                        validation={validationSeccionThreeCronicas.hipostenia}
                        errors={errors}
                        placeholder="Seleccione una opción"
                        className="col-span-1"
                    />

                    <InputSelect
                        control={control}
                        name="acidosisTubular"
                        label="Acidosis Tubular"
                        options={options}
                        validation={validationSeccionThreeCronicas.acidosisTubular}
                        errors={errors}
                        placeholder="Seleccione una opción"
                        className="col-span-1"
                    />

                    <InputSelect
                        control={control}
                        name="hematuriaNecrosisRenal"
                        label="Hematuria y Necrosis Papilar Renal"
                        options={options}
                        validation={validationSeccionThreeCronicas.hematuriaNecrosisRenal}
                        errors={errors}
                        placeholder="Seleccione una opción"
                        className="col-span-1"
                    />

                    <InputSelect
                        control={control}
                        name="priapismoRecurrente"
                        label="Priapismo Recurrente"
                        options={options}
                        validation={validationSeccionThreeCronicas.priapismoRecurrente}
                        errors={errors}
                        placeholder="Seleccione una opción"
                        className="col-span-1"
                    />

                    <InputSelect
                        control={control}
                        name="enfermedadRenalCronica"
                        label="Enfermedad Renal Crónica"
                        options={options}
                        validation={validationSeccionThreeCronicas.enfermedadRenalCronica}
                        errors={errors}
                        placeholder="Seleccione una opción"
                        className="col-span-1"
                    />

                    <InputSelect
                        control={control}
                        name="proteinuria"
                        label="Proteinuria"
                        options={options}
                        validation={validationSeccionThreeCronicas.proteinuria}
                        errors={errors}
                        placeholder="Seleccione una opción"
                        className="col-span-1"
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
