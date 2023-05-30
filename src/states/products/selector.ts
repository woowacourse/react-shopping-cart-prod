import { selectorFamily } from 'recoil';

import productApis from '../../apis/products';
import { ServerKey } from '../../constants/server';

export const productState = selectorFamily({
  key: 'productState',
  get: (serverName: ServerKey) => async () => {
    const data = await productApis(serverName).getProducts();
    return data;
  },
});
