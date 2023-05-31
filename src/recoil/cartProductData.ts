import type { CartProduct } from '../types/product';
import { atom, selector } from 'recoil';

import { api } from '../apis/cartProducts';
import { hostNameAtom } from './hostData';

export const cartAtom = atom<CartProduct[]>({
  key: 'cartState',
  default: selector({
    key: 'cartProductState/Default',
    get: async ({ get }) => {
      const hostName = get(hostNameAtom);
      const response = api(hostName).then((apiInstance) => {
        return apiInstance.getCartProducts();
      });
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
