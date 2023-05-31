import { selector } from 'recoil';
import { serverOriginState } from '../atoms';
import {
  CART_BASE_URL,
  POINT_BASE_URL,
  PRODUCTS_BASE_URL,
} from '../../constants/api';
import { fetchCartItems } from '../../remotes/cart';
import { fetchProducts } from '../../remotes/product';
import { fetchPoint } from '../../remotes/point';
import type { Product } from '../../types/product';
import type { CartItem } from '../../types/cart';

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

export const pointQuery = selector<number>({
  key: 'point',
  get: async ({ get }) => {
    const point = await fetchPoint(
      `${get(serverOriginState)}${POINT_BASE_URL}`,
    );

    return point;
  },
});
