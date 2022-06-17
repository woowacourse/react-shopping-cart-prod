import React from "react";
import styled from "styled-components";

const BoxButton = styled.button`
  width: ${({ width = "100%" }) => width};
  padding: 16px 8px;

  ${({ theme: { color, fontSize }, bgColor, textColor }) => `
    font-size: ${fontSize.medium};
    font-weight: 700;
    color: ${textColor || color.main};
    border: 1px solid ${color.point};
    border-radius: 8px;
    background-color: ${bgColor || color.point};
  `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;

    &:hover {
      opacity: 0.5;
    }
  }

  cursor: pointer;

  :hover {
    opacity: 0.95;
  }
`;

function DefaultButton({ children, ...rest }) {
  return <BoxButton {...rest}>{children}</BoxButton>;
}

export default DefaultButton;
