import { atom } from 'recoil';

export const originState = atom<string>({
  key: 'origin',
  default: '/',
});
