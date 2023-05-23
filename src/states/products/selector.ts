import { selectorFamily } from 'recoil';

import { ServerKey } from '../../constants/server';
import { Product } from '../../types/product';
import productApis from '../../apis/products';

export const productState = selectorFamily({
  key: 'productState',
  get: (serverName: ServerKey) => async () => {
    const data = await productApis(serverName, '/products').getData<
      Product[]
    >();
    return data;
  },
});
