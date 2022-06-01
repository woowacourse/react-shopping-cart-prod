import styled from 'styled-components';
import { forwardRef, ReactNode, ChangeEvent } from 'react';

interface InputProps {
  children: ReactNode;
  placeholder?: string;
  type: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  disable?: boolean;
}

const SignInput = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { children, placeholder = '', type, onChange, disable = false } = props;

  return (
    <StyledLabel>
      {children}
      <StyledInput
        placeholder={placeholder}
        type={type}
        onChange={onChange}
        disabled={disable}
        ref={ref}
        required
      />
    </StyledLabel>
  );
});

SignInput.displayName = 'signInput';

const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
  width: 80%;

  font-weight: 400;
  font-size: 20px;
  line-height: 24px;

  letter-spacing: 0.5px;

  gap: 10px;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 65px;
  font-size: 20px;
  padding-left: 10px;
`;

export default SignInput;
