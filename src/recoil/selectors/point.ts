import { selectorFamily } from 'recoil';
import { fetchSavedPointByOrder } from '../../remotes/point';
import { serverOriginState } from '../atoms/common';
import { POINT_BASE_URL } from '../../constants/api';
import { ORDERS_BASE_URL } from '../../constants/api';
import { base64 } from './auth';
import type { Order } from '../../types/order';

export const savedPointByOrderQuery = selectorFamily<number, Order['id']>({
  key: 'savedPointByOrder',
  get:
    (orderId: Order['id']) =>
    async ({ get }) => {
      const savedPointByOrder = await fetchSavedPointByOrder(
        `${get(
          serverOriginState,
        )}${ORDERS_BASE_URL}/${orderId}${POINT_BASE_URL}`,
        get(base64),
      );

      return savedPointByOrder;
    },
});
