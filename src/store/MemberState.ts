import { atom } from 'recoil';
import { MemberTypes } from '../types';

export const memberState = atom<MemberTypes | undefined>({
  key: 'memberState',
  default: undefined,
});
