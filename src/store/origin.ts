import { atom } from 'recoil';

import { ORIGIN } from './../utils/origin';

export const originState = atom<string>({
  key: 'origin',
  default: ORIGIN['망고'],
});
