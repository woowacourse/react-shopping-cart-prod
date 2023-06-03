import React from 'react';
import * as S from './OrderedItem.styles';
import ProductItemInOrder from '../ProductItemInOrder';
import { Order, OrderDetail } from 'types/api/orders';
import { toKoreanDate } from 'utils/converter';

const OrderedItem = ({ order }: { order: Order | OrderDetail }) => {
  const { id, orderedItems, orderedTime } = order;
  const orderedDate = toKoreanDate(orderedTime);
  const isDetailPage = /order_detail/.test(location.pathname);

  return (
    <S.Wrapper>
      <S.OrderHeader>
        <S.InfoWrapper>
          <S.HeaderInfo>주문번호 : {id}</S.HeaderInfo>
          <S.HeaderInfo>주문날짜 : {orderedDate} </S.HeaderInfo>
        </S.InfoWrapper>
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
