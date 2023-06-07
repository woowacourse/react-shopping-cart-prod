import { useEffect, useState } from 'react';
import { fetchOrderList } from '../../api';
import { OrderItemList } from '../../types/domain';

export const useOrderList = () => {
  const [orderList, setOrderList] = useState<OrderItemList[]>([]);
  const [error, setError] = useState<Error | null>(null);

  const getOrderList = async () => {
    try {
      const orderListData = await fetchOrderList();
      setOrderList(orderListData.orders);
    } catch (error) {
      if (error instanceof Error) return setError(error);
    }
  };

  if (error) throw error;

  useEffect(() => {
    getOrderList();
  }, []);

  return { orderList };
};
