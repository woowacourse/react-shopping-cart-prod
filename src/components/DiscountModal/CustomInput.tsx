import { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {}

const CustomInput = ({ placeholder, min, max, ...rest }: CustomInputProps) => {
  return <Input min={min} max={max} type="number" required autoFocus placeholder={placeholder} {...rest} />;
};

export default CustomInput;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid #000;
  outline: none;
  padding: 4px;
  width: 40%;
  font-size: 16px;
  margin-left: 4px;
  width: 60%;
  appearance: textfield;

  ::after {
    content: '원';
    font-size: 14px;
    margin-left: 4px;
  }
`;
