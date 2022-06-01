import React from 'react';
import * as Styled from 'components/common/Button/Button.style';

function Button({
  children,
  type = 'button',
  isWithInput = false,
  variant = 'default',
  ...props
}) {
  return (
    <Styled.Button type={type} isWithInput={isWithInput} variant={variant} {...props}>
      {children}
    </Styled.Button>
  );
}

export default Button;
