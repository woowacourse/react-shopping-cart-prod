import { useState } from 'react';
import styled from 'styled-components';
import { css } from 'styled-components';

import FlexBox from 'components/@shared/FlexBox/FlexBox.component';

import { ReactComponent as TrashCan } from 'assets/images/trash.svg';

function ModifyQuantityBox({ onChange, quantity }) {
  const [count, setCount] = useState(quantity);
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
      <ModifyQuantityButton onClick={handleDecrement}>
        {count === 1 ? <DeleteCartButton fill="white" /> : '-'}
      </ModifyQuantityButton>
      <span>{count}</span>
      <ModifyQuantityButton onClick={handleIncrement}>+</ModifyQuantityButton>
    </>
  );
}

export default ModifyQuantityBox;

const DeleteCartButton = styled(TrashCan)`
  path {
    fill: white !important;
  }
`;

const ModifyQuantityButton = styled(FlexBox).attrs({
  as: 'button',
  justifyContent: 'center',
  alignItems: 'center',
})`
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
