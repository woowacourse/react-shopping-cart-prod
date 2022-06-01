import React from "react";

import StyledInput from "./Input.styled";

export default function Input({
  type = "text",
  placeholder,
  minLength,
  maxLength,
  value,
  required,
  disabled,
  onChange,
}) {
  return (
    <StyledInput
      type={type}
      placeholder={placeholder}
      minLength={minLength}
      maxLength={maxLength}
      value={value}
      required={required}
      disabled={disabled}
      onChange={onChange}
    />
  );
}
