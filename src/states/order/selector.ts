import { selector, selectorFamily } from 'recoil';

import orderApis from '../../apis/order';
import type { Order } from '../../types/order';

export const orderSelector = selector<Order[]>({
  key: 'orderSelector',
  get: () => orderApis().getOrders(),
});

export const orderDetailSelector = selectorFamily({
  key: 'orderDetailSelector',
  get: (orderId: number) => () => orderApis().getOrderDetail(orderId),
});
