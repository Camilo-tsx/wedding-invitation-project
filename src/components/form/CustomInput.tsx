import { Control, Controller, FieldError } from "react-hook-form";

interface InputProps {
  fieldName: string;
  control: Control<any>;
  label: string;
  type?: string;
  error?: FieldError;
  placeHolder?: string;
  inputClassName?: string;
  labelClassName?: string;
  containerClassName?: string;
  maxValue?: number;
}

const InputForm = ({
  fieldName,
  control,
  label,
  type,
  error,
  placeHolder,
  inputClassName,
  labelClassName,
  containerClassName,
  maxValue,
}: InputProps) => {
  return (
    <div className={`flex flex-col ${containerClassName}`}>
      <label
        htmlFor={fieldName}
        className={labelClassName}
        style={{ fontFamily: "'Lora', serif" }}
      >
        {label}
      </label>
      <Controller
        name={fieldName}
        control={control}
        render={({ field }) => (
          <input
            id={fieldName}
            type={type}
            {...field}
            value={field.value ?? ""}
            className={inputClassName}
            placeholder={placeHolder}
            style={{ fontFamily: "'Lora', serif" }}
            max={maxValue}
          />
        )}
      />

      {error && <p className="text-[11px] text-[#FF5F62]">{error.message}</p>}
    </div>
  );
};

export default InputForm;
