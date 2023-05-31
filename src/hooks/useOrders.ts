import { useCallback } from 'react';
import { useRecoilState } from 'recoil';

import { USER_TOKEN } from '../constants';
import { orderListState } from '../store/order';

const useOrders = () => {
  const [, setOrderList] = useRecoilState(orderListState);
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

  return { fetchOrderList };
};

export default useOrders;
