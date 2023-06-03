import React from 'react';
import * as S from './OrderedItem.styles';
import ProductItemInOrder from '../ProductItemInOrder';
import { Order, OrderDetail } from 'types/api/orders';
import { toKoreanDate } from 'utils/converter';
import { ROUTES } from 'utils/constants';

interface OrderedItemProps {
  order: Order | OrderDetail;
}

const OrderedItem = ({ order }: OrderedItemProps) => {
  const { id, orderedItems, orderedTime } = order;
  const orderedDate = toKoreanDate(orderedTime);
  const isDetailPage = new RegExp(ROUTES.ORDERED_DETAIL).test(
    location.pathname
  );

  return (
    <S.Wrapper>
      <S.OrderHeader>
        <S.InfoWrapper>
          <S.HeaderInfo>주문번호 : {id}</S.HeaderInfo>
          <S.HeaderInfo>주문날짜 : {orderedDate} </S.HeaderInfo>
        </S.InfoWrapper>
        {!isDetailPage && (
          <S.LinkToOrderDetail to={`${ROUTES.ORDERED_DETAIL}/${id}`}>
            상세보기 ▶
          </S.LinkToOrderDetail>
        )}
      </S.OrderHeader>
      <S.Divider />
      <S.Container>
        {orderedItems.map((orderedItem, ind) => (
          <>
            <ProductItemInOrder
              key={orderedItem.id}
              orderedItem={orderedItem}
            />
            {ind !== orderedItems.length - 1 ? <S.Divider /> : null}
          </>
        ))}
      </S.Container>
    </S.Wrapper>
  );
};

export default OrderedItem;
