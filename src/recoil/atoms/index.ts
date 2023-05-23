import { atom } from 'recoil';
import { cartItemsQuery } from '../selectors';
import type { CartItem } from '../../types/product';
import { ToastProps } from '../../components/common/Toast/Toast';

export const cartState = atom<CartItem[]>({
  key: 'cartState',
  default: cartItemsQuery,
});

export const toastState = atom<ToastProps[]>({
  key: 'toastState',
  default: [],
});

export const serverOriginState = atom<string>({
  key: 'serverOriginState',
  default: 'http://localhost:3000',
});
