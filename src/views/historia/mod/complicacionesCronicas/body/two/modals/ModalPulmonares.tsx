import { useForm } from 'react-hook-form';
import { Dialog } from '@/components/ui';
import SelectMultiple from '@/views/common/form/SelectMultiple';
import InputForm from '@/views/common/form/InputForm';
import Button from '@/components/ui/Button';
import validationSeccionTwoCronicas from '../../../../../../../validation/validationSeccionTwoCronicas';
import { defaultValuesPulmonares } from '../../two/modals/defaultValuesSeccionTwoCronicas';
import InputSelect from '@/views/common/form/InputSelect';

export default function ModalPulmonares({ isOpen, onClose, onRequestClose }) {
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: defaultValuesPulmonares,
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
            width={1200}
            height={530}
            isOpen={isOpen}
            onClose={onClose}
            onRequestClose={onRequestClose}
        >
            <div className="flex flex-col h-full space-y-4">
                <h5 className="text-lg font-bold">Pulmonares</h5>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid grid-cols-1 gap-2"
                >
                    {/* Hipertensión Pulmonar y VRT en la misma fila */}
                    <div className="grid grid-cols-2 gap-4">
                        <InputSelect
                            control={control}
                            name="hipertensionPulmonar"
                            label="Hipertensión Pulmonar"
                            options={options}
                            validation={validationSeccionTwoCronicas.hipertensionPulmonar}
                            errors={errors}
                            placeholder="Seleccione una opción"
                            className="col-span-1"
                        />

                        <InputForm
                            control={control}
                            name="vrt"
                            label="VRT"
                            inputPlaceholder="Ingrese VRT"
                            rules={validationSeccionTwoCronicas.vrt}
                            errors={errors}
                            value=""
                            className="col-span-1"
                        />
                    </div>

                    {/* Sección Asma y Sibilancias */}
                    <h6 className="font-semibold">Sección Asma y Sibilancias</h6>
                    <div className="grid grid-cols-3 gap-4">
                        <InputForm
                            control={control}
                            name="crisisAsma"
                            label="Número de crisis / año"
                            inputPlaceholder="Ingrese el número de crisis"
                            rules={validationSeccionTwoCronicas.crisisAsma}
                            errors={errors}
                            value=""
                            className="col-span-1"
                        />

                        <InputForm
                            control={control}
                            name="tratamientoAsma"
                            label="Tratamientos"
                            inputPlaceholder="Describa los tratamientos para el asma y las sibilancias"
                            rules={validationSeccionTwoCronicas.tratamientoAsma}
                            errors={errors}
                            value=""
                            className="col-span-2"
                        />
                    </div>

                    {/* Sección EPFC */}
                    <h6 className="font-semibold">Sección EPFC</h6>
                    <div className="grid grid-cols-3 gap-4">
                        <InputSelect
                            control={control}
                            name="hipomexiaEPFC"
                            label="Hipomexia"
                            options={options}
                            validation={validationSeccionTwoCronicas.hipomexiaEPFC}
                            errors={errors}
                            placeholder="Seleccione una opción"
                            className="col-span-1"
                        />

                        <InputSelect
                            control={control}
                            name="saosEPFC"
                            label="SAOS"
                            options={options}
                            validation={validationSeccionTwoCronicas.saosEPFC}
                            errors={errors}
                            placeholder="Seleccione una opción"
                            className="col-span-1"
                        />

                        <InputForm
                            control={control}
                            name="tratamientoEPFC"
                            label="Tratamiento"
                            inputPlaceholder="Describa el tratamiento para la EPFC"
                            rules={validationSeccionTwoCronicas.tratamientoEPFC}
                            errors={errors}
                            value=""
                            className="col-span-1"
                        />
                    </div>

                    <div className="flex justify-end py-1">
                        <Button type="submit" className="ml-2">
                            Guardar
                        </Button>
                    </div>
                </form>
            </div>
        </Dialog>
    );
}
