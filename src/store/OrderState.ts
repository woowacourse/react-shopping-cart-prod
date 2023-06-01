import { atom, selector } from 'recoil';
import { OrderItem } from '../types';

export const orderState = atom<OrderItem[]>({
  key: 'orderState',
  default: [],
});

export const currentOrderSelector = selector<OrderItem>({
  key: 'currentOrderSelector',
  get: ({ get }) => {
    const orderItems = get(orderState);

    return orderItems[orderItems.length - 1];
  },
});
