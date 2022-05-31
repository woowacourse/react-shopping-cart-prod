import React from 'react';
import * as Styled from 'components/common/Button/Button.style';

function Button({ children, type = 'button', isWithInput = false, ...props }) {
  return (
    <Styled.Button type={type} isWithInput={isWithInput} {...props}>
      {children}
    </Styled.Button>
  );
}

export default Button;
