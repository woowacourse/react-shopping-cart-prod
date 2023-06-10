import { atom, selectorFamily } from 'recoil';

import { OrderItemInformation, OrderItemListType } from '../types';

export const orderListState = atom<OrderItemListType[]>({
  key: 'orderItemList',
  default: [],
});

export const OrderItemInformationState = atom<OrderItemInformation>({
  key: 'orderItemInformation',
  default: {
    orderId: 0,
    products: [],
    totalProductAmount: 0,
    deliveryAmount: 0,
    discountedProductAmount: 0,
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
