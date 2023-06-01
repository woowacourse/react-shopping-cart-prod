import { selectorFamily } from 'recoil';
import type { Order } from '../../types/Order';
import clientState from '../atoms/clientState';

const userOrderDetailState = selectorFamily<Order, Order['id']>({
  key: 'userOrderDetailState',
  get:
    (orderId) =>
    ({ get }) => {
      const client = get(clientState);

      return client
        .get(client.path('/orders/:orderId', orderId))
        .acceptOrThrow(200)
        .then((response) => response.data);
    },
});

export default userOrderDetailState;
