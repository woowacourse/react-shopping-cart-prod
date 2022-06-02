import styled from 'styled-components';
import { forwardRef, ReactNode, ChangeEvent, InputHTMLAttributes } from 'react';
import colors from '../../styles/theme';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  children: ReactNode;
  placeholder?: string;
  type: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  disable?: boolean;
  isValid?: boolean;
  inValidText?: string;
}

const SignInput = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    children,
    placeholder = '',
    type,
    onChange,
    disable = false,
    isValid = true,
    inValidText,
  } = props;

  return (
    <StyledLabel>
      {children}
      <StyledInput
        placeholder={placeholder}
        type={type}
        onChange={onChange}
        disabled={disable}
        ref={ref}
        isValid={isValid}
        required
      />
      {isValid || <StyledInstruction>{inValidText}</StyledInstruction>}
    </StyledLabel>
  );
});

SignInput.displayName = 'signInput';

const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
  width: 80%;

  font-weight: 400;
  font-size: 2.4rem;
  line-height: 2.4rem;

  letter-spacing: 0.5px;

  gap: 0.4rem;
`;

const StyledInput = styled.input<any>`
  width: 100%;
  height: 6.5rem;
  font-size: 2rem;
  padding-left: 1rem;

  border-top: 0px;
  border-left: 0px;
  border-right: 0px;

  outline: none;
  border-bottom: ${props => (props.isValid ? colors.colors.primary : 'red')} 3px solid;
`;

const StyledInstruction = styled.p``;

export default SignInput;
