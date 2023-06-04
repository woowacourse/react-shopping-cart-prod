import type { PropsWithChildren } from 'react';
import type { RuleSet } from 'styled-components';
import { css, styled } from 'styled-components';

type ButtonSize = 'small' | 'medium';

type ButtonVariant = 'contained' | 'text';

const stylesBySize: Record<ButtonSize, RuleSet<object>> = {
  small: css`
    padding: 16px 32px;
    font-size: 16px;
  `,
  medium: css`
    padding: 24px 48px;
    font-size: 24px;
  `,
};

const stylesByVariant: Record<ButtonVariant, RuleSet<object>> = {
  contained: css`
    background: #333333;
    color: white;

    &[disabled] {
      background: #666666;
    }
  `,
  text: css`
    background: transparent;
    color: black;
  `,
};

type ButtonContainerProps = {
  $size: ButtonSize;
  $variant: ButtonVariant;
};

const ButtonContainer = styled.button<ButtonContainerProps>`
  ${(props) => stylesBySize[props.$size]}
  ${(props) => stylesByVariant[props.$variant]}

  &[disabled] {
    cursor: not-allowed;
  }
`;

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  PropsWithChildren<{
    size?: ButtonSize;
    variant?: ButtonVariant;
    disabled?: boolean;
  }>;

const Button = (props: ButtonProps) => {
  const {
    children,
    size = 'medium',
    variant = 'contained',
    disabled = false,
    ...buttonProps
  } = props;

  return (
    <ButtonContainer $size={size} $variant={variant} disabled={disabled} {...buttonProps}>
      {children}
    </ButtonContainer>
  );
};

export default Button;
