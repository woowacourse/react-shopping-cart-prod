import PropTypes from 'prop-types';
import React from 'react';

import { FlexContainer } from 'components/@common';

import * as S from './styles';

function FieldSet({ labelText, description, children }) {
  return (
    <S.Container>
      <S.Label>{labelText}</S.Label>

      <FlexContainer gap={10}>{children}</FlexContainer>
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
