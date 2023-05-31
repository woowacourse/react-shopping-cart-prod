import { selectorFamily } from 'recoil';
import type { Client } from '../../api';
import type { ProductEntity } from '../../api/rest/ShoppingCartRestAPI';

type ProductsQueryParams = {
  client: Client;
};

const productsQuery = selectorFamily<ProductEntity[], ProductsQueryParams>({
  key: 'productsQuery',
  get:
    ({ client }) =>
    () => {
      return client
        .get('/products')
        .acceptOrThrow(200)
        .then((response) => response.data);
    },
});

export default productsQuery;
