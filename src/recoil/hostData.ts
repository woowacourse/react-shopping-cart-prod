import type { HostNameType } from '../types/server';
import { atom } from 'recoil';

export const hostNameAtom = atom<HostNameType>({
  key: 'hostNameState',
  default: '도기',
});
