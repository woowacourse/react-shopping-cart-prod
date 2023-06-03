import { atom, selector, selectorFamily, useRecoilState, useRecoilValue } from 'recoil';

import { fetchAPI } from '@api/fetchAPI';
import { localStorageEffect } from './localStorageEffect';

import type { CartItem } from '../types';

export const cartState = atom<CartItem[]>({
  key: 'cartState',
  default: [],
  effects: [localStorageEffect('cartState')],
});

export const cartSizeSelector = selector({
  key: 'cartSizeSelector',
  get: ({ get }) => {
    const cartItems = get(cartState);

    return cartItems.length;
  },
});

export const checkedCartItemsSelector = selector({
  key: 'checkedCartItemsSelector',
  get: ({ get }) => {
    const cartItems = get(cartState);

    return cartItems.filter((item) => item.checked === true);
  },
});

export const isAllCartCheckedSelector = selector({
  key: 'isAllCartCheckedSelector',
  get: ({ get }) => {
    const cartItems = get(cartState);

    if (cartItems.length > 0) {
      const isAllChecked = cartItems.every((item) => item.checked);

      return isAllChecked;
    }

    return true;
  },
});

export const findCartItemByProductIdSelector = selectorFamily<CartItem | undefined, number>({
  key: 'findCartItemByProductIdSelector',
  get:
    (productId) =>
    ({ get }) => {
      const cartItems = get(cartState);
      const targetItem = cartItems.find((item) => item.product.id === productId);

      return targetItem;
    },
});

export const cartRepository = selector({
  key: 'cartRepository',
  get: ({ getCallback }) => {
    const fetchCart = getCallback(({ set }) => async () => {
      const cartItems = await fetchAPI('/cart-items', {
        headers: {
          Authorization: `Basic ${btoa(process.env.REACT_APP_API_CREDENTIAL!)}`,
        },
      });
      const cartItemsWithCheckedState = cartItems.map((cartItem: any) => ({
        ...cartItem,
        checked: true,
      }));
      set(cartState, cartItemsWithCheckedState);
    });

    const addCartItem = (body: { productId: number }) => {
      getCallback(() => async () => {
        await fetchAPI('/cart-items', {
          method: 'POST',
          headers: {
            Authorization: `Basic ${btoa(process.env.REACT_APP_API_CREDENTIAL!)}`,
            'Content-Type': 'application/json',
          },
          body,
        });

        await fetchCart();
      })();
    };

    const updateQuantity = (cartItemId: number, quantity: number) => {
      getCallback(() => async () => {
        await fetchAPI(`/cart-items/${cartItemId}`, {
          method: 'PATCH',
          headers: {
            Authorization: `Basic ${btoa(process.env.REACT_APP_API_CREDENTIAL!)}`,
            'Content-Type': 'application/json',
          },
          body: {
            quantity,
          },
        });

        await fetchCart();
      })();
    };

    const deleteCartItem = (cartId: number) => {
      getCallback(() => async () => {
        await fetchAPI(`/cart-items/${cartId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Basic ${btoa(process.env.REACT_APP_API_CREDENTIAL!)}`,
          },
        });

        await fetchCart();
      })();
    };

    return { fetchCart, addCartItem, deleteCartItem, updateQuantity };
  },
});

export const useCartState = () => useRecoilState(cartState);

export const useCheckedCartItems = () => useRecoilValue(cartState);

export const useIsAllCartChecked = () => useRecoilValue(isAllCartCheckedSelector);

export const useCartRepository = () => useRecoilValue(cartRepository);

export const useCartSize = () => useRecoilValue(cartSizeSelector);

export const useFindCartItemByProductId = (productId: number) =>
  useRecoilValue(findCartItemByProductIdSelector(productId));
