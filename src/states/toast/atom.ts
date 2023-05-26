import { atom } from 'recoil';

export interface ToastState {
  message: string;
  variant: 'success' | 'error';
  duration: number;
}

export const toastState = atom<ToastState | null>({
  key: 'atomState',
  default: null,
});
