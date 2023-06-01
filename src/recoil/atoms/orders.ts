import { atom } from 'recoil';
import type { Order } from '../../types/order';

export const ordersState = atom<Order[]>({
  key: 'ordersState',
  default: [],
});
