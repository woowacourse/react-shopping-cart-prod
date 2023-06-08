import { selector, useRecoilValue } from 'recoil';
import { fetchAPI } from '@api/fetchAPI';

import { baseApiUrlSelector } from './baseApiUrlAtoms';

import { FETCH_URL, RECOIL_KEY } from '@constants/index';
import type { Product } from 'src/types';

export const productsSelector = selector<Product[]>({
  key: RECOIL_KEY.PRODUCTS_SELECTOR,
  get: async ({ get }) => {
    const baseApiUrl = get(baseApiUrlSelector);
    const products = await fetchAPI(baseApiUrl + FETCH_URL.PRODUCTS);

    return products;
  },
});

export const useFetchProducts = () => useRecoilValue(productsSelector);
