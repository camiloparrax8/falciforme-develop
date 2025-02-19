import Select from '@/components/ui/Select';
import Label from './Label';
import { Controller } from 'react-hook-form';

function SelectLinea({ control, errors, validation, selectedParentesco, className }) {
    const lineas = [
        { id: 1, value: 'paterno', label: 'Paterno' },
        { id: 2, value: 'materno', label: 'Materno' },
    ];

    const isDisabled = !selectedParentesco; // Deshabilita si no hay parentesco seleccionado

    return (
        <div className={className}>
            <Label htmlFor="linea" text="Línea" />
            <Controller
                name="linea_parentesco"
                control={control}
                rules={validation}
                render={({ field }) => (
                    <Select
                        {...field}
                        options={lineas}
                        placeholder={isDisabled ? "Primero un parentesco" : "Seleccione una línea"}
                        value={lineas.find(
                            (linea) => linea.value === field.value,
                        )}
                        onChange={(option) => {
                            field.onChange(option?.value);
                        }}
                        isDisabled={isDisabled} // Deshabilita el selector si no hay parentesco
                    />
                )}
            />
            {errors?.linea && (
                <p className="text-red-500 text-sm mt-1">
                    {errors.linea.message}
                </p>
            )}
        </div>
    );
}

export default SelectLinea;
