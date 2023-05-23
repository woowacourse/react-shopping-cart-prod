import { selector } from 'recoil';
import { fetchProductData } from '../apis/products';

export const products = selector({
  key: 'products',
  get: async () => {
    const { body } = await fetchProductData();

    return body;
  },
});
