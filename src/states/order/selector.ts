import { selector } from 'recoil';

import orderApis from '../../apis/order';
import type { Order } from '../../types/order';

export const orderSelector = selector<Order[]>({
  key: 'productState',
  get: async () => {
    const data = await orderApis().getOrders();
    return data;
  },
});
