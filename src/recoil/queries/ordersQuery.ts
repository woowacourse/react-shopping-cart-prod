import { selectorFamily } from 'recoil';
import type { Client } from '../../api';

type OrdersQueryParams = {
  client: Client;
};

const ordersQuery = selectorFamily({
  key: 'ordersQuery',
  get:
    ({ client }: OrdersQueryParams) =>
    () =>
      client.get('/orders'),
});

export default ordersQuery;
