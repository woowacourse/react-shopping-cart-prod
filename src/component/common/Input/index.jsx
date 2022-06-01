import React from 'react';
import * as S from './style';
import PropTypes from 'prop-types';

function Input({size, label, placeHolder, id, isDisabled}) {
  return (
    <S.Layout>
      <S.Label htmlFor={id}>{label}</S.Label>
      <S.Input size={size} id={id} placeholder={placeHolder} disabled={isDisabled ? true : false} />
    </S.Layout>
  );
}

Input.propTypes = {
  size: PropTypes.string,
  label: PropTypes.string,
  placeHolder: PropTypes.string,
  id: PropTypes.string,
  isDisabled: PropTypes.bool,
};

export default Input;
