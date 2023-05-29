import { ComponentPropsWithoutRef } from 'react';

import * as S from './Button.styles';

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
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
