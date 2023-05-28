import { selector } from 'recoil';
import { fetchProducts } from '../apis/products';
import type { Product } from '../types/product';
import { hostNameAtom } from './hostData';

export const fetchProductsSelector = selector<Product[]>({
  key: 'fetchProducts',
  get: async ({ get }) => {
    const hostName = get(hostNameAtom);

    try {
      const response = await fetchProducts(hostName);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
});
