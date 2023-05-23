import { atomFamily, selectorFamily } from 'recoil';

import cartProductApis from '../../apis/cartProducts';
import { ServerKey } from '../../constants/server';

export const cartProductState = atomFamily({
  key: 'cartProductState',
  default: selectorFamily({
    key: 'cartProductState/default',
    get: (name: ServerKey) => async () => {
      const { getData } = cartProductApis(name, '/cart-items');
      const data = await getData();
      return data;
    },
  }),
});
