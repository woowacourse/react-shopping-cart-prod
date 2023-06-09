import { selector, selectorFamily } from 'recoil';
import { fetchDetailOrder, fetchOrders } from '../apis/order';

export const ordersSelector = selector({
  key: 'ordersSelector',
  get: async () => {
    const { data } = await fetchOrders();

    return data;
  },
});

export const detailOrderSelector = selectorFamily({
  key: 'detailOrderSelector',
  get: (detailId: number) => async () => {
    const { data } = await fetchDetailOrder(detailId);
    return data;
  },
});
