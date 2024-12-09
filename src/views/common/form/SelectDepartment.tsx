import Select from '@/components/ui/Select';
import Label from './Label';
import { Controller } from 'react-hook-form';

function SelectDepartment({ control, errors, validation, onDepartmentChange, className }) {
    const departments = [
        { id: 29, value: 'amazonas', label: 'Amazonas' },
        { id: 1, value: 'antioquia', label: 'Antioquia' },
        { id: 25, value: 'arauca', label: 'Arauca' },
        { id: 2, value: 'atlantico', label: 'Atlántico' },
        { id: 4, value: 'bolivar', label: 'Bolívar' },
        { id: 5, value: 'boyaca', label: 'Boyacá' },
        { id: 7, value: 'caldas', label: 'Caldas' },
        { id: 8, value: 'caqueta', label: 'Caquetá' },
        { id: 26, value: 'casanare', label: 'Casanare' },
        { id: 6, value: 'cauca', label: 'Cauca' },
        { id: 9, value: 'cesar', label: 'Cesar' },
        { id: 12, value: 'choco', label: 'Chocó' },
        { id: 10, value: 'cordoba', label: 'Córdoba' },
        { id: 11, value: 'cundinamarca', label: 'Cundinamarca' },
        { id: 30, value: 'guainia', label: 'Guainía' },
        { id: 31, value: 'guaviare', label: 'Guaviare' },
        { id: 13, value: 'huila', label: 'Huila' },
        { id: 14, value: 'la_guajira', label: 'La Guajira' },
        { id: 15, value: 'magdalena', label: 'Magdalena' },
        { id: 16, value: 'meta', label: 'Meta' },
        { id: 17, value: 'narino', label: 'Nariño' },
        { id: 18, value: 'norte_de_santander', label: 'Norte de Santander' },
        { id: 27, value: 'putumayo', label: 'Putumayo' },
        { id: 19, value: 'quindio', label: 'Quindío' },
        { id: 20, value: 'risaralda', label: 'Risaralda' },
        { id: 21, value: 'san_andres', label: 'San Andrés, Providencia y Santa Catalina' },
        { id: 21, value: 'santander', label: 'Santander' },
        { id: 22, value: 'sucre', label: 'Sucre' },
        { id: 23, value: 'tolima', label: 'Tolima' },
        { id: 24, value: 'valle_del_cauca', label: 'Valle del Cauca' },
        { id: 32, value: 'vaupes', label: 'Vaupés' },
        { id: 33, value: 'vichada', label: 'Vichada' }
    ];
    

    return (
        <div className={className}>
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
       </div>
    );
}

export default SelectDepartment;
