import { selector } from 'recoil';
import type RestClientResponse from '../../api/RestClientResponse';
import type { HttpResponse } from '../../api/rest/RestAPI';
import type { CartPointsEntity } from '../../api/rest/ShoppingCartRestAPI';
import type { CartPoints } from '../../types/CartPoints';
import clientState from '../atoms/clientState';
import remoteCartItemsState from '../atoms/remoteCartItemsState';
import cartPointsQuery from '../queries/cartPointsQuery';

let cachedResponse: RestClientResponse<HttpResponse<200, CartPointsEntity>> | null = null;

const userCartPointsState = selector<CartPoints>({
  key: 'userCartPointsState',
  get: ({ get }) => {
    const client = get(clientState);
    const { isSynchronizing } = get(remoteCartItemsState(client));

    if (isSynchronizing && cachedResponse) {
      return cachedResponse.data;
    }
    // eslint-disable-next-line no-multi-assign
    const response = (cachedResponse = get(cartPointsQuery({ client })));
    return response.acceptOrThrow(200).data;
  },
});

export default userCartPointsState;
