import { selectorFamily } from 'recoil';
import type { Client } from '../../api';
import remoteCartItemsState from '../atoms/remoteCartItemsState';

type CartPointsQueryParams = {
  client: Client;
};

const cartPointsQuery = selectorFamily({
  key: 'cartPointsQuery',
  get:
    ({ client }: CartPointsQueryParams) =>
    ({ get }) => {
      const { isSynchronizing } = get(remoteCartItemsState(client));

      return client.get('/cart-points');
    },
});

export default cartPointsQuery;
