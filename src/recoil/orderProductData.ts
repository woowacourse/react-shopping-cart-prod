import type { Order } from '../types/product';
import { atom, selector, selectorFamily } from 'recoil';

import { api } from '../apis/orderProducts';
import { hostNameAtom } from './hostData';

export const orderAtom = atom<Order[]>({
  key: 'orderState',
  default: selector({
    key: 'orderState/Default',
    get: async ({ get }) => {
      const hostName = get(hostNameAtom);
      const response = api(hostName).then((apiInstance) => {
        return apiInstance.getOrders();
      });
      return response;
    },
  }),
});

export const orderwithIdState = selectorFamily({
  key: 'orderwithIdState',
  get:
    (orderId) =>
    ({ get }) => {
      const hostName = get(hostNameAtom);
      const response = api(hostName).then((apiInstance) => {
        return apiInstance.getOrderDetail(Number(orderId));
      });
      return response;
    },
});
