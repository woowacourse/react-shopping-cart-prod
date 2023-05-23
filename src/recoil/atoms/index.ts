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
  default: 'http://ec2-13-209-97-56.ap-northeast-2.compute.amazonaws.com:8080',
});
