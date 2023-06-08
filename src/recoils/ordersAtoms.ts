import { selector, selectorFamily, useRecoilValue } from 'recoil';
import { fetchAPI } from '@api/fetchAPI';

import { baseApiUrlSelector } from './baseApiUrlAtoms';

import { FETCH_METHOD, FETCH_URL, RECOIL_KEY } from '@constants/index';
import type { OrderDetail, OrderInfo, OrdersRequestBody } from '../types';

export const orderListSelector = selector<OrderInfo[]>({
  key: RECOIL_KEY.ORDER_LIST_SELECTOR,
  get: async ({ get }) => {
    const baseApiUrl = get(baseApiUrlSelector);
    const orderList = await fetchAPI(baseApiUrl + FETCH_URL.ORDERS, {
      headers: {
        Authorization: `Basic ${btoa(process.env.REACT_APP_API_CREDENTIAL!)}`,
      },
    });

    return orderList;
  },
});

export const orderDetailSelector = selectorFamily<OrderDetail, number>({
  key: RECOIL_KEY.ORDER_DETAIL_SELECTOR,
  get:
    (orderId) =>
    async ({ get }) => {
      const baseApiUrl = get(baseApiUrlSelector);
      const orders = await fetchAPI(`${baseApiUrl + FETCH_URL.ORDERS}/${orderId}`, {
        headers: {
          Authorization: `Basic ${btoa(process.env.REACT_APP_API_CREDENTIAL!)}`,
        },
      });

      return orders;
    },
});

export const orderSelector = selectorFamily({
  key: RECOIL_KEY.ORDER_SELECTOR,
  get:
    (body: any) =>
    async ({ get }) => {
      const baseApiUrl = get(baseApiUrlSelector);
      const { orderId } = await fetchAPI(baseApiUrl + FETCH_URL.ORDERS, {
        method: FETCH_METHOD.POST,
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
  key: RECOIL_KEY.ORDERS_REPOSITORY,
  get: ({ getCallback }) => {
    const fetchOrder = getCallback(({ snapshot }) => async (body: OrdersRequestBody) => {
      const baseApiUrl = await snapshot.getPromise(baseApiUrlSelector);
      const response = await fetchAPI(baseApiUrl + FETCH_URL.ORDERS, {
        method: FETCH_METHOD.POST,
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

export const useFetchOrder = (body: OrdersRequestBody) => useRecoilValue(orderSelector(body));

export const useOrdersRepository = () => useRecoilValue(ordersRepository);
