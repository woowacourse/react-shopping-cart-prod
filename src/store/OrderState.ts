import { atom, selector } from 'recoil';
import { OrderItem } from '../types';

export const orderState = atom<OrderItem[]>({
  key: 'orderState',
  default: [],
});

export const currentOrderSelector = selector<OrderItem>({
  key: 'currentOrderSelector',
  get: ({ get }) => {
    const orders = get(orderState);
    console.log('in selector', orders);
    return orders[orders.length - 1];
  },
});
