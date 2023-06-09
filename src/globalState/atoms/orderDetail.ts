import { atom } from 'recoil';
import type OrderInfo from '../../types/order';

const orderDetailState = atom<OrderInfo | null>({
  key: 'orderDetailState',
  default: null,
});

export default orderDetailState;
