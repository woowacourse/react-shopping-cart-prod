import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../../styles/theme';

function Button({ text, ...rest }) {
  return <StyledButton {...rest}>{text}</StyledButton>;
}

const StyledButton = styled.button`
  height: 48px;
  width: 462px;
  margin: 14px 0;
  border-radius: 4px;
  border: none;
  font-size: 20px;
  font-weight: 600;
  background-color: ${COLORS.PRIMARY};
  color: ${COLORS.WHITE};

  &:hover {
    background-color: ${COLORS.LIGHT_PRIMARY};
  }
`;

export default Button;
