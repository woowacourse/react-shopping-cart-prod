import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import fetchApis from '../apis/fetchApis';
import { serverNameState } from '../states/serverName';
import { toastState } from '../states/toast/atom';
import { Order } from '../types/order';
import { TOAST_STATE } from '../constants/toast';

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const serverName = useRecoilValue(serverNameState);
  const setToastState = useSetRecoilState(toastState);

  useEffect(() => {
    const { getData } = fetchApis(serverName);

    const getOrders = async () => {
      try {
        const data = await getData<Order[]>('/orders');
        setOrders(data);
      } catch {
        setToastState(TOAST_STATE.failedGetOrder);
      }
    };

    getOrders();
  }, [serverName, setToastState]);

  return orders;
};
