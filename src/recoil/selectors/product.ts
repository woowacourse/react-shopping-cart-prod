import { selector } from 'recoil';
import { PRODUCTS_BASE_URL } from '../../constants/api';
import { fetchProducts } from '../../remotes/product';
import { serverOriginState } from '../atoms/common';
import type { Product } from '../../types/product';

export const productsQuery = selector<Product[]>({
  key: 'products',
  get: async ({ get }) => {
    const products = await fetchProducts(
      `${get(serverOriginState)}${PRODUCTS_BASE_URL}`,
    );

    return products;
  },
});
