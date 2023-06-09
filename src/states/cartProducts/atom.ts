import { atom } from 'recoil';

import { cartProductSelector } from './selector';
import type { CartProduct } from '../../types/product';

export const cartProductState = atom<CartProduct[]>({
  key: 'cartProductState',
  default: cartProductSelector,
});
