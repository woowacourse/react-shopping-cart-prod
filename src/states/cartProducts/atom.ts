import { atomFamily, selectorFamily } from 'recoil';

import cartProductApis from '../../apis/cartProducts';
import { ServerKey } from '../../constants/server';

export const cartProductState = atomFamily({
  key: 'cartProductState',
  default: selectorFamily({
    key: 'cartProductState/default',
    get: (serverName: ServerKey) => async () => {
      try {
        const { getData } = cartProductApis(serverName, '/cart-items');
        const data = await getData();
        return data;
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
        return [];
      }
    },
  }),
});
