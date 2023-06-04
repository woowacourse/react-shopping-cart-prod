import { selector, selectorFamily } from 'recoil';
import { fetchPoint, fetchSavedPointByOrder } from '../../remotes/point';
import { serverOriginState } from '../atoms/common';
import { POINT_BASE_URL } from '../../constants/api';
import { ORDERS_BASE_URL } from '../../constants/api';
import type { Order } from '../../types/order';

export const pointQuery = selector<number>({
  key: 'point',
  get: async ({ get }) => {
    const point = await fetchPoint(
      `${get(serverOriginState)}${POINT_BASE_URL}`,
    );

    return point;
  },
});

export const savedPointByOrderQuery = selectorFamily<number, Order['id']>({
  key: 'savedPointByOrder',
  get:
    (orderId: Order['id']) =>
    async ({ get }) => {
      const savedPointByOrder = await fetchSavedPointByOrder(
        `${get(
          serverOriginState,
        )}${ORDERS_BASE_URL}/${orderId}${POINT_BASE_URL}`,
      );

      return savedPointByOrder;
    },
});
