import { atom } from 'recoil';
import { Order } from '../types/responseData';
import { fetchedOrderListSelector } from './asyncSelector';

export const orderAtom = atom<Order[]>({
  key: 'order/order-list',
  default: fetchedOrderListSelector,
});
