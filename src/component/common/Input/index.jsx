import React from 'react';
import * as S from './style';
import PropTypes from 'prop-types';

function Input({size, label, placeHolder, id}) {
  return (
    <S.Layout>
      <S.Label htmlFor={id}>{label}</S.Label>
      <S.Input size={size} id={id} placeholder={placeHolder} />
    </S.Layout>
  );
}

Input.propTypes = {
  size: PropTypes.string,
  label: PropTypes.string,
  placeHolder: PropTypes.string,
  id: PropTypes.string,
};

export default Input;
