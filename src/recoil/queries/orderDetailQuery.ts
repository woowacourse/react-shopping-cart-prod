import { selectorFamily } from 'recoil';
import type { OrderEntity } from '../../api/rest/ShoppingCartRestAPI';
import clientState from '../atoms/clientState';

const orderDetailQuery = selectorFamily<OrderEntity, OrderEntity['id']>({
  key: 'orderDetailQuery',
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

export default orderDetailQuery;
