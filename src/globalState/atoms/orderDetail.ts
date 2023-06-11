import { atom } from 'recoil';
import type { OrderInfo } from '../../types/order';

const orderDetailState = atom<OrderInfo>({
  key: 'orderDetailState',
});

export default orderDetailState;
