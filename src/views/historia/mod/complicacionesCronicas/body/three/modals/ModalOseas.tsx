import { useForm } from 'react-hook-form';
import { Dialog } from '@/components/ui';
import InputForm from '@/views/common/form/InputForm';
import InputSelect from '@/views/common/form/InputSelect';
import Button from '@/components/ui/Button';
import validationSeccionThreeCronicas from '../../../../../../../validation/validationSeccionThreeCronicas';
import { defaultValuesOseas } from '../../three/modals/defaultValuesSeccionThreeCronicas';

export default function ModalOseas({ isOpen, onClose, onRequestClose }) {
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: defaultValuesOseas, // Valores por defecto
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
            height={450}
            isOpen={isOpen}
            onClose={onClose}
            onRequestClose={onRequestClose}
        >
            <div className="flex flex-col h-full space-y-4">
                <h5 className="text-lg font-bold">Oseas</h5>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                    <InputForm
                        control={control}
                        name="huesoComprometido"
                        label="Hueso Comprometido"
                        inputPlaceholder="Especifique el hueso comprometido"
                        rules={validationSeccionThreeCronicas.huesoComprometido}
                        errors={errors}
                        className="col-span-1"
                        value=""
                    />

                    <InputForm
                        control={control}
                        name="gradoDiscapacidad"
                        label="Grado de Discapacidad"
                        inputPlaceholder="Ingrese el grado de discapacidad"
                        rules={validationSeccionThreeCronicas.gradoDiscapacidad}
                        errors={errors}
                        className="col-span-1"
                        value=""
                    />

                    <InputSelect
                        control={control}
                        name="osteonecrosis"
                        label="Osteonecrosis"
                        options={options}
                        validation={validationSeccionThreeCronicas.osteonecrosis}
                        errors={errors}
                        placeholder="Seleccione una opción"
                    />

                    <InputSelect
                        control={control}
                        name="deformidadesOseas"
                        label="Deformidades Óseas"
                        options={options}
                        validation={validationSeccionThreeCronicas.deformidadesOseas}
                        errors={errors}
                        placeholder="Seleccione una opción"
                    />

                    <InputSelect
                        control={control}
                        name="osteopenia"
                        label="Osteopenia"
                        options={options}
                        validation={validationSeccionThreeCronicas.osteopenia}
                        errors={errors}
                        placeholder="Seleccione una opción"
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
       
  