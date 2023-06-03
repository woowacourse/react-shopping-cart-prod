import React from 'react';
import * as S from './OrderedItem.styles';
import ProductItemInOrder from '../ProductItemInOrder';
import { Order, OrderDetail } from 'types/api/orders';

const OrderedItem = ({ order }: { order: Order | OrderDetail }) => {
  const { id, orderedItems } = order;
  const isDetailPage = /order_detail/.test(location.pathname);

  return (
    <S.Wrapper>
      <S.OrderHeader>
        <S.OrderNumber>주문번호 : {id}</S.OrderNumber>
        {!isDetailPage && (
          <S.LinkToOrderDetail to={`/order_detail/${id}`}>
            상세보기 ▶
          </S.LinkToOrderDetail>
        )}
      </S.OrderHeader>
      <S.Divider />
      <S.Container>
        {orderedItems.map((orderedItem, ind) => (
          <>
            <ProductItemInOrder orderedItem={orderedItem} />
            {ind !== orderedItems.length - 1 ? <S.Divider /> : null}
          </>
        ))}
      </S.Container>
    </S.Wrapper>
  );
};

export default OrderedItem;
