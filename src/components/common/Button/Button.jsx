import React from 'react';
import * as Styled from 'components/common/Button/Button.style';

function Button({ children, type = 'button', ...props }) {
  return (
    <Styled.Button type={type} {...props}>
      {children}
    </Styled.Button>
  );
}

export default Button;
