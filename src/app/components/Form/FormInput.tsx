export function FormInput({
  label,
  value,
  setValue,
  error,
  errorMessage,
  placeholder,
  disabled,
  required,
  width,
}: {
  label?: string;
  value: string;
  setValue: (value: string) => void;
  error?: boolean;
  errorMessage?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  width?: string;
}) {
  return (
    <>
      <label
        className={`${label ? "mb-2 " : "hidden "}${
          disabled ? "text-gray-500" : ""
        }`}
      >
        {label}
      </label>
      <input
        type="text"
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value as string)}
        disabled={disabled ?? false}
        className={`${
          width ? width : "w-full"
        } px-2 py-1 bg-transparent outline-none border-2 border-gray-400 ${
          error ? "border-red-500" : ""
        } disabled:border-gray-500 disabled:text-gray-500 rounded-md`}
      />
      {error && errorMessage && (
        <p className="mb-4 text-red-500" role="alert" aria-live="polite">
          {errorMessage}
        </p>
      )}
    </>
  );
}
