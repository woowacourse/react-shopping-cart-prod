import {
  useRecoilCallback,
  useRecoilValueLoadable,
  useRecoilValue,
} from 'recoil';
import { ordersState } from '../recoil/atoms';
import { serverOriginState } from '../recoil/atoms';
import { fetchOrders } from '../remotes/order';
import { ORDERS_BASE_URL } from '../constants/api';
import { useEffect } from 'react';

const useOrders = () => {
  const serverOrigin = useRecoilValue(serverOriginState);
  const orders = useRecoilValueLoadable(ordersState);

  useEffect(() => {
    syncOrders();
  }, []);

  const syncOrders = useRecoilCallback(
    ({ set }) =>
      async () => {
        const newOrders = await fetchOrders(
          `${serverOrigin}${ORDERS_BASE_URL}`,
        );

        set(ordersState, newOrders);
      },
    [serverOrigin],
  );

  return { orders, syncOrders };
};

export default useOrders;
