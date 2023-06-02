import { selector, selectorFamily } from 'recoil';

import orderApis from '../../apis/order';
import type { Order } from '../../types/order';
import { serverNameState } from '../serverName';

export const orderSelector = selector<Order[]>({
  key: 'orderSelector',
  get: ({ get }) => orderApis(get(serverNameState)).getOrders(),
});

export const orderDetailSelector = selectorFamily({
  key: 'orderDetailSelector',
  get:
    (orderId: number) =>
    ({ get }) =>
      orderApis(get(serverNameState)).getOrderDetail(orderId),
});
