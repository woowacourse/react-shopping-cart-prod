import { atom } from 'recoil';
import { ENDPOINT } from '../constants/auth';

export const endpointKeyState = atom<keyof typeof ENDPOINT>({
  key: 'endpointKeyState',
  default: '말랑',
});
