import React from 'react';

import Wrapper from './style';

const OrderHeader = ({ orderNumber }) => {
  return (
    <Wrapper>
      <p>주문번호 : {orderNumber}</p>
      <p>상세보기 {'>'}</p>
    </Wrapper>
  );
};

export default OrderHeader;
