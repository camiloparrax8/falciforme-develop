import Select from '@/components/ui/Select';
import Label from './Label';
import { Controller } from 'react-hook-form';

function SelectDepartment({ control, errors, validation, onDepartmentChange }) {
    const departments = [
        { id: 1, value: 'cordoba', label: 'Córdoba' },
        { id: 2, value: 'antioquia', label: 'Antioquia' },
        { id: 3, value: 'bolivar', label: 'Bolívar' },
    ];

    return (
        <>
            <Label htmlFor="department" text="Departamento" />
            <Controller
                name="department"
                control={control}
                rules={validation}
                render={({ field }) => (
                    <Select
                        {...field}
                        options={departments}
                        placeholder="Seleccione un departamento"
                        value={departments.find(
                            (dep) => dep.value === field.value,
                        )}
                        onChange={(option) => {
                            field.onChange(option?.value);
                            onDepartmentChange(option);
                        }}
                    />
                )}
            />
            {errors?.department && (
                <p className="text-red-500 text-sm mt-1">
                    {errors.department.message}
                </p>
            )}
        </>
    );
}

export default SelectDepartment;
