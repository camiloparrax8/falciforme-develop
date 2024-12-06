import Select from '@/components/ui/Select';
import Label from './Label';
import { Controller } from 'react-hook-form';

function SelectCity({ control, selectedDepartment, errors, validation }) {
    // Opciones de municipios quemadas dentro del componente
    const cities = [
        { id: 1, departmentId: 1, value: 'monteria', label: 'Montería' },
        { id: 2, departmentId: 1, value: 'lorica', label: 'Lorica' },
        { id: 3, departmentId: 1, value: 'cerete', label: 'Cereté' },
        { id: 4, departmentId: 2, value: 'medellin', label: 'Medellín' },
        { id: 5, departmentId: 2, value: 'rionegro', label: 'Rionegro' },
        { id: 6, departmentId: 2, value: 'itagui', label: 'Itagüí' },
        { id: 7, departmentId: 3, value: 'cartagena', label: 'Cartagena' },
        { id: 8, departmentId: 3, value: 'magangue', label: 'Magangué' },
        { id: 9, departmentId: 3, value: 'turbaco', label: 'Turbaco' },
    ];

    return (
        <>
            <Label htmlFor="city" text="Municipio" />
            <Controller
                name="city"
                control={control}
                rules={validation}
                render={({ field }) => (
                    <Select
                        {...field}
                        options={
                            selectedDepartment
                                ? cities.filter(
                                      (city) =>
                                          city.departmentId === selectedDepartment.id,
                                  )
                                : []
                        }
                        placeholder={
                            selectedDepartment
                                ? 'Seleccione un municipio'
                                : 'Primero seleccione un departamento'
                        }
                        isDisabled={!selectedDepartment}
                        value={cities.find(
                            (city) => city.value === field.value,
                        )}
                        onChange={(option) => field.onChange(option?.value)}
                    />
                )}
            />
            {errors?.city && (
                <p className="text-red-500 text-sm mt-1">
                    {errors.city.message}
                </p>
            )}
        </>
    );
}

export default SelectCity;
