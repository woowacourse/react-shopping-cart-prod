import { useEffect } from 'react';
import { useRecoilCallback } from 'recoil';

import { OrderList } from './OrderList/OrderList';

import { orderListSelector } from '@recoils/ordersAtoms';

export const OrdersPage = () => {
  const refreshOrderList = useRecoilCallback(({ refresh }) => () => {
    refresh(orderListSelector);
  });

  useEffect(() => {
    refreshOrderList();
  }, [refreshOrderList]);

  return <OrderList />;
};
