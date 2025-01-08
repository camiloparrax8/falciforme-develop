import { useForm } from 'react-hook-form';
import Button from '@/components/ui/Button';
import SectionTitle from '@/views/common/form/SectionTitle';
import InputForm from '@/views/common/form/InputForm';
import SelectMultiple from '@/views/common/form/SelectMultiple';
import InputDatePickerForm from '@/views/common/form/InputDate';
import validationImgDiagnosticos from '@/validation/validationImgDiagnosticos';


function FormImgDiagnosticos({ onSubmit }) {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            imagenDiagnostica: [],
            fecha: '',
            tipoResultado: [],
            resultado: '',
        },
    });

    const opcionesImagenDiagnostica = [
        { value: 'radiografia', label: 'Radiografía' },
        { value: 'tomografia', label: 'Tomografía' },
        { value: 'ecografia', label: 'Ecografía' },
        { value: 'resonancia', label: 'Resonancia Magnética' },
    ];

    const opcionesTipoResultado = [
        { value: 'normal', label: 'Normal' },
        { value: 'anormal', label: 'Anormal' },
        { value: 'pendiente', label: 'Pendiente de Evaluación' },
    ];

    return (
        <form
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full"
            onSubmit={handleSubmit(onSubmit)}
        >
            {/* Sección Tipo de Imagen Diagnóstica */}
            <SectionTitle
                text="Tipo de Imagen Diagnóstica"
                className="col-span-1 md:col-span-2 lg:col-span-4"
            />
            <SelectMultiple
                control={control}
                name="imagenDiagnostica"
                validation={validationImgDiagnosticos.imagenDiagnostica}
                errors={errors}
                defaultValue={[]}
                label="Imagen Diagnóstica"
                options={opcionesImagenDiagnostica}
                placeholder="Imágenes diagnósticas"
                className="col-span-1"
            />
            <InputDatePickerForm
                control={control}
                name="fecha"
                rules={validationImgDiagnosticos.fecha}
                errors={errors}
                label="Fecha"
                placeholder="Seleccione la fecha"
                className="col-span-1"
            />
            <SelectMultiple
                control={control}
                name="tipoResultado"
                validation={validationImgDiagnosticos.tipoResultado}
                errors={errors}
                defaultValue={[]}
                label="Tipo de Resultado"
                options={opcionesTipoResultado}
                placeholder="Tipos de resultado"
                className="col-span-1"
            />
            <InputForm
                control={control}
                name="resultado"
                rules={validationImgDiagnosticos.resultado}
                errors={errors}
                label="Resultado"
                inputPlaceholder="Ingrese el resultado"
                className="col-span-4"
                value=""
            />

            {/* Botón */}
            <div className="col-span-4 flex justify-end mt-2">
                <Button type="submit">Guardar</Button>
            </div>
        </form>
    );
}

export default FormImgDiagnosticos;
