import { atom, selector, useRecoilValue } from 'recoil';

import { fetchAPI } from '@api/fetchAPI';
import { CartItem } from 'src/types';
import { localStorageEffect } from './localStorageEffect';

export const cartState = atom<CartItem[]>({
  key: 'cartState',
  default: [],
  effects: [localStorageEffect('cartState')],
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

    const addCartItem = (body: { productId: number }) =>
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

    return { fetchCart, addCartItem };
  },
});

export const useCartRepository = () => useRecoilValue(cartRepository);
