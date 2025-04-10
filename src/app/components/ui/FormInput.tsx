"use client";

import { useEffect, useState } from "react";

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
        className={`w-full px-2 py-1 bg-transparent outline-hidden border-2 border-gray-500 ${
          error ? "border-red-500" : ""
        } disabled:border-gray-700 placeholder-gray-700 rounded-md`}
      />
      <p className="mb-4 text-red-500">{error ? errorValue : ""}</p>
    </>
  );
}
