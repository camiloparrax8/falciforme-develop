import React from 'react'
import Select from '@/components/ui/Select'
import { Controller } from 'react-hook-form'
import Label from './Label'

const SelectSexo = ({ control, name, rules, errors, className  }) => {
    // Opciones quemadas para el tipo de documento
    const documentTypeOptions = [
        { value: '1', label: 'Masculino' },
        { value: '0', label: 'Femenino' },
    ]

    return (
        <div className={className}>
            <Label htmlFor={name} text="Sexo biológico" />

            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field }) => (
                    <Select
                        {...field}
                        options={documentTypeOptions}
                        placeholder="Seleccione..."
                        value={documentTypeOptions.find(
                            (option) => option.value === field.value,
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

export default SelectSexo
