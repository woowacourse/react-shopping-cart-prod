import { atom } from 'recoil';

export const serverState = atom<string>({
  key: 'serverState',
  default: 'http://3.37.86.118:8080',
});
