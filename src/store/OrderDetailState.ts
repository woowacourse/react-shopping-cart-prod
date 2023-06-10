import { atom } from 'recoil';
import { OrderItemDetails } from '../types';

export const orderDetailState = atom<OrderItemDetails | undefined>({
  key: 'orderDetailState',
  default: undefined,
});
