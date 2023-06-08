import type { OrderType } from '../types/product';
import { atom, selector, selectorFamily } from 'recoil';

import { api } from '../apis/order';
import { hostNameAtom } from './hostData';

export const orderAtom = atom<OrderType[]>({
  key: 'orderState',
  default: selector({
    key: 'orderState/Default',
    get: async ({ get }) => {
      const hostName = get(hostNameAtom);
      const response = await (await api(hostName)).getOrders();

      return response;
    },
  }),
});

export const orderwithIdState = selectorFamily({
  key: 'orderwithIdState',
  get:
    (orderId) =>
    async ({ get }) => {
      const isOrderExist = get(orderAtom).find(
        (order) => order.orderId === Number(orderId)
      );

      if (isOrderExist) {
        const hostName = get(hostNameAtom);

        const response = await (
          await api(hostName)
        ).getOrderDetail(Number(orderId));

        return response;
      }
    },
});
