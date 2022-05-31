import React from "react";
import styled from "styled-components";

const InputContainer = styled.div`
  height: 80px;
`;

const Input = styled.input`
  width: ${({ width }) => width};
  padding: 16px;

  border: none;
  border-radius: 8px;

  ${({ theme: { fontSize, color } }) => `
    font-size: ${fontSize.medium};
    outline: 1px solid ${color.gray02};

    &:focus {
      outline: 1px solid ${color.gray01};
    }

    &::placeholder {
      color: ${color.gray02};
    }
  `}
`;

const ErrorMessage = styled.p`
  padding: 8px;
  color: ${({ theme: { color } }) => color.point};
  font-size: ${({ theme: { fontSize } }) => fontSize.small};
`;

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
