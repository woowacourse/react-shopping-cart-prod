import { selectorFamily } from 'recoil';

import { ServerKey } from '../../constants/server';
import { Product } from '../../types/product';
import fetchApis from '../../apis/fetchApis';

export const productState = selectorFamily({
  key: 'productState',
  get: (serverName: ServerKey) => async () => {
    const { getData } = fetchApis(serverName);

    return await getData<Product[]>('/products');
  },
});
