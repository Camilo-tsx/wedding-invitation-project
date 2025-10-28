import { Control, Controller, FieldError } from "react-hook-form";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFormProps {
  fieldName: string;
  control: Control<any>;
  label: string;
  options: SelectOption[];
  error?: FieldError;
  placeholder?: string;
  selectClassName?: string;
  labelClassName?: string;
}

const SelectForm = ({
  fieldName,
  control,
  label,
  options,
  error,
  placeholder,
  selectClassName,
  labelClassName,
}: SelectFormProps) => {
  return (
    <div className="flex flex-col">
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
          <select
            id={fieldName}
            {...field}
            value={field.value ?? ""}
            className={selectClassName}
            style={{ fontFamily: "'Lora', serif" }}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
      />

      {error && <p className="error">{error.message}</p>}
    </div>
  );
};

export default SelectForm;
