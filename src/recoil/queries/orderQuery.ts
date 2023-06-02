import { selector, selectorFamily } from 'recoil';
import clientState from '../atoms/clientState';

const orderListQuery = selector({
  key: 'orderListQuery',
  get: ({ get }) => {
    const client = get(clientState);
    return client
      .get('/orders')
      .acceptOrThrow(200)
      .then((response) => response.data);
  },
});

const orderDetailQuery = selectorFamily({
  key: 'orderDetailQuery',
  get:
    (id) =>
    ({ get }) => {
      const client = get(clientState);
      const path = client.path('/orders/:orderId', id);
      return client
        .get(path)
        .acceptOrThrow(200)
        .then((response) => response.data);
    },
});

export { orderListQuery, orderDetailQuery };
