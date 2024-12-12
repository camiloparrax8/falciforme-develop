import Select from '@/components/ui/Select';
import Label from './Label';
import { Controller } from 'react-hook-form';

/**
 * Componente genérico InputSelect
 * @param {Object} control - Control de React Hook Form.
 * @param {Object} errors - Errores del formulario.
 * @param {Object} validation - Reglas de validación del campo.
 * @param {Object} options - Opciones para el campo de selección en formato [{ value: 'portador', label: 'Portador' }].
 * @param {string} name - Nombre del campo en el formulario.
 * @param {string} placeholder - Placeholder para el campo de selección.
 * @param {string} label - Etiqueta para el campo de selección.
 * @param {string} className - Clases adicionales para el componente.
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
            value={options.find((option) => option.value === field.value)}
            onChange={(selectedOption) => field.onChange(selectedOption?.value)}
          />
        )}
      />
      {errors?.[name] && (
        <p className="text-red-500 text-sm mt-1">
          {errors[name].message}
        </p>
      )}
    </div>
  );
}

export default InputSelect;