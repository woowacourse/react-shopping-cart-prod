import { selector } from 'recoil';

import { getProductAPI } from '../api/productAPI';
import type { ProductItemData } from '../types/product';
import { currentServerState } from './server';

const productListState = selector<ProductItemData[]>({
  key: 'productList',
  get: ({ get }) => {
    const currentServer = get(currentServerState);
    const productAPI = getProductAPI(currentServer);

    return productAPI.getProductList();
  },
});

export { productListState };
