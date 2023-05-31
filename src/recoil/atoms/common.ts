import { atom } from 'recoil';
import type { ToastProps } from '../../components/common/Toast/Toast';

export const toastState = atom<ToastProps[]>({
  key: 'toastState',
  default: [],
});

export const modalState = atom<boolean>({
  key: 'modalState',
  default: false,
});

export const serverOriginState = atom<string>({
  key: 'serverOriginState',
  default: 'http://localhost:3000',
});
