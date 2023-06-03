import { selector, selectorFamily, useRecoilValue } from 'recoil';
import { fetchAPI } from '@api/fetchAPI';

import type { OrderDetail, OrderInfo } from '../types';

export const orderListSelector = selector<OrderInfo[]>({
  key: 'ordersSelector',
  get: async () => {
    const orderList = await fetchAPI('/orders', {
      headers: {
        Authorization: `Basic ${btoa(process.env.REACT_APP_API_CREDENTIAL!)}`,
      },
    });

    return orderList;
  },
});

export const orderDetailSelector = selectorFamily<OrderDetail, number>({
  key: 'orderDetailSelector',
  get: (orderId) => async () => {
    const orders = await fetchAPI(`/orders/${orderId}`, {
      headers: {
        Authorization: `Basic ${btoa(process.env.REACT_APP_API_CREDENTIAL!)}`,
      },
    });

    return orders;
  },
});

export const orderSelector = selectorFamily({
  key: 'orderSelector',
  get: (body: any) => async () => {
    const { orderId } = await fetchAPI('/orders', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${btoa(process.env.REACT_APP_API_CREDENTIAL!)}`,
        'Content-Type': 'application/json',
      },
      body,
    });

    return orderId;
  },
});

export const ordersRepository = selector({
  key: 'ordersRepository',
  get: ({ getCallback }) => {
    const fetchOrder = getCallback(() => async (body: any) => {
      const response = await fetchAPI('/orders', {
        method: 'POST',
        headers: {
          Authorization: `Basic ${btoa(process.env.REACT_APP_API_CREDENTIAL!)}`,
          'Content-Type': 'application/json',
        },
        body,
      });

      return response;
    });

    return { fetchOrder };
  },
});

export const useFetchOrderList = () => useRecoilValue(orderListSelector);

export const useFetchOrderDetail = (orderId: number) =>
  useRecoilValue(orderDetailSelector(orderId));

export const useFetchOrder = (body: any) => useRecoilValue(orderSelector(body));

export const useOrdersRepository = () => useRecoilValue(ordersRepository);
