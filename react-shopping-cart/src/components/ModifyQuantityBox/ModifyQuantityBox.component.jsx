import { useState } from 'react';
import styled from 'styled-components';
import { css } from 'styled-components';

function ModifyQuantityBox({ onChange, quantity }) {
  const [count, setCount] = useState(quantity ?? 0);
  const handleDecrement = () => {
    if (count <= 0) {
      return;
    }
    setCount(count - 1);
    onChange(count - 1);
  };

  const handleIncrement = () => {
    setCount(count + 1);
    onChange(count + 1);
  };

  return (
    <>
      <ModifyQuantityButton onClick={handleDecrement}>-</ModifyQuantityButton>
      <span>{count}</span>
      <ModifyQuantityButton onClick={handleIncrement}>+</ModifyQuantityButton>
    </>
  );
}

export default ModifyQuantityBox;

const ModifyQuantityButton = styled.button`
  width: 20%;
  height: 100%;
  border-radius: 20px;
  ${({ theme }) => css`
    background-color: ${theme.colors['MINT_001']};
    color: ${theme.colors['WHITE_001']};
  `}

  &:hover {
    filter: brightness(1.07);
  }
  &:active {
    transform: scale(0.9);
  }
`;
