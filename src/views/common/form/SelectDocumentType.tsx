import React from 'react'
import Select from '@/components/ui/Select'
import { Controller } from 'react-hook-form'
import Label from './Label'

const SelectDocumentType = ({ control, name, rules, errors }) => {
    // Opciones quemadas para el tipo de documento
    const documentTypeOptions = [
        { value: 'CC', label: 'Cédula de Ciudadanía (CC)' },
        { value: 'TI', label: 'Tarjeta de Identidad (TI)' },
        { value: 'PS', label: 'Pasaporte (PS)' },
    ]

    return (
        <div>
            <Label htmlFor={name} text="Tipo de Documento" />

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

export default SelectDocumentType
