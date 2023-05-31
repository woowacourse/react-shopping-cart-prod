import { selector } from 'recoil';
import { getProducts } from '../apis/products';
import type { Product } from '../types/product';
import { hostNameAtom } from './hostData';

export const getProductsSelector = selector<Product[]>({
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
