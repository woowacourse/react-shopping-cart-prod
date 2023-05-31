import serverUrlState from '@recoil/server/serverUrlState';

import {
  atom,
  atomFamily,
  selector,
  useRecoilRefresher_UNSTABLE,
  useRecoilValue,
  useResetRecoilState,
} from 'recoil';
import { ProductItemType } from 'types/ProductType';

import fetchProductList from '../remote/fetchProductList';
import credentialState from '@recoil/server/credentialState';

export const productRefresher = atom({
  key: 'productRefresher',
  default: 0,
});

const productListQuery = selector({
  key: 'productListQuery/default',
  get: async ({ get }) => {
    const serverUrl = get(serverUrlState);
    get(credentialState);
    const response = await fetchProductList(serverUrl);
    const productList: ProductItemType[] = await response.json();

    return productList;
  },

  cachePolicy_UNSTABLE: {
    eviction: 'most-recent',
  },
});

export const productListState = atom<ProductItemType[]>({
  key: 'productListState',
  default: productListQuery,
});

export const useProductList = () => useRecoilValue(productListState);

export const useRefreshProduct = () => useRecoilRefresher_UNSTABLE(productListState);
