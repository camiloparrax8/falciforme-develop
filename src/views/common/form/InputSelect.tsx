import Select from '@/components/ui/Select'
import Label from './Label'
import { Controller } from 'react-hook-form'

/**
 * Componente genérico InputSelect
 * @param {Object} control - Control de React Hook Form.
 * @param {Object} errors - Errores del formulario.
 * @param {Object} validation - Reglas de validación del campo.
 * @param {Object} options - Opciones para el campo de selección en formato [{ value: 'portador', label: 'Portador' }].
 * @param {string} name - Nombre del campo en el formulario.
 * @param {string} [placeholder] - Placeholder para el campo de selección.
 * @param {string} label - Etiqueta para el campo de selección.
 * @param {string} className - Clases adicionales para el componente.
 * @param {boolean} [disabled] - Indica si el campo está deshabilitado.
 */
function InputSelect({
    control,
    errors,
    validation,
    options,
    name,
    placeholder,
    label,
    className,
    disabled,
}: {
    control: any
    errors: any
    validation: any
    options: { value: string; label: string }[]
    name: string
    placeholder?: string // Ahora es opcional
    label?: string
    className?: string
    disabled?: boolean // Añadir propiedad disabled
}) {
    return (
        <div className={className}>
            {label && <Label htmlFor={name} text={label} />}
            <Controller
                name={name}
                control={control}
                rules={validation}
                render={({ field }) => (
                    <Select
                        {...field}
                        options={options}
                        placeholder={placeholder || 'Seleccione una opción'}
                        value={options.find(
                            (option) => option.value === field.value,
                        )}
                        onChange={(selectedOption) =>
                            field.onChange(selectedOption?.value)
                        }
                        isDisabled={disabled} // Usar isDisabled que es la prop que usa react-select
                    />
                )}
            />
            {errors[name] && (
                <span className="text-red-500 text-sm">
                    {errors[name].message}
                </span>
            )}
        </div>
    )
}

export default InputSelect
