import { selector } from 'recoil';

import { getProductList } from '../api/productAPI';
import { ProductItemData } from '../types/product';
import { currentServerState } from './server';

const productListState = selector<ProductItemData[]>({
  key: 'productList',
  get: async ({ get }) => {
    const currentServer = get(currentServerState);
    const productList = await getProductList(currentServer);

    return productList;
  },
});

export { productListState };
