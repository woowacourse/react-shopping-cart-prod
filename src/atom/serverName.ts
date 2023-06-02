import { atom } from 'recoil';
import { ServerNameType } from '../types';
import { localStorageEffect } from './effect';
import { LOCAL_STORAGE_KEY } from '../constants';

export const serverNameState = atom<ServerNameType>({
  key: 'serverNameState',
  default: 'JOURNY',
  effects: [localStorageEffect(LOCAL_STORAGE_KEY.serverName)],
});
