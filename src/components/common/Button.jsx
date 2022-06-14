import React from 'react';
import styled from 'styled-components';

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
  background-color: ${(props) => props.theme.main.PRIMARY};
  color: ${(props) => props.theme.main.WHITE};

  &:hover {
    background-color: ${(props) => props.theme.main.LIGHT_PRIMARY};
  }
`;

export default Button;
