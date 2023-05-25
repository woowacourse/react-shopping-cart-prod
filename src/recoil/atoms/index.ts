import { atom } from 'recoil';
import { ToastProps } from '../../components/common/Toast/Toast';
import type { CartItem } from '../../types/product';

export const cartState = atom<CartItem[]>({
  key: 'cartState',
  default: [],
});

export const toastState = atom<ToastProps[]>({
  key: 'toastState',
  default: [],
});

export const serverOriginState = atom<string>({
  key: 'serverOriginState',
  default: 'http://somsom.techcourse.store',
});
