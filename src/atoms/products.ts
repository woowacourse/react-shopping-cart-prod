import { selector } from 'recoil';
import { fetchProductData } from '../apis/products';

export const productsSelector = selector({
  key: 'productsSelector',
  get: async () => {
    const { data } = await fetchProductData();

    return data;
  },
});
