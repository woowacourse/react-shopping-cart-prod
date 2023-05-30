import React from 'react';
import { styled } from 'styled-components';
import Title from '../components/common/Title';
import OrderPrice from '../components/orderDetail/OrderPrice';
import OrderItemList from '../components/orderList/OrderItemList';

const OrderDetailPage = () => {
  return (
    <S.Main>
      <Title title='주문 내역 상세' />
      <OrderItemList />
      <OrderPrice totalPrice={325000} />
    </S.Main>
  );
};

const S = {
  Main: styled.main`
    max-width: 1320px;
    margin: 0 auto;
    padding: 0 20px;

    @media (max-width: 1270px) {
      padding: 0 36px;
    }

    @media (max-width: 420px) {
      padding: 0 28px;
    }
  `,
};

export default OrderDetailPage;
