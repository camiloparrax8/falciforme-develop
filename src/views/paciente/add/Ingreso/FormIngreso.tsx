import { useForm } from 'react-hook-form';
import Button from '@/components/ui/Button';
import validationIngreso from '../../../../validation/validationIngreso';
import SectionTitle from '@/views/common/form/SectionTitle';
import InputForm from '@/views/common/form/InputForm';
import SelectMultiple from '@/views/common/form/SelectMultiple';
import InputDatePickerForm from '@/views/common/form/InputDate';



function FormIngreso({ nextTab }) {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            fechaPrimeraConsulta: '',
            edadConsulta: '',
            fechaInicioSintomas: '',
            observacion: '',
            sintomas: [],

            
        },
    });

    const onSubmit = (data) => {
        console.log('Datos enviados:', data);
    };



    const sintomasOptions = [
        // Síntomas 
        { value: 'anemia', label: 'Anemia' },
        { value: 'palidez', label: 'Palidez' },
        { value: 'ictericia', label: 'Ictericia' },
    
        // Síntomas Relacionados con el Dolor
        { value: 'dolor_oseo', label: 'Dolor Óseo' },
        { value: 'dactilitis', label: 'Dactilitis' },
    
        // Síntomas Relacionados con Infecciones
        { value: 'infecciones', label: 'Infecciones' },
    ]

    return (
        <form
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full"
            onSubmit={handleSubmit(onSubmit)}
        >
            {/* Sección Información Básica */}
            <SectionTitle text="Datos de ingreso" className="col-span-4" />

            <InputDatePickerForm
                control={control}
                name="fecha_consulta"
                rules={validationIngreso.fechaPrimeraConsulta}
                errors={errors}
                label="Fecha 1ra consulta hematologia"
                placeholder="Fecha"
                className="col-span-1"
                
            />

            <InputForm
                control={control}
                name="edad"
                rules={validationIngreso.edadConsulta}
                errors={errors}
                label="Edad de esa consulta"
                inputPlaceholder="Edad"
                className="col-span-1"
                value=""
            />

            <InputDatePickerForm
                control={control}
                name="fecha_sintomas"
                rules={validationIngreso.fechaInicioSintomas}
                errors={errors}
                label="Fecha inicio sintomas"
                placeholder="Fecha"
                className="col-span-1"
                
            />

            <InputForm
                control={control}
                name="observaciones"
                rules={validationIngreso.observacion}
                errors={errors}
                label="Observaciones"
                inputPlaceholder="Observaciones"
                className="col-span-1"
                value=""
            />
            <SelectMultiple
                            control={control}
                            className="col-span-3"
                            name="parentescosMultiples"
                            options={sintomasOptions}
                            placeholder="Seleccione los sintomas"
                            defaultValue={[]}
                            errors={errors}
                            validation={{
                                required:validationIngreso.sintomas.required,
                                validate:validationIngreso.sintomas.validate,
                            }}
                            
                            label="Sintomas"
                        />
         

            {/* Botón */}
            <div className="col-span-4 flex justify-end mt-6">
                <Button type="submit">Guardar</Button>
            </div>
        </form>
    );
}

export default FormIngreso;
