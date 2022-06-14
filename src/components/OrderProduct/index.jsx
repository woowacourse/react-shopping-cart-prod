import React from 'react';

import Wrapper from './style';

const OrderProduct = () => {
  return (
    <Wrapper>
      <img src="" alt="주문 상품" />
      <div className="info">
        <p className="title">반바지</p>
        <p className="rest">12,341원 / 수량: 3개</p>
      </div>
    </Wrapper>
  );
};

export default OrderProduct;
