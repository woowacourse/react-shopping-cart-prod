import { selector, selectorFamily, useRecoilValue } from 'recoil';
import { fetchAPI } from '@api/fetchAPI';

import type { OrderDetail, OrderInfo } from '../types';
import { baseApiUrlSelector } from './baseApiUrlAtoms';

export const orderListSelector = selector<OrderInfo[]>({
  key: 'ordersSelector',
  get: async ({ get }) => {
    const baseApiUrl = get(baseApiUrlSelector);
    const orderList = await fetchAPI(`${baseApiUrl}/orders`, {
      headers: {
        Authorization: `Basic ${btoa(process.env.REACT_APP_API_CREDENTIAL!)}`,
      },
    });

    return orderList;
  },
});

export const orderDetailSelector = selectorFamily<OrderDetail, number>({
  key: 'orderDetailSelector',
  get:
    (orderId) =>
    async ({ get }) => {
      const baseApiUrl = get(baseApiUrlSelector);
      const orders = await fetchAPI(`${baseApiUrl}/orders/${orderId}`, {
        headers: {
          Authorization: `Basic ${btoa(process.env.REACT_APP_API_CREDENTIAL!)}`,
        },
      });

      return orders;
    },
});

export const orderSelector = selectorFamily({
  key: 'orderSelector',
  get:
    (body: any) =>
    async ({ get }) => {
      const baseApiUrl = get(baseApiUrlSelector);
      const { orderId } = await fetchAPI(`${baseApiUrl}/orders`, {
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
    const fetchOrder = getCallback(({ snapshot }) => async (body: any) => {
      const baseApiUrl = await snapshot.getPromise(baseApiUrlSelector);
      const response = await fetchAPI(`${baseApiUrl}/orders`, {
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
