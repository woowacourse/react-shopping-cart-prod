import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { serverNameState } from '../states/serverName';
import { toastState } from '../states/toast/atom';
import { OrderDetail } from '../types/order';
import fetchApis from '../apis/fetchApis';
import { TOAST_STATE } from '../constants/toast';
import { selectedOrderIdState } from '../states/order';

export const useOrderDetail = () => {
  const [orderDetail, setOrderDetail] = useState<OrderDetail>();
  const selectedOrderId = useRecoilValue(selectedOrderIdState);
  const serverName = useRecoilValue(serverNameState);
  const { getData } = fetchApis(serverName);
  const setToastState = useSetRecoilState(toastState);

  const getOrders = async () => {
    try {
      const data = await getData<OrderDetail>(`/orders/${selectedOrderId}`);
      setOrderDetail(data);
    } catch {
      setToastState(TOAST_STATE.failedGetOrder);
    }
  };

  useEffect(() => {
    getOrders();
  }, [serverName]);

  return orderDetail;
};
