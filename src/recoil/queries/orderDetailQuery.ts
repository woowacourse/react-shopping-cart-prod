import { selectorFamily } from 'recoil';
import type { Client } from '../../api';
import type { OrderEntity } from '../../api/rest/ShoppingCartRestAPI';
import type { Order } from '../../types/Order';

type OrderDetailQueryParams = {
  client: Client;
  orderId: Order['id'];
};

const orderDetailQuery = selectorFamily<OrderEntity, OrderDetailQueryParams>({
  key: 'orderDetailQuery',
  get:
    ({ client, orderId }) =>
    () => {
      return client
        .get(client.path('/orders/:orderId', orderId))
        .acceptOrThrow(200)
        .then((response) => response.data);
    },
});

export default orderDetailQuery;
