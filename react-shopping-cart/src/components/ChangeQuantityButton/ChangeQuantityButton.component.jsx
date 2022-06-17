import { useState } from 'react';
import styled from 'styled-components';

import BorderBox from 'components/@shared/BorderBox/BorderBox.component';

function ChangeQuantityButton({ quantity, onChangeQuantity }) {
  const [count, setCount] = useState(quantity);

  const handleIncrementProduct = () => {
    setCount(prev => prev + 1);
    onChangeQuantity(count + 1);
  };

  const handleDecrementProduct = () => {
    if (count === 1) {
      return;
    }
    setCount(prev => prev - 1);
    onChangeQuantity(count - 1);
  };

  return (
    <ChangeQuantityButtonContainer>
      <CountBox textAlign="center" lineHeight="30px" fontSize="24px" padding="10px">
        {count}
      </CountBox>
      <BorderBox
        textAlign="center"
        lineHeight="8px"
        onClick={handleIncrementProduct}
        cursor="pointer"
        padding="10px"
      >
        ▲
      </BorderBox>
      <BorderBox
        textAlign="center"
        lineHeight="8px"
        onClick={handleDecrementProduct}
        cursor="pointer"
        padding="10px"
      >
        ▼
      </BorderBox>
    </ChangeQuantityButtonContainer>
  );
}

export default ChangeQuantityButton;

const ChangeQuantityButtonContainer = styled.div`
  display: grid;
  grid-template-rows: 30px 30px;
  grid-template-columns: 73px 42px;

  ${BorderBox}:nth-child(1) {
    grid-row: 1 / span 2;
  }
`;

const CountBox = styled(BorderBox).attrs({
  textAlign: 'center',
  lineHeight: '30px',
  fontSize: '24px',
  padding: '10px',
})`
  display: flex;
  align-items: center;
  justify-content: center;
`;
