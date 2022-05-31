import React from "react";
import { ErrorMessage, Input, InputContainer } from "./styled";

function UserInput({
  type,
  placeholder,
  errorMessage,
  onChange,
  value,
  width,
  ...rest
}) {
  return (
    <InputContainer>
      <Input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        width={width}
        {...rest}
      />
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </InputContainer>
  );
}

export default UserInput;
