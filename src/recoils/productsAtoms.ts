import { selector, useRecoilValue } from 'recoil';
import { fetchAPI } from '@api/fetchAPI';

import type { Product } from '../types';

export const productsSelector = selector<Product[]>({
  key: 'productsRepository',
  get: async () => {
    const products = await fetchAPI('/products');

    return products;
  },
});

export const useFetchProducts = () => useRecoilValue(productsSelector);
