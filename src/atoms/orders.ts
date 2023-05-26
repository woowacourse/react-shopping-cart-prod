import { selector } from 'recoil';
import { fetchOrders } from '../apis/order';

export const ordersSelector = selector({
  key: 'ordersSelector',
  get: async () => {
    const { data } = await fetchOrders();

    return data;
  },
});
