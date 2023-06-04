import { atom } from 'recoil';
import { BASE_URLS } from '../../constants/api';
import type { ToastProps } from '../../components/common/Toast/Toast';

export const toastState = atom<ToastProps[]>({
  key: 'toastState',
  default: [],
});

export const modalState = atom<boolean>({
  key: 'modalState',
  default: false,
});

export const menuState = atom<boolean>({
  key: 'menuState',
  default: false,
});

export const serverOriginState = atom<string>({
  key: 'serverOriginState',
  default: BASE_URLS['baron'],
});
