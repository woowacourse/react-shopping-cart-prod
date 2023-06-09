import { InputHTMLAttributes, forwardRef } from 'react';
import styled, { CSSProp } from 'styled-components';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  css: CSSProp;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ ...props }, ref) => {
  return <StyledInput ref={ref} {...props} />;
});

const StyledInput = styled.input<{ css: CSSProp }>`
  ${(props) => props.css}
`;

export default Input;
