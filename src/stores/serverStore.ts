import { atom } from 'recoil';
import { ServerNames } from '../types/request.ts';

export const serverAtom = atom<ServerNames>({
  key: 'serverAtom',
  default: 'SPLIT',
});
