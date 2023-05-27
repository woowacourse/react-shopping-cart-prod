import serverUrlState from '@recoil/server/serverUrlState';

import { atom, selector, useRecoilValue } from 'recoil';
import { ProductItemType } from 'types/ProductType';

import fetchProductList from '../remote/fetchProductList';

export const productListState = atom<ProductItemType[]>({
  key: 'productListState',
  default: selector({
    key: 'productListState/selector',
    get: async ({ get }) => {
      const response = await fetchProductList(get(serverUrlState));
      const productList: ProductItemType[] = await response.json();

      return productList;
    },
  }),
});

export const useProductListReadOnly = () => useRecoilValue(productListState);
