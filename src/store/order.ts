import { selector, selectorFamily } from 'recoil';

import { getOrderAPI } from '../api/orderAPI';
import type { OrderData } from '../types/order';
import { currentServerState } from './server';

const orderListState = selector<OrderData[]>({
  key: 'orderList',
  get: ({ get }) => {
    const currentServer = get(currentServerState);
    const orderAPI = getOrderAPI(currentServer);

    return orderAPI.getOrderList();
  },
});

const orderState = selectorFamily<OrderData | null, number>({
  key: 'orderItem',
  get:
    (orderId) =>
    ({ get }) => {
      const orderList = get(orderListState);
      const orderItem = orderList.find((orderItem) => orderItem.id === orderId);

      return orderItem ?? null;
    },
});

export { orderListState, orderState };
