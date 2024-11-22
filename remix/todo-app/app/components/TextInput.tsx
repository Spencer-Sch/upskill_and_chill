"use client";
import { ChangeEvent } from "react";

interface TextInputProps {
  inputName: string;
  label: string;
  value?: string;
  placeholder?: string;
  // styles?: string
  inputType?: "text" | "textarea" | "password" | "email";
  required?: boolean;
  onChangeCallback?: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
}

const TextInput = ({
  inputName,
  label,
  value,
  placeholder = "",
  // styles,
  inputType = "text",
  required,
  onChangeCallback,
}: TextInputProps) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={inputName} className="text-orange font-bold">
        {label}
      </label>
      {inputType === "textarea" ? (
        <textarea
          name={inputName}
          id={inputName}
          value={value}
          className="common-input"
          onChange={onChangeCallback}
          placeholder={placeholder}
          required={required}
          rows={8}
          cols={15}
        />
      ) : (
        <input
          name={inputName}
          id={inputName}
          value={value}
          className="common-input"
          onChange={onChangeCallback}
          type={inputType}
          placeholder={placeholder}
          required={required}
        />
      )}
    </div>
  );
};

export default TextInput;
