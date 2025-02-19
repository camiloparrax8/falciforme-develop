import { useForm } from 'react-hook-form';
import Button from '@/components/ui/Button';
import validationIngreso from '../../../../validation/validationIngreso';
import SectionTitle from '@/views/common/form/SectionTitle';
import InputForm from '@/views/common/form/InputForm';
import SelectMultiple from '@/views/common/form/SelectMultiple';
import InputDatePickerForm from '@/views/common/form/InputDate';
import { crearPrimeraConsulta } from '@/customService/services/ingresoService';
import { useToken } from '@/store/authStore';
import { usePatient } from '@/context/PatientContext';
import { useSessionUser } from '@/store/authStore';
import { useState } from 'react';

function FormIngreso({ nextTab }) {
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            fecha_hematologica: '',
            edad_consulta: '',
            fecha_inicio_sintoma: '',
            parentescos_multiples: [],
        },
    });

    const { paciente } = usePatient();
    const { token } = useToken();
    const { user } = useSessionUser();

    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        setLoading(true);

        if (!paciente.id) {
            console.error('Seleccione un paciente');
            setLoading(false);
            return;
        }

        try {
            const response = await crearPrimeraConsulta(token, user.id, paciente.id, data);

            if (response.status === 'success') {
                console.log('Primera consulta creada con éxito');
                setTimeout(() => {
                    nextTab();
                }, 1000);
            } else {
                console.error(response.message);
            }
        } catch (error) {
            console.error('Error al guardar la primera consulta');
        } finally {
            setLoading(false);
        }
    };

    const sintomasOptions = [
        { value: 'anemia', label: 'Anemia' },
        { value: 'palidez', label: 'Palidez' },
        { value: 'ictericia', label: 'Ictericia' },
        { value: 'dolor_oseo', label: 'Dolor Óseo' },
        { value: 'dactilitis', label: 'Dactilitis' },
        { value: 'infecciones', label: 'Infecciones' },
    ];

    return (
        <form
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full"
            onSubmit={handleSubmit(onSubmit)}
        >
            <SectionTitle text="Datos de ingreso" className="col-span-4" />

            <InputDatePickerForm
                control={control}
                name="fecha_hematologica"
                rules={validationIngreso.fecha_hematologica}
                errors={errors}
                label="Fecha 1ra consulta hematología"
                placeholder="Fecha"
                className="col-span-1"
            />

            <InputForm
                control={control}
                name="edad_consulta"
                rules={validationIngreso.edad_consulta}
                errors={errors}
                label="Edad de esa consulta"
                inputPlaceholder="Edad"
                className="col-span-1"
                value=""
            />

            <InputDatePickerForm
                control={control}
                name="fecha_inicio_sintoma"
                rules={validationIngreso.fecha_inicio_sintoma}
                errors={errors}
                label="Fecha inicio síntomas"
                placeholder="Fecha"
                className="col-span-1"
            />

            <SelectMultiple
                control={control}
                className="col-span-3"
                name="parentescos_multiples"
                options={sintomasOptions}
                placeholder="Seleccione los síntomas"
                defaultValue={[]}
                errors={errors}
                validation={{
                    required: validationIngreso.parentescos_multiples.required,
                    validate: validationIngreso.parentescos_multiples.validate,
                }}
                label="Síntomas"
            />

            <div className="col-span-4 flex justify-end mt-6">
                <Button type="submit" disabled={loading}>
                    {loading ? 'Guardando...' : 'Guardar'}
                </Button>
            </div>
        </form>
    );
}

export default FormIngreso;
