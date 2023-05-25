import { selector } from 'recoil';
import { serverOriginState } from '../atoms';
import { CART_BASE_URL, PRODUCTS_BASE_URL } from '../../constants/api';
import { fetchCartItems } from '../../remotes/cart';
import { fetchProducts } from '../../remotes/product';
import type { CartItem, Product } from '../../types/product';

export const productsQuery = selector<Product[]>({
  key: 'products',
  get: async ({ get }) => {
    const products = await fetchProducts(
      `${get(serverOriginState)}${PRODUCTS_BASE_URL}`,
    );

    return products;
  },
});

export const cartItemsQuery = selector<CartItem[]>({
  key: 'cartItems',
  get: async ({ get }) => {
    const cartItems = await fetchCartItems(
      `${get(serverOriginState)}${CART_BASE_URL}`,
    );

    return cartItems;
  },
});
