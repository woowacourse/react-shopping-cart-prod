import { atom, selector } from 'recoil';

import type { CartDetails, CartProduct } from '../types/product';
import { cartApi } from '../apis/cartProducts';
import { hostNameAtom } from './hostData';

export const cartProductAtom = atom<CartProduct[]>({
  key: 'cartProductState',
  default: selector({
    key: 'cartProductState/Default',
    get: async ({ get }) => {
      const hostName = get(hostNameAtom);
      const response = await cartApi(hostName).then((apiInstance) => {
        return apiInstance.fetchCartProducts();
      });

      const cartDetails: CartDetails = response;
      return cartDetails.cartItems;
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
