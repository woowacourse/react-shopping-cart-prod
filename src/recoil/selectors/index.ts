import { selector } from 'recoil';
import { serverOriginState } from '../atoms';
import { CART_BASE_URL, PRODUCTS_BASE_URL } from '../../constants';
import type { CartItem, Product } from '../../types/product';

export const productListQuery = selector<Product[]>({
  key: 'productList',
  get: async ({ get }) => {
    const response = await fetch(
      `${get(serverOriginState)}${PRODUCTS_BASE_URL}`,
    );

    if (!response.ok) {
      throw new Error('상품 목록을 불러올 수 없습니다.');
    }

    const products = await response.json();

    return products;
  },
});

export const cartItemsQuery = selector<CartItem[]>({
  key: 'cartItems',
  get: async () => {
    const response = await fetch(CART_BASE_URL);

    if (!response.ok) {
      throw new Error('장바구니 목록을 불러올 수 없습니다.');
    }

    const cartItems = await response.json();

    return cartItems;
  },
});
