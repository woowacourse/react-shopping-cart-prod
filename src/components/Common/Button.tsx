import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styled from 'styled-components';

type ButtonSizeType = 'small' | 'medium';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSizeType;
  isAutoSize?: boolean;
  hasPrimary?: boolean;
  hasBorder?: boolean;
  children: ReactNode;
}

const Button = ({
  size = 'medium',
  hasPrimary = true,
  isAutoSize = false,
  hasBorder = false,
  children,
  ...args
}: ButtonProps) => {
  return (
    <StyledButton
      size={size}
      hasPrimary={hasPrimary}
      isAutoSize={isAutoSize}
      hasBorder={hasBorder}
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
  ({ isAutoSize, hasPrimary, hasBorder, ...restProps }: ButtonProps) => (
    <button {...restProps} />
  )
)`
  ${({ size }) => buttonStyles[size ?? 'medium']}
  width: ${({ size, isAutoSize }) =>
    isAutoSize ? '100%' : buttonStyles[size ?? 'medium'].width};
  background: ${({ theme, hasPrimary }) =>
    hasPrimary ? theme.colors.black : theme.colors.white};
  color: ${({ theme, hasPrimary }) =>
    hasPrimary ? theme.colors.white : theme.colors.black};
  border: ${({ theme, hasBorder }) =>
    hasBorder ? `1px solid ${theme.colors.gray300}` : 'none'};

  &:disabled {
    cursor: not-allowed;
    background: ${({ theme }) => theme.colors.gray200};
  }
`;

export default Button;
