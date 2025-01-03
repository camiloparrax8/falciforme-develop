import { Controller } from 'react-hook-form';
import Select from '@/components/ui/Select';
import Label from './Label';

const SelectMultiple = ({
    control,
    name,
    options,
    placeholder,
    defaultValue,
    errors,
    validation,
    className,
    label
}) => {
    return (
        <div  className={className}>
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
                        onChange={(selected) => {
                            field.onChange(
                                selected ? selected.map((option) => option.value) : []
                            ); 
                        }}
                        value={
                            field.value
                                ? options.filter((option) =>
                                      field.value.includes(option.value)
                                  )
                                : []
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
    );
};

export default SelectMultiple;
