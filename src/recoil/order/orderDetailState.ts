import { atomFamily } from 'recoil';
import { OrderType } from '@type/orderType';
import { getOrderDetailSelector } from './selector/getOrderDetailSelector';

export const orderDetailState = atomFamily<OrderType, number>({
  key: 'orderDetailState',
  default: (orderId: number) => getOrderDetailSelector(orderId),
});
