import React from 'react'
import Select from '@/components/ui/Select'
import { Controller } from 'react-hook-form'
import Label from './Label'

interface SelectRolesProps {
    control: any;
    name: string;
    rules: any;
    errors: any;
    className: string;
    value?: string;
}

const SelectRoles = ({ 
    control, 
    name, 
    rules, 
    errors, 
    className,
    value 
}: SelectRolesProps) => {
    const roles = [
        { id: 1, value: 1, label: 'Administrador' },
        { id: 2, value: 2, label: 'Medico' },
        { id: 3, value: 3, label: 'Enfermero' },
    ]

    return (
        <div className={className}>
            <Label htmlFor={name} text="Rol" />
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field }) => (
                    <Select {...field} 
                        options={roles} 
                        placeholder="Seleccione..."
                        value={roles.find(
                            (option) => option.value === (value || field.value),
                        )}
                        onChange={(option) => field.onChange(option?.value)}
                        className={errors[name] ? 'border-red-500' : ''}
                    />
                )}
            />
            {errors[name] && (
                <p className="text-red-500 text-sm mt-1">
                    {errors[name].message}
                </p>
            )}
        </div>
    )
}

export default SelectRoles;
