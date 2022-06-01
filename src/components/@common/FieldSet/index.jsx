import PropTypes from 'prop-types';
import React from 'react';

import * as S from './styles';

function FieldSet({ labelText, description, children }) {
  return (
    <S.Container>
      <S.Label>{labelText}</S.Label>
      <S.InputContainer>{children}</S.InputContainer>
      <S.Description>{description}</S.Description>
    </S.Container>
  );
}

FieldSet.propTypes = {
  labelText: PropTypes.string.isRequired,
  description: PropTypes.string,
};

FieldSet.defaultProps = {
  description: '',
};

export default FieldSet;
