import { atom } from 'recoil';
import { localStorageEffect } from '../utils/localStorage';

export const serverState = atom<string>({
  key: 'serverState',
  default: '테스트',
  effects: [localStorageEffect<string>('server')],
});
