import { selector } from 'recoil';

import productApis from '../../apis/products';
import { serverNameState } from '../serverName';

export const productState = selector({
  key: 'productState',
  get: ({ get }) => {
    const serverName = get(serverNameState);
    return productApis(serverName).getProducts();
  },
});
