import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useLocation } from 'react-router-dom';

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
  const setToastState = useSetRecoilState(toastState);
  const pathname = useLocation().pathname;

  useEffect(() => {
    const { getData } = fetchApis(serverName);

    const findSelectedOrderId = () => {
      return pathname.split('/').pop();
    };

    const getOrders = async () => {
      try {
        const data = await getData<OrderDetail>(
          `/orders/${selectedOrderId ?? findSelectedOrderId()}`
        );
        setOrderDetail(data);
      } catch {
        setToastState(TOAST_STATE.failedGetOrder);
      }
    };

    getOrders();
  }, [serverName, pathname, selectedOrderId, setToastState]);

  return orderDetail;
};
