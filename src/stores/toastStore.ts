import { atom } from 'recoil';

export const toastStore = atom<string | null>({
  key: 'toastStore',
  default: null,
});

export const toastVisibilityStore = atom<boolean>({
  key: 'toastVisibilityStore',
  default: false,
});
