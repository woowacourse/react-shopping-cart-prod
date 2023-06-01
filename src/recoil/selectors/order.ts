import { selectorFamily } from 'recoil';
import { fetchOrder } from '../../remotes/order';
import { ORDERS_BASE_URL } from '../../constants/api';
import { serverOriginState } from '../atoms/common';
import type { Order } from '../../types/order';

export const orderQuery = selectorFamily<Order, Order['id']>({
  key: 'order',
  get:
    (orderId: Order['id']) =>
    async ({ get }) => {
      const order = await fetchOrder(
        `${get(serverOriginState)}${ORDERS_BASE_URL}/${orderId}`,
      );

      return order;
    },
});
