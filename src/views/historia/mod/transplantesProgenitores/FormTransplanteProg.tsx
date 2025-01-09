import { useForm } from 'react-hook-form';
import SectionTitle from '@/views/common/form/SectionTitle';
import InputForm from '@/views/common/form/InputForm';
import InputSelect from '@/views/common/form/InputSelect';
import Button from '@/components/ui/Button';
import validationTransplanteProg from '../../.././../validation/validationTransplanteProg';

export default function FormTransplanteProg() {

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            paciente: '',
            padres: '',
            hermanos: '',
            tipo: ''
        },
    });

    const onSubmit = (data) => {
        console.log('Datos del transplante:', data);
    };

    const options = [
        { value: '1', label: 'Realizado' },
        { value: '0', label: 'No realizado' },
    ]

    return(
        <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full" onSubmit={handleSubmit(onSubmit)}>
            {/* Sección Transplane de progenitores */}
            <SectionTitle text="Transplante de progenitores" className="col-span-1 md:col-span-2 lg:col-span-4" />

            <div className="col-span-1 md:col-span-2 lg:col-span-2">
               <SectionTitle text="Estudios HLA" className="col-span-1 md:col-span-2 lg:col-span-4" />
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                    <InputSelect
                        control={control}
                        name="paciente"
                        validation={validationTransplanteProg.paciente}
                        errors={errors}
                        label="Paciente"
                        options={options}
                        placeholder="Seleccione"
                        className="col-span-1"
                    />
                    <InputSelect
                        control={control}
                        name="padres"
                        label="Padres"
                        validation={validationTransplanteProg.padres}
                        errors={errors}
                        options={options}
                        placeholder="Seleccione"
                        className="col-span-1"
                    />
                    <InputSelect
                        control={control}
                        name="hermanos"
                        label="Hermanos"
                        validation={validationTransplanteProg.hermanos}
                        errors={errors}
                        options={options}
                        placeholder="Seleccione"
                        className="col-span-1"
                    />
               </div>
            </div>

            <div className="col-span-1 md:col-span-2 lg:col-span-2">
               <SectionTitle text="Indicaciones para transplante" className="col-span-1 md:col-span-2 lg:col-span-4" />
               <InputForm
                control={control}
                name="tipo"
                label="Tipo"
                inputPlaceholder="Escriba el tipo"
                className="col-span-1"
                errors={errors}
                rules={validationTransplanteProg.tipo}
                value=''
               />
            </div>
            {/* Botón */}
            <div className="col-span-4 flex justify-end mt-6">
                <Button type="submit">Guardar</Button>
            </div>
        </form>
    )
}