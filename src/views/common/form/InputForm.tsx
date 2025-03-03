import Input from '@/components/ui/Input'
import { Controller } from 'react-hook-form'
import Label from './Label'

interface InputFormProps {
    control: any;
    name: string;
    rules: any;
    errors: any;
    label: string;
    inputPlaceholder: string;
    className: string;
    value?: string;
    disabled?: boolean;
}

const InputForm = ({
    control,
    name,
    rules,
    errors,
    label,
    inputPlaceholder,
    className,
    value,
    disabled
}: InputFormProps) => {
    return (
        <div className={className}>
            <div className="col-span-1">
                {/* Etiqueta */}
                <Label htmlFor={name} text={label} />

                {/* Controlador de react-hook-form */}
                <Controller
                    name={name}
                    control={control}
                    rules={rules}
                    render={({ field }) => (
                        <Input
                            {...field}
                            id={name}
                            placeholder={inputPlaceholder}
                            className={errors[name] ? 'border-red-500' : ''}
                            value={value || field.value}
                            disabled={disabled}
                        />
                    )}
                />

                {/* Mensaje de error */}
                {errors[name] && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors[name].message}
                    </p>
                )}
            </div>
        </div>
    )
}

export default InputForm
