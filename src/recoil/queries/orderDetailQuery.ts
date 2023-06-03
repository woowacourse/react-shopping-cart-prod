import { selectorFamily } from 'recoil';
import type { Client } from '../../api';
import type { Order } from '../../types/Order';

type OrderDetailQueryParams = {
  client: Client;
  orderId: Order['id'];
};

const orderDetailQuery = selectorFamily({
  key: 'orderDetailQuery',
  get:
    ({ client, orderId }: OrderDetailQueryParams) =>
    () =>
      client.get(client.path('/orders/:orderId', orderId)),
});

export default orderDetailQuery;
