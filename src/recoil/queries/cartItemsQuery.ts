import { selector } from 'recoil';
import type { CartItemEntity } from '../../api/rest/ShoppingCartRestAPI';
import clientState from '../atoms/clientState';

const cartItemsQuery = selector<CartItemEntity[]>({
  key: 'cartItemsQuery',
  get: ({ get }) => {
    const client = get(clientState);
    return client
      .get('/cart-items')
      .acceptOrThrow(200)
      .then((response) => response.data);
  },
});

export default cartItemsQuery;
