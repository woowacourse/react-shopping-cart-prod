import { atom } from 'recoil';

import { CartProduct } from '../../types/product';

export const cartProductState = atom<CartProduct[]>({
  key: 'cartProductState',
  default: [],
});
