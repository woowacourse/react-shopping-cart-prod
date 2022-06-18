import { forwardRef, ReactNode, ChangeEvent, InputHTMLAttributes } from 'react';
import { Styled } from './styles';

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
    <Styled.Label>
      {children}
      <Styled.Input
        placeholder={placeholder}
        type={type}
        onChange={onChange}
        disabled={disable}
        ref={ref}
        isValid={isValid}
        required
      />
      {isValid || <p>{inValidText}</p>}
    </Styled.Label>
  );
});

SignInput.displayName = 'signInput';

export default SignInput;
