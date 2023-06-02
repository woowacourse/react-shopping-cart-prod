import { selector } from 'recoil';
import { fetchOrders } from '../apis/order';

export const orderSelector = selector({
  key: 'orderSelector',
  get: () => fetchOrders(),
});
