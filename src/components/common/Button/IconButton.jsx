import React from "react";
import styled from "styled-components";

const Button = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  img {
    width: ${({ width }) => width};
    :hover {
      transform: scale(1.05);
    }
  }
`;

function IconButton({ src, alt, onClick, width, disabled }) {
  return (
    <Button onClick={onClick} width={width} disabled={disabled}>
      <img src={src} alt={alt} />
    </Button>
  );
}

export default IconButton;
