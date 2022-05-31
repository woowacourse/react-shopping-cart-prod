import React from "react";

import StyledInput from "./Input.styled";

export default function Input({
  type = "text",
  placeholder,
  minLength,
  maxLength,
}) {
  return (
    <StyledInput
      type={type}
      placeholder={placeholder}
      minLength={minLength}
      maxLength={maxLength}
    />
  );
}
