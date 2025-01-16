import { useForm } from 'react-hook-form';
import SectionTitle from '@/views/common/form/SectionTitle';
import InputForm from '@/views/common/form/InputForm';
import Button from '@/components/ui/Button';
import defaultValuesLaboratorios from './defaultValuesLaboratorios';
import validationLaboratorios from '../../.././../validation/validationLaboratorios';

function FormModalLaboratorios({ eventoForm }: { eventoForm: (data: any) => void }) {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: defaultValuesLaboratorios,
    });
    const onSubmit = (data: any) => {
        console.log('Datos enviados:', data); // Agregado para imprimir los datos enviados
        eventoForm(data);
    };
    

    return (
        <div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid grid-cols-1 md:grid-cols-6 gap-2 "
                >
                    <SectionTitle
                        text="Agregar Resultados de Laboratorios"
                        className="col-span-1 md:col-span-6"
                    />

                    <InputForm
                        control={control}
                        name="hematies"
                        label="Hematíes"
                        inputPlaceholder="Ingrese el valor de Hematíes"
                        rules={validationLaboratorios.hematies}
                        errors={errors}
                        className="col-span-3"
                        value=""
                    />

                    <InputForm
                        control={control}
                        name="hemoglobina"
                        label="Hemoglobina (Hb)"
                        inputPlaceholder="Ingrese el valor de Hemoglobina"
                        rules={validationLaboratorios.hemoglobina}
                        errors={errors}
                        className="col-span-3"
                        value=""
                    />

                    <InputForm
                        control={control}
                        name="hematocrito"
                        label="Hematocrito (HCT)"
                        inputPlaceholder="Ingrese el valor de Hematocrito"
                        rules={validationLaboratorios.hematocrito}
                        errors={errors}
                        className="col-span-3"
                        value=""
                    />

                    <InputForm
                        control={control}
                        name="mcv"
                        label="MCV"
                        inputPlaceholder="Ingrese el valor de MCV"
                        rules={validationLaboratorios.mcv}
                        errors={errors}
                        className="col-span-3"
                        value=""
                    />

                    <InputForm
                        control={control}
                        name="mch"
                        label="MCH"
                        inputPlaceholder="Ingrese el valor de MCH"
                        rules={validationLaboratorios.mch}
                        errors={errors}
                        className="col-span-3"
                        value=""
                    />

                    <InputForm
                        control={control}
                        name="mchc"
                        label="MCHC"
                        inputPlaceholder="Ingrese el valor de MCHC"
                        rules={validationLaboratorios.mchc}
                        errors={errors}
                        className="col-span-3"
                        value=""
                    />

                    <InputForm
                        control={control}
                        name="rdw"
                        label="RDW"
                        inputPlaceholder="Ingrese el valor de RDW"
                        rules={validationLaboratorios.rdw}
                        errors={errors}
                        className="col-span-3"
                        value=""
                    />

                    <div className="col-span-3 sticky bottom-0 bg-white py-7 flex justify-center">
                        <Button type="submit">Guardar</Button>
                    </div>
                </form>
            
        </div>
    );
}

export default FormModalLaboratorios;
