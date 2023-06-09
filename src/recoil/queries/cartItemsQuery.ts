import { selectorFamily } from 'recoil';
import type { Client } from '../../api';

type CartItemQueryParams = {
  client: Client;
};

const cartItemsQuery = selectorFamily({
  key: 'cartItemsQuery',
  get:
    ({ client }: CartItemQueryParams) =>
    () =>
      client.get('/cart-items'),
});

export default cartItemsQuery;
