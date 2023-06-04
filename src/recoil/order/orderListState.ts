import { atom } from 'recoil';
import { OrderType } from '@type/orderType';
import { getOrderListSelector } from './selector/getOrderListSelector';

export const orderListState = atom<OrderType[]>({
  key: 'orderListStateKey',
  default: getOrderListSelector,
});
