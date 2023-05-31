import { atom } from 'recoil';
import type { CartItem } from '../../types/cart';

export const cartState = atom<CartItem[]>({
  key: 'cartState',
  default: [],
});
