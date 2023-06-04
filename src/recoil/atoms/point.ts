import { atom } from 'recoil';

export const pointState = atom<number>({
  key: 'pointState',
  default: 0,
});
