import { selectorFamily } from 'recoil';
import type { Client } from '../../api';
import type { CartPointsEntity } from '../../api/rest/ShoppingCartRestAPI';
import remoteCartItemsState from '../atoms/remoteCartItemsState';

type CartPointsQueryParams = {
  client: Client;
};

let cachedCartPoints: CartPointsEntity | null = null;

const cache = (cartPoints: CartPointsEntity) => {
  // eslint-disable-next-line no-return-assign
  return (cachedCartPoints = cartPoints);
};

const cartPointsQuery = selectorFamily<CartPointsEntity, CartPointsQueryParams>({
  key: 'cartPointsQuery',
  get:
    ({ client }) =>
    ({ get }) => {
      const { isSynchronizing } = get(remoteCartItemsState(client));
      if (isSynchronizing && cachedCartPoints) {
        return cachedCartPoints;
      }

      return client
        .get('/cart-points')
        .acceptOrThrow(200)
        .then((response) => response.data)
        .then(cache);
    },
});

export default cartPointsQuery;
