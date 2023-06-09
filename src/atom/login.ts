import { atom } from 'recoil';
import { localStorageEffect } from './effect';

export const loginState = atom<string>({
  key: 'loginState',
  default: '',
  effects: [localStorageEffect('loginToken')],
});
