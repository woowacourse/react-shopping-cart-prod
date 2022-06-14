import React from 'react';

import Button from 'styles/Button';

import Wrapper from './style';

const PayAmount = ({ name, amount, buttonText }) => {
  return (
    <Wrapper>
      <div className="title">
        <h3>{name}</h3>
      </div>
      <div className="amount">
        <div className="flex-row-space-between">
          <p>{name}</p>
          <p>{amount.toLocaleString()}원</p>
        </div>
        <Button>{buttonText}</Button>
      </div>
    </Wrapper>
  );
};

export default PayAmount;
