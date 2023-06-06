import { atom, selector } from 'recoil';
import { cartApiAtom } from './hostData';
import type { CartProduct } from '../types/product';

export const cartProductAtom = atom<CartProduct[]>({
  key: 'cartProductState',
  default: selector({
    key: 'cartProductState/Default',
    get: async ({ get }) => {
      const apiInstance = get(cartApiAtom);
      const response = await apiInstance.fetchCartProducts();
      return response;
    },
  }),
});

export const totalCartProductSelect = selector<number>({
  key: 'totalCartProductState',
  get: ({ get }) => {
    const cartProducts = get(cartProductAtom);

    return cartProducts.length;
  },
});
