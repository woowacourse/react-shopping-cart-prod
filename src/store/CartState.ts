import { atom } from 'recoil';
import { CartItem } from '../types';

export const cartState = atom<CartItem[]>({
  key: 'cartState',
  default: [],
});

export const checkedItemsState = atom<number[]>({
  key: 'checkedItems',
  default: [],
});
