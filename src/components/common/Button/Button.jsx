import React from 'react';
import * as S from 'components/common/Button/Button.style';

function Button({
  children,
  type = 'button',
  isWithInput = false,
  variant = 'default',
  ...props
}) {
  return (
    <S.Button type={type} isWithInput={isWithInput} variant={variant} {...props}>
      {children}
    </S.Button>
  );
}

export default Button;
