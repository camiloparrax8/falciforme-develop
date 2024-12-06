import Input from '@/components/ui/Input';
import { Controller } from 'react-hook-form';
import Label from './Label';

const InputForm = ({ control, name, rules, errors, label,  inputPlaceholder}) => {
    return (
        <div>
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
    );
};

export default InputForm;
