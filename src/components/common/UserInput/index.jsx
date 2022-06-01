import React from "react";
import { forwardRef } from "react";
import { ErrorMessage, Input, InputContainer } from "./styled";

const UserInput = forwardRef(
  (
    { type, placeholder, errorMessage, onChange, value, width, ...rest },
    ref
  ) => (
    <InputContainer>
      <Input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        width={width}
        ref={ref}
        {...rest}
      />
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </InputContainer>
  )
);

export default UserInput;
