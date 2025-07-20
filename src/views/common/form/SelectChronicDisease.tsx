import Select from '@/components/ui/Select';
import Label from './Label';
import { Controller } from 'react-hook-form';

function SelectChronicDisease({ control, errors, validation, onDiseaseChange, className, name }) {
    const chronicDiseases = [
        { id: 1, value: 'Diabetes', label: 'Diabetes' },
        { id: 2, value: 'Hipertensión', label: 'Hipertensión' },
        { id: 3, value: 'Asma', label: 'Asma' },
        { id: 4, value: 'Artritis', label: 'Artritis' },
    ];

    return (
        <div className={className}>
            <Label htmlFor="chronicDisease" text="Enfermedad Crónica" />
            <Controller
                name={name}
                control={control}
                rules={validation}
                render={({ field }) => (
                    <Select
                        {...field}
                        options={chronicDiseases}
                        placeholder="Seleccione una enfermedad"
                        value={chronicDiseases.find(
                            (disease) => disease.value === field.value
                        )}
                        onChange={(option) => {
                            field.onChange(option?.value); 
                            onDiseaseChange(option); 
                        }}
                    />
                )}
            />
            {/* Mostrar mensaje de error */}
            {errors?.[name] && (
                <p className="text-red-500 text-sm mt-1">
                    {errors[name]?.message}
                </p>
            )}
        </div>
    );
}

export default SelectChronicDisease;
