import Select from '@/components/ui/Select';
import Label from './Label';
import { Controller } from 'react-hook-form';

function SelectParentesco({ control, errors, validation, className }) {
    const parentescos = [
        { id: 1, value: 'Padre', label: 'Padre' },
        { id: 2, value: 'Madre', label: 'Madre' },
        { id: 3, value: 'Hermano', label: 'Hermano' },
        { id: 4, value: 'Primo', label: 'Primo' },
        { id: 5, value: 'Abuelo', label: 'Abuelo' },
        { id: 6, value: 'Tio', label: 'Tio' },
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
