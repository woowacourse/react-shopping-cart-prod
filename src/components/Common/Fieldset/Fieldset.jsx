import React from 'react';
import PropTypes from 'prop-types';
import * as Styled from './style';

const Fieldset = ({ children }) => {
  return <Styled.Wrapper>{children}</Styled.Wrapper>;
};

Fieldset.propTypes = {
  children: PropTypes.node,
};

export default Fieldset;
