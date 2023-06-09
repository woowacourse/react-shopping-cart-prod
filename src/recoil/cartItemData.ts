import type { CartItemType } from '../types/product';
import { atom, selector } from 'recoil';

import { api } from '../apis/cartItems';
import { hostNameAtom } from './hostData';

export const cartAtom = atom<CartItemType[]>({
  key: 'cartState',
  default: selector({
    key: 'cartProductState/Default',
    get: async ({ get }) => {
      const hostName = get(hostNameAtom);
      const response = await (await api(hostName)).getCartItems();
      return response;
    },
  }),
});

export const totalCartProductSelect = selector<number>({
  key: 'totalCartProductState',
  get: ({ get }) => {
    const cartProducts = get(cartAtom);
    return cartProducts.length;
  },
});
