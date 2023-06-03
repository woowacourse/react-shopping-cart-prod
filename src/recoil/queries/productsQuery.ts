import { selectorFamily } from 'recoil';
import type { Client } from '../../api';

type ProductsQueryParams = {
  client: Client;
};

const productsQuery = selectorFamily({
  key: 'productsQuery',
  get:
    ({ client }: ProductsQueryParams) =>
    () =>
      client.get('/products'),
});

export default productsQuery;
