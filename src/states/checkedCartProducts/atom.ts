import { atom, selector } from 'recoil';

import { cartProductState } from '../cartProducts';
import type { CartProduct } from '../../types/product';

export const checkedCartProductState = atom<CartProduct[]>({
  key: 'checkedCartProductState',
  default: selector({
    key: 'checkedCartProductState/default',
    get: ({ get }) => get(cartProductState),
  }),
});
