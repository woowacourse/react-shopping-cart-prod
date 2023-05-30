import { selector } from 'recoil';
import {
  serverOriginState,
  checkedItemIdsState,
  cartState,
  pointsState,
} from '../atoms';
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

export const cartPriceSelector = selector<number>({
  key: 'cartPrice',
  get: ({ get }) => {
    const checkedItemIds = get(checkedItemIdsState);
    const cart = get(cartState);

    const checkedItems = cart.filter((cartItem) =>
      checkedItemIds.has(cartItem.id),
    );

    return checkedItems.reduce(
      (prev, item) => prev + item.product.price * item.quantity,
      0,
    );
  },
});

export const finalPriceSelector = selector<number>({
  key: 'finalPrice',
  get: ({ get }) => {
    const cartPrice = get(cartPriceSelector);
    const { selectedPoints } = get(pointsState);

    return cartPrice - selectedPoints;
  },
});
