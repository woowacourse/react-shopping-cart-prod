import { selector, selectorFamily } from 'recoil';
import { fetchCartItems } from '../../remotes/cart';
import { serverOriginState } from '../atoms/common';
import { CART_BASE_URL } from '../../constants/api';
import { cartState } from '../atoms/cart';
import type { CartItem } from '../../types/cart';

export const cartItemsQuery = selector<CartItem[]>({
  key: 'cartItems',
  get: async ({ get }) => {
    const cartItems = await fetchCartItems(
      `${get(serverOriginState)}${CART_BASE_URL}`,
    );

    return cartItems;
  },
});

export const selectedCartItems = selectorFamily<
  CartItem[],
  Set<CartItem['id']>
>({
  key: 'selectedCartItems',
  get:
    (selectedItemIds: Set<CartItem['id']>) =>
    ({ get }) => {
      return get(cartState).filter((cartItem) =>
        selectedItemIds.has(cartItem.id),
      );
    },
});
