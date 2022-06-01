import React from "react";

import StyledField from "./Field.styled";
import Input from "@/components/input/Input";

function Field({
  labelName,
  type,
  placeholder,
  minLength,
  maxLength,
  errorMessage,
  disabled,
}) {
  return (
    <StyledField>
      <div className="field__header">
        <label>{labelName}</label>
        <div className="error__message">{errorMessage}</div>
      </div>
      <Input
        type={type}
        placeholder={placeholder}
        minLength={minLength}
        maxLength={maxLength}
        disabled={disabled}
      />
    </StyledField>
  );
}

export default Field;
