import React, { useEffect } from "react";

interface InputFieldState {
  value: string;
  validated: boolean | undefined; // undefined = not validated, true = validated, false = invalid
}

interface TextInputFieldProps {
  id: string;
  placeholder?: string;
  className?: string;
  value: InputFieldState;
  setValue: (val: InputFieldState) => void;
  disabled?: boolean;
  backendURL: string;
  customValidator?: (value: string) => boolean;
}

function TextInputField({
  id,
  placeholder,
  className,
  value,
  setValue,
  disabled,
  backendURL,
  customValidator,
}: TextInputFieldProps) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue({ ...value, value: e.target.value });
  }

  useEffect(() => {
    if (!value.value) {
      setValue({ ...value, validated: undefined });
      return;
    }
    const timeout = setTimeout(valueCheck, 1000);
    return () => clearTimeout(timeout);
  }, [value.value]);



  async function valueCheck() {

    if (customValidator) {
      if (customValidator(value.value)) {
        setValue({ ...value, validated: true });
      } else {
        setValue({ ...value, validated: false });
      }
      return;
    }

    const requestURL = backendURL + "/setup/check-" + id;
    try {
      const response = await fetch(requestURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ payload: value.value }),
      });
      if (response.status === 204) {
        setValue({ ...value, validated: true });
      } else {
        setValue({ ...value, validated: false });
      }
    } catch (error) {
      setValue({ ...value, validated: false });
      console.error("Error during validation:", error);
    }
  }



  function borderSwitch(): string {
    return value.validated === true
      ? "!border-green-700"
      : value.validated === false
      ? "!border-red-700"
      : value.validated === undefined && disabled ?
      "!border-gray-700" : "!border-gray-500";
  }

  return (
    <input
      id={id}
      placeholder={placeholder || id}
      value={value.value}
      onChange={handleChange}
      disabled={disabled}
      onKeyDown={(e) => {
        if (e.key === "Enter") valueCheck();
      }}
      className={
        className +
        (disabled ? " placeholder-gray-700 text-gray-700" : "placeholder-gray-300 text-gray-300") +
        " w-full bg-transparent autofill:bg-transparent border-2 p-1 outline-hidden rounded-md " +
        borderSwitch()
      }
    />
  );
}

export default React.memo(TextInputField);
