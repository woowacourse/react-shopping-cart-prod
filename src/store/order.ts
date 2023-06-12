import { atom, selector, selectorFamily } from 'recoil';

import { OrderData, OrderedItemData } from '../types';
import { getOrderAPI } from './../api/orderAPI';
import { currentServerState } from './server';

export const orderListState = atom({
  key: 'orderListState',
  default: selector<OrderData[]>({
    key: 'orderListState/default',
    get: async ({ get }) => {
      // 사용자별 주문 전체 목록 get
      const currentServer = get(currentServerState);
      const orderAPI = getOrderAPI(currentServer);
      const orderList = await orderAPI.getOrderList();

      return orderList;
    },
  }),
});

export const detailOrderState = selectorFamily({
  key: 'detailOrderState',
  get:
    (orderId: OrderedItemData['id']) =>
    ({ get }): OrderData => {
      const orderList = get(orderListState);

      return orderList.find((orderData) => orderData.id === orderId)!;
    },
});
