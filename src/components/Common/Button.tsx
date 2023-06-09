import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styled from 'styled-components';

import {
  ButtonStyleProps,
  ComponentVariant,
  buttonStyles,
} from '../../styles/component';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ComponentVariant;
  autoSize?: boolean;
  primary?: boolean;
  border?: boolean;
  children: ReactNode;
}

const Button = ({
  variant = 'medium',
  primary = true,
  autoSize = false,
  border = false,
  children,
  ...args
}: ButtonProps) => {
  return (
    <StyledButton
      variant={variant}
      primary={primary}
      autoSize={autoSize}
      border={border}
      {...args}
    >
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button<ButtonStyleProps>`
  ${({ variant }) => buttonStyles[variant]}
  width: ${({ variant, autoSize }) =>
    autoSize ? '100%' : buttonStyles[variant].width};
  background: ${({ theme, primary }) =>
    primary ? theme.colors.black : theme.colors.white};
  color: ${({ theme, primary }) =>
    primary ? theme.colors.white : theme.colors.black};
  border: ${({ theme, border }) =>
    border ? `1px solid ${theme.colors.gray300}` : 'none'};

  &:disabled {
    cursor: not-allowed;
    background: ${({ theme }) => theme.colors.gray200};
  }
`;

export default Button;
