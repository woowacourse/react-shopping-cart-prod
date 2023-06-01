import React from 'react';
import OrderedItem from '../OrderedItem';
import * as S from './OrderedItemList.styles';
import { useGet } from 'hooks/useGet';
import { Order } from 'types/api/orders';
import { getMockOrders } from 'api/mockApi';

const OrderedItemList = () => {
  const { data: orderList } = useGet(getMockOrders);

  return (
    <S.ItemWrapper>
      {orderList?.map((item: Order) => (
        <OrderedItem order={item} />
      ))}
    </S.ItemWrapper>
  );
};

export default OrderedItemList;
