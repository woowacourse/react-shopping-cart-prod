import React from 'react';
import OrderedItem from '../OrderedItem';
import * as S from './OrderedItemList.styles';
import { useGet } from 'hooks/useGet';
import { Order } from 'types/api/orders';
import { getOrders } from 'api/orders';

const OrderedItemList = () => {
  const { data: orders } = useGet(getOrders);

  const orderedList = orders?.length
    ? orders?.map((item: Order) => <OrderedItem order={item} />)
    : <S.EmptyList>주문한 상품 목록이 없습니다.</S.EmptyList>;

  return <S.ItemWrapper>{orderedList}</S.ItemWrapper>;
};

export default OrderedItemList;
