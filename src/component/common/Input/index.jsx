import React from 'react';
import * as S from './style';
import PropTypes from 'prop-types';

function Input({size, label, placeHolder, id, isDisabled, isError, message, value = '', ...rest}) {
  return (
    <S.Layout>
      <S.Label htmlFor={id}>{label}</S.Label>
      <S.Input size={size} id={id} placeholder={placeHolder} disabled={isDisabled} {...rest} />
      <S.Message value={value}>{isError && message}</S.Message>
    </S.Layout>
  );
}

Input.propTypes = {
  size: PropTypes.string,
  label: PropTypes.string,
  placeHolder: PropTypes.string,
  id: PropTypes.string,
  isDisabled: PropTypes.bool,
  isError: PropTypes.bool,
  message: PropTypes.string,
  value: PropTypes.string,
};

export default Input;
