import { Controller } from "react-hook-form";
import Label from "./Label";
import DatePicker from "@/components/ui/DatePicker";

const InputDatePickerForm = ({
  control,
  name,
  rules,
  errors,
  label,
  placeholder,
  className,
  disabled,
}) => {
  return (
    <div className={className}>
      <Label htmlFor={name} text={label} />

      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <DatePicker
            {...field}
            placeholder={placeholder}
            className={errors[name] ? "border-red-500" : ""}
            maxDate={new Date()}
            disabled={disabled}
            onChange={(date) => field.onChange(date)}
          />
        )}
      />

      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>
      )}
    </div>
  );
};

export default InputDatePickerForm;
