import type { ProductType } from '../types/product';

import { selector } from 'recoil';

import { getProducts } from '../apis/products';
import { hostNameAtom } from './hostData';

export const getProductsSelector = selector<ProductType[]>({
  key: 'getProducts',
  get: async ({ get }) => {
    const hostName = get(hostNameAtom);

    try {
      const response = await getProducts(hostName);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
});
