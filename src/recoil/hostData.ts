import { atom } from 'recoil';
import { HostNameType } from '../types/server';

export const hostNameAtom = atom<HostNameType>({
  key: 'hostNameState',
  default: '해온',
});
