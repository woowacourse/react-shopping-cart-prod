import { selectorFamily } from 'recoil';
import type { Client } from '../../api';

type CartPointsQueryParams = {
  client: Client;
};

const cartPointsQuery = selectorFamily({
  key: 'cartPointsQuery',
  get:
    ({ client }: CartPointsQueryParams) =>
    () =>
      client.get('/cart-points'),
});

export default cartPointsQuery;
