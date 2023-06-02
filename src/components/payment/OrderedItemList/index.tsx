import React from 'react';
import OrderedItem from '../OrderedItem';
import * as S from './OrderedItemList.styles';
import { useGet } from 'hooks/useGet';
import { Order } from 'types/api/orders';
import { getOrders } from 'api/orders';

const OrderedItemList = () => {
  const { data: orderList } = useGet(getOrders);

  return (
    <S.ItemWrapper>
      {orderList?.map((item: Order) => (
        <OrderedItem order={item} />
      ))}
    </S.ItemWrapper>
  );
};

export default OrderedItemList;
