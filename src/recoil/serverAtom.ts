import { atom } from 'recoil';
import { localStorageEffect } from '../utils/localStorage';
import { LOCAL_STORAGE_KEY } from '../constants/path';

export const serverState = atom<string>({
  key: 'serverState',
  default: '테스트',
  effects: [localStorageEffect<string>(LOCAL_STORAGE_KEY.SERVER)],
});
