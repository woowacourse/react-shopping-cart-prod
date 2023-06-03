import { selector, useRecoilValue } from 'recoil';
import { fetchData } from '@api/fetchData';

import type { Product } from '../types';

export const productsSelector = selector<Product[]>({
  key: 'productsRepository',
  get: async () => {
    const products = await fetchData('/products');
    return products;
  },
});

export const useFetchProducts = () => useRecoilValue(productsSelector);
