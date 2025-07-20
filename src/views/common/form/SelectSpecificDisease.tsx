import Select from '@/components/ui/Select'
import Label from './Label'
import { Controller } from 'react-hook-form'

function SelectSpecificDisease({
    control,
    selectedDisease,
    errors,
    validation,
    className,
    name,
}) {
    const specificDiseases = [
        { id: 1, diseaseId: 1, value: 'Diabetes Tipo 1', label: 'Diabetes Tipo 1' },
        { id: 2, diseaseId: 1, value: 'Diabetes Tipo 2', label: 'Diabetes Tipo 2' },
        {
            id: 3,
            diseaseId: 2,
            value: 'Hipertensión Sistólica',
            label: 'Hipertensión Sistólica',
        },
        {
            id: 4,
            diseaseId: 2,
            value: 'Hipertensión Diastólica',
            label: 'Hipertensión Diastólica',
        },
        { id: 5, diseaseId: 3, value: 'Asma Alérgica', label: 'Asma Alérgica' },
        { id: 6, diseaseId: 3, value: 'Asma No Alérgica', label: 'Asma No Alérgica' },
        {
            id: 7,
            diseaseId: 4,
            value: 'Artritis Reumatoide',
            label: 'Artritis Reumatoide',
        },
        {
            id: 8,
            diseaseId: 4,
            value: 'Artritis Psoriásica',
            label: 'Artritis Psoriásica',
        },
    ]

    const filteredDiseases = specificDiseases.filter(
        (disease) => disease.diseaseId === selectedDisease?.id,
    )

    return (
        <div className={className}>
            <Label htmlFor="specificDisease" text="Enfermedad Específica" />
            <Controller
                name={name}
                control={control}
                rules={validation}
                render={({ field }) => (
                    <Select
                        {...field}
                        options={filteredDiseases}
                        placeholder="Seleccione una enfermedad"
                        value={filteredDiseases.find(
                            (disease) => disease.value === field.value,
                        )}
                        onChange={(option) => field.onChange(option?.value)}
                    />
                )}
            />
            {errors?.[name] && (
                <p className="text-red-500 text-sm mt-1">
                    {errors[name]?.message}
                </p>
            )}
        </div>
    )
}

export default SelectSpecificDisease
