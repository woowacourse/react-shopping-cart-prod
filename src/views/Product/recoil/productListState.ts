import serverUrlState from '@recoil/server/serverUrlState';

import { atomFamily, useRecoilValue } from 'recoil';
import { ProductItemType } from 'types/ProductType';

import fetchProductList from '../remote/fetchProductList';

export const productListState = atomFamily<ProductItemType[], string>({
  key: 'productListState',
  default: async (serverUrl) => {
    const response = await fetchProductList(serverUrl);
    const productList: ProductItemType[] = await response.json();

    return productList;
  },
});

export const useProductListBy = (serverUrl: string) => useRecoilValue(productListState(serverUrl));
