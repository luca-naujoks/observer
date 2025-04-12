export function FormInput({
  label,
  value,
  setValue,
  error,
  errorValue,
  placeholder,
  defaultValue,
  disabled,
  required,
  width,
}: {
  label?: string;
  value: string | number;
  setValue: (value: string) => void;
  error?: boolean;
  errorValue?: string;
  placeholder?: string;
  defaultValue?: string | number;
  disabled?: boolean;
  required?: boolean;
  width?: string;
}) {
  return (
    <>
      <label className={label ? "mb-2" : "hidden"}>{label}</label>
      <input
        type="text"
        required={required}
        defaultValue={defaultValue}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value as string)}
        disabled={disabled == undefined ? false : disabled}
        className={`${
          width ? width : "w-full"
        }  px-2 py-1 bg-transparent outline-hidden border-2 border-white ${
          error ? "border-red-500" : ""
        } disabled:border-gray-400 rounded-md`}
      />
      <p className="mb-4 text-red-500">{error ? errorValue : ""}</p>
    </>
  );
}
