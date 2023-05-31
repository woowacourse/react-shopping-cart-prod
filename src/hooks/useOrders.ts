import { useCallback } from 'react';
import { useRecoilState } from 'recoil';

import { USER_TOKEN } from '../constants';
import { OrderItemInformationState, orderListState } from '../store/order';

const useOrders = () => {
  const [, setOrderList] = useRecoilState(orderListState);
  const [, setOrderInformation] = useRecoilState(OrderItemInformationState);
  const fetchOrderList = useCallback(async () => {
    const response = await fetch('/orders', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${USER_TOKEN}`,
      },
    });
    const result = await response.json();
    setOrderList(result);
    return result;
  }, [setOrderList]);

  const fetchOrderOneItem = useCallback(
    async (id: number) => {
      const response = await fetch(`/orders/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${USER_TOKEN}`,
        },
      });
      const result = await response.json();
      setOrderInformation(result);
      return result;
    },
    [setOrderInformation]
  );

  return { fetchOrderList, fetchOrderOneItem };
};

export default useOrders;
