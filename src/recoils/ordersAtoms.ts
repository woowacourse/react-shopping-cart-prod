import { selector, useRecoilValue } from 'recoil';
import { fetchAPI } from '@api/fetchAPI';

import type { OrderInfo } from '../types';

export const ordersSelector = selector<OrderInfo[]>({
  key: 'ordersSelector',
  get: async () => {
    const orders = await fetchAPI('/orders', {
      headers: {
        Authorization: `Basic ${btoa(process.env.REACT_APP_API_CREDENTIAL!)}`,
      },
    });

    return orders;
  },
});

export const useFetchOrders = () => useRecoilValue(ordersSelector);
