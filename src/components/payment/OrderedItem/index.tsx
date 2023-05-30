import React from 'react';
import { Order } from 'types';
import * as S from './OrderedItem.styles';
import ProductItemInOrder from '../ProductItemInOrder';

const OrderedItem = ({ item }: { item: Order }) => {
  const { orderId, products } = item;

  return (
    <S.Wrapper>
      <S.OrderHeader>
        <S.OrderNumber>주문번호 : {orderId}</S.OrderNumber>
        <S.LinkToOrderDetail to="/">상세보기 ▶</S.LinkToOrderDetail>
      </S.OrderHeader>
      <S.Divider />
      <S.Container>
        {products.map((product, ind) => (
          <>
            <ProductItemInOrder product={{ ...product, quantity: 3 }} />
            {ind !== products.length - 1 ? <S.Divider /> : null}
          </>
        ))}
      </S.Container>
    </S.Wrapper>
  );
};

export default OrderedItem;
