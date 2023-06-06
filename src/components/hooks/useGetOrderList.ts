import { useState } from 'react';
import { OrderInfo, ServerNameType } from '../../types';
import * as api from '../../api';
import useToast from './useToast';
import { API_ERROR_MESSAGE } from '../../constants';

export const useGetOrderList = () => {
  const [orders, setOrders] = useState<OrderInfo[] | null>(null);
  const { showToast } = useToast();

  const getOrdersThroughApi = (serverName: ServerNameType, loginCredential: string) => {
    api
      .getOrder<OrderInfo[]>(serverName, loginCredential)
      .then(setOrders)
      .catch((e: Error) => {
        if (e.name !== 'Error') {
          showToast('error', API_ERROR_MESSAGE.getOrder);
        }

        return showToast('error', e.message);
      });
  };

  return { orders, getOrdersThroughApi };
};
