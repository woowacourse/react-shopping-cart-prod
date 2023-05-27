import { atom, selector } from 'recoil';
import { BASE_URL } from '../constants/baseURL';

export type ServerName = 'SPLIT' | 'ROY' | 'IRAE';

export const serverAtom = atom<ServerName>({
  key: 'server/name',
  default: 'IRAE',
});

export const baseURLSelector = selector({
  key: 'baseURL',
  get: ({ get }) => {
    const serverName = get(serverAtom);

    return BASE_URL[serverName];
  },
});
