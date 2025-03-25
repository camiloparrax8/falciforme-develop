import { Controller } from 'react-hook-form'
import Select from '@/components/ui/Select'
import Label from './Label'
import CreatableSelect from 'react-select/creatable'

const SelectMultiple = ({
    control,
    name,
    options,
    placeholder,
    defaultValue,
    errors,
    validation,
    className,
    label,
    isCreatable = false,
}) => {
    return (
        <div className={className}>
            {label && <Label htmlFor={name} text={label} />}
            <Controller
                name={name}
                control={control}
                defaultValue={defaultValue}
                rules={validation}
                render={({ field }) => (
                    <Select
                        {...field}
                        isMulti
                        options={options}
                        placeholder={placeholder}
                        componentAs={isCreatable ? CreatableSelect : undefined}
                        formatCreateLabel={
                            isCreatable
                                ? (inputValue) => `Crear "${inputValue}"`
                                : undefined
                        }
                        onChange={(selected) => {
                            const selectedValues = selected
                                ? selected.map((option) => {
                                      if (option.__isNew__) {
                                          return option.value
                                      }
                                      return option.value
                                  })
                                : []
                            field.onChange(selectedValues)
                        }}
                        value={
                            field.value
                                ? field.value.map((value) => {
                                      const existingOption = options.find(
                                          (opt) => opt.value === value,
                                      )
                                      return (
                                          existingOption || {
                                              value: value,
                                              label: value,
                                          }
                                      )
                                  })
                                : []
                        }
                        getNewOptionData={
                            isCreatable
                                ? (inputValue) => ({
                                      value: inputValue,
                                      label: inputValue,
                                      __isNew__: true,
                                  })
                                : undefined
                        }
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

export default SelectMultiple
