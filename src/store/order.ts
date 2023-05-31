import { atom, selectorFamily } from 'recoil';

import { OrderItemListType } from '../types';

export const orderListState = atom<OrderItemListType[]>({
  key: 'orderItemList',
  default: [],
});

export const orderListSelectorState = selectorFamily({
  key: 'orderItemListSelected',
  get:
    (orderId) =>
    ({ get }) => {
      const orderList = get(orderListState);
      return orderList.find((orderListItem) => orderListItem.id === orderId);
    },
});
