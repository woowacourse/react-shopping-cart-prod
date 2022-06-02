import React from 'react';

import { Button } from 'components/common';
import * as S from 'components/common/Input/Input.style';

function Input({
  type = 'text',
  labelText,
  placeholder,
  required = false,
  value,
  onChange,
  isButtonDisabled,
  isValid = true,
  buttonText,
  onButtonClick,
  errorMessage,
}) {
  return (
    <S.Label>
      {labelText}
      <S.InputWrapper>
        <S.Input
          type={type}
          value={value}
          required={required}
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
      </S.InputWrapper>
      <S.ErrorMessage>{errorMessage !== '' && errorMessage}</S.ErrorMessage>
    </S.Label>
  );
}

export default Input;
