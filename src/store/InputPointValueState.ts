import { atom } from 'recoil';

export const inputPointValueState = atom<string>({
  key: 'inputPointValueState',
  default: '0',
});
