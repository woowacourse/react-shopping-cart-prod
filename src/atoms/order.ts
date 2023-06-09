import { selector, selectorFamily } from 'recoil';
import { fetchOrder, fetchOrders } from '../apis/order';
import { Order } from '../types/order';

export const ordersSelector = selector({
  key: 'orderSelector',
  get: () => fetchOrders(),
});

export const orderSelector = selectorFamily({
  key: 'orderSelector',
  get: (id: Order['orderId']) => () => fetchOrder({ id }),
});
