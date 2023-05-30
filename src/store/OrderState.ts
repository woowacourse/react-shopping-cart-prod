import { atom } from 'recoil';
import { OrderItem } from '../types';

export const orderState = atom<OrderItem[]>({
  key: 'orderState',
  default: [],
});
