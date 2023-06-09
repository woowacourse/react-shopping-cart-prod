import { selector, selectorFamily } from 'recoil';
import { orderDetailQuery, orderListQuery } from '../queries/orderQuery';

const orderListState = selector({
  key: 'orderListState',
  get: ({ get }) => {
    return get(orderListQuery);
  },
});

const orderDetailState = selectorFamily({
  key: 'orderDetailState',
  get:
    (id) =>
    ({ get }) => {
      return get(orderDetailQuery(id));
    },
});

export { orderListState, orderDetailState };
