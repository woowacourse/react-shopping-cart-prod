import { ButtonHTMLAttributes, ReactNode } from 'react';
import { Size, Styled, Theme } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size: Size;
  backgroundColor: keyof Theme['colors'];
  children: ReactNode;
}

const Button = ({ size, backgroundColor, children, ...props }: ButtonProps) => {
  return (
    <Styled.Button size={size} backgroundColor={backgroundColor} {...props}>
      {children}
    </Styled.Button>
  );
};

export default Button;
