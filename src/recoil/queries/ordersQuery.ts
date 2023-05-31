import { selectorFamily } from 'recoil';
import type { Client } from '../../api';
import type { OrderEntity } from '../../api/rest/ShoppingCartRestAPI';

type OrdersQueryParams = {
  client: Client;
};

const ordersQuery = selectorFamily<OrderEntity[], OrdersQueryParams>({
  key: 'ordersQuery',
  get:
    ({ client }) =>
    () => {
      return client
        .get('/orders')
        .acceptOrThrow(200)
        .then((response) => response.data);
    },
});

export default ordersQuery;
