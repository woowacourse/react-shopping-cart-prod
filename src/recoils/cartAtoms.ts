import { atom, selector } from 'recoil';

import { fetchData } from '@api/fetchData';
import { CartItem } from 'src/types';
import { localStorageEffect } from './localStorageEffect';

export const cartState = atom<CartItem[]>({
  key: 'cartState',
  default: [],
  effects: [localStorageEffect('cartState')],
});

export const cartRepository = selector({
  key: 'useCart',
  get: ({ getCallback }) => {
    const fetchCart = getCallback(({ set }) => async () => {
      const cartItems = await fetchData('/cart-items', {
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

    return { fetchCart };
  },
});
