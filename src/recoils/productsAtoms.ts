import { selector, useRecoilValue } from 'recoil';
import { fetchAPI } from '@api/fetchAPI';

import type { Product } from '../types';
import { baseApiUrlSelector } from './baseApiUrlAtoms';

export const productsSelector = selector<Product[]>({
  key: 'productsRepository',
  get: async ({ get }) => {
    const baseApiUrl = get(baseApiUrlSelector);
    const products = await fetchAPI(`${baseApiUrl}/products`);

    return products;
  },
});

export const useFetchProducts = () => useRecoilValue(productsSelector);
