import Select from '@/components/ui/Select';
import Label from './Label';
import { Controller } from 'react-hook-form';

function SelectParentesco({ control, errors, validation, className }) {
    const parentescos = [
        { id: 1, value: 'padre', label: 'Padre' },
        { id: 2, value: 'madre', label: 'Madre' },
        { id: 3, value: 'hermano', label: 'Hermano/a' },
        { id: 4, value: 'primo', label: 'Primo/a' },
        { id: 5, value: 'abuelo', label: 'Abuelo/a' },
        { id: 6, value: 'tio', label: 'Tío/a' },
        // Agregar más opciones según sea necesario
    ];

    return (
        <div className={className}>
            <Label htmlFor="parentesco" text="Parentesco" />
            <Controller
                name="parentesco"
                control={control}
                rules={validation}
                render={({ field }) => (
                    <Select
                        {...field}
                        options={parentescos}
                        placeholder="Seleccione un parentesco"
                        value={parentescos.find(
                            (par) => par.value === field.value,
                        )}
                        onChange={(option) => {
                            field.onChange(option?.value);
                            
                        }}
                    />
                )}
            />
            {errors?.parentesco && (
                <p className="text-red-500 text-sm mt-1">
                    {errors.parentesco.message}
                </p>
            )}
        </div>
    );
}

export default SelectParentesco;
