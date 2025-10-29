import { Controller } from "react-hook-form";

interface CheckboxProps {
  fieldName: string;
  control: any;
  label: string;
  error?: any;
}

export const CheckboxForm = ({
  fieldName,
  control,
  label,
  error,
}: CheckboxProps) => {
  return (
    <div className="flex flex-col my-1">
      <Controller
        name={fieldName}
        control={control}
        render={({ field }) => (
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => field.onChange(!field.value)}
          >
            <div
              className={`w-5 h-5 border-2 rounded transition-all duration-200 flex items-center justify-center
                ${
                  field.value
                    ? "bg-white border-white"
                    : "border-white hover:border-gray-300"
                }`}
            >
              {field.value && (
                <svg
                  className="w-3 h-3 text-black"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
            <label
              className="text-white text-sm select-none"
              style={{ fontFamily: "'Lora', serif" }}
            >
              {label}
            </label>
          </div>
        )}
      />

      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
  );
};
