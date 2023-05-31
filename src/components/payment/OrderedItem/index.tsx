import React from 'react';
import * as S from './OrderedItem.styles';
import ProductItemInOrder from '../ProductItemInOrder';
import { Order } from 'types/api/orders';

const OrderedItem = ({ order }: { order: Order }) => {
  const { id, orderedItems } = order;

  return (
    <S.Wrapper>
      <S.OrderHeader>
        <S.OrderNumber>주문번호 : {id}</S.OrderNumber>
        <S.LinkToOrderDetail to="/">상세보기 ▶</S.LinkToOrderDetail>
      </S.OrderHeader>
      <S.Divider />
      <S.Container>
        {orderedItems.map((orderedItem, ind) => (
          <>
            <ProductItemInOrder orderedItem={{ ...orderedItem, quantity: 3 }} />
            {ind !== orderedItems.length - 1 ? <S.Divider /> : null}
          </>
        ))}
      </S.Container>
    </S.Wrapper>
  );
};

export default OrderedItem;
