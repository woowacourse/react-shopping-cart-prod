import { atom, selectorFamily } from 'recoil';

import { OrderItemInformation, OrderItemListType } from '../types';

export const orderListState = atom<OrderItemListType[]>({
  key: 'orderItemList',
  default: [],
});

export const OrderItemInformationState = atom<OrderItemInformation>({
  key: 'orderItemInformation',
  default: {
    id: 0,
    products: [],
    total_amount: 0,
    delivery_amount: 0,
    discounted_amount: 0,
    address: '',
  },
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
