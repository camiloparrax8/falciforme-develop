import { useForm } from 'react-hook-form';
import SectionTitle from '@/views/common/form/SectionTitle';
import InputForm from '@/views/common/form/InputForm';
import InputSelect from '@/views/common/form/InputSelect';
import Button from '@/components/ui/Button';
import validationTratamientos from '../../../../validation/validationTratamientos'
import TableTi from './tablas/TratamientoInd';

export default function TratamientoInd() {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            tipo: '',
            dias: '',
            dosisTratamiento: '',
        },
    });

    const onSubmit = (data) => {
        console.log('Datos enviados del tratamiento:', data);
    };

    
    const options = [
        { value: 'profilaxis anbiotica con penicilina', label: 'Profilaxis antibiótica con penicilina' },
        { value: 'profilaxis para anemia megaloblastica con acido folico', label: 'Profilaxis para anemia megaloblastica con ácido fólico' },
        { value: 'manejo del dolor', label: 'Manejo del dolor' },
    ]

    return (
        <>
        <div className="bg-white p-6 rounded-lg">
            {/* Formulario de Tratamiento individual */}
            <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full" onSubmit={handleSubmit(onSubmit)}>
                {/* Sección Tratamiento individual */}
                <SectionTitle 
                    text="Tratamiento individual" 
                    className="col-span-1 md:col-span-2 lg:col-span-4"
                />
                <InputSelect
                    control={control}
                    name="tipo"
                    validation={validationTratamientos.tipo}
                    label="Tipo de tratamiento"
                    options={options}
                    errors={errors}
                    className="col-span-1"
                    placeholder='Seleccione el tratamiento'
                />
                <InputForm
                    control={control}
                    name="dias"
                    errors={errors}
                    rules={validationTratamientos.dias}
                    label="Numero de dias"
                    inputPlaceholder="dias"
                    className="col-span-1"
                    value=""
                />
                <InputForm
                    control={control}
                    name="dosisTratamiento"
                    errors={errors}
                    rules={validationTratamientos.dosis}
                    label="Dosis"
                    inputPlaceholder="Dosis"
                    className="col-span-1"
                    value=""
                />
                
                <div className="flex items-center justify-end col-span-4 md:col-span-1 pt-7">
                <Button type="submit" className="w-full md:w-auto">Guardar</Button>
                </div>
            </form>
        </div>
        <div>
            <TableTi></TableTi>
        </div>
        </>
      )
}