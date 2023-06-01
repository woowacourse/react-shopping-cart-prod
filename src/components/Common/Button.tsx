import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styled from 'styled-components';

type ButtonSizeType = 'small' | 'medium';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSizeType;
  autoSize?: boolean;
  buttonPrimary?: boolean;
  buttonBorder?: boolean;
  children: ReactNode;
}

const Button = ({
  size = 'medium',
  buttonPrimary = true,
  autoSize = false,
  buttonBorder = false,
  children,
  ...args
}: ButtonProps) => {
  return (
    <StyledButton
      size={size}
      buttonPrimary={buttonPrimary}
      autoSize={autoSize}
      buttonBorder={buttonBorder}
      {...args}
    >
      {children}
    </StyledButton>
  );
};

const buttonStyles = {
  small: {
    width: '100px',
    height: '35px',
    fontSize: '16px',
  },
  medium: {
    width: '300px',
    height: '73px',
    fontSize: '20px',
  },
};

const StyledButton = styled(
  ({ autoSize, buttonPrimary, buttonBorder, ...restProps }: ButtonProps) => (
    <button {...restProps} />
  )
)`
  ${({ size }) => buttonStyles[size ?? 'medium']}
  width: ${({ size, autoSize }) =>
    autoSize ? '100%' : buttonStyles[size ?? 'medium'].width};
  background: ${({ theme, buttonPrimary }) =>
    buttonPrimary ? theme.colors.black : theme.colors.white};
  color: ${({ theme, buttonPrimary }) =>
    buttonPrimary ? theme.colors.white : theme.colors.black};
  border: ${({ theme, buttonBorder }) =>
    buttonBorder ? `1px solid ${theme.colors.gray300}` : 'none'};

  &:disabled {
    cursor: not-allowed;
    background: ${({ theme }) => theme.colors.gray200};
  }
`;

export default Button;
