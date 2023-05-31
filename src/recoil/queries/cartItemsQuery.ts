import { selectorFamily } from 'recoil';
import type { Client } from '../../api';
import type { CartItemEntity } from '../../api/rest/ShoppingCartRestAPI';

type CartItemQueryParams = {
  client: Client;
};

const cartItemsQuery = selectorFamily<CartItemEntity[], CartItemQueryParams>({
  key: 'cartItemsQuery',
  get:
    ({ client }) =>
    () => {
      return client
        .get('/cart-items')
        .acceptOrThrow(200)
        .then((response) => response.data);
    },
});

export default cartItemsQuery;
