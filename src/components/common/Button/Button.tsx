import type { ComponentPropsWithoutRef } from 'react';
import type { CSSProp } from 'styled-components';

import * as S from './Button.styles';

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  css?: CSSProp;
  variant?: 'default' | 'primary' | 'secondary' | 'danger' | 'textButton';
  size?: 'small' | 'medium' | 'large';
}

const Button = ({ variant = 'default', size = 'medium', children, ...attributes }: ButtonProps) => {
  return (
    <S.Button variant={variant} size={size} {...attributes}>
      {children}
    </S.Button>
  );
};

export default Button;
