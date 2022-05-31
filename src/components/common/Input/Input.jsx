import React from 'react';
import * as Styled from 'components/common/Input/Input.style';
import { Button } from 'components/common';

function Input({
  type = 'text',
  labelText,
  placeholder,
  value,
  onChange,
  isButtonDisabled,
  isValid,
  buttonText,
  onButtonClick,
}) {
  return (
    <Styled.Label>
      {labelText}
      <Styled.InputWrapper>
        <Styled.Input
          type={type}
          value={value}
          onChange={onChange}
          isValid={isValid}
          placeholder={placeholder}
          hasButton={buttonText && onButtonClick}
        />
        {buttonText && onButtonClick && (
          <Button onClick={onButtonClick} isWithInput={true} disabled={isButtonDisabled}>
            {buttonText}
          </Button>
        )}
      </Styled.InputWrapper>
    </Styled.Label>
  );
}

export default Input;
