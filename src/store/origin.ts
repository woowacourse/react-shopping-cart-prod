import { atom } from 'recoil';

export const originState = atom<string>({
  key: 'origin',
  default: 'http://3.36.132.125:8080',
});
