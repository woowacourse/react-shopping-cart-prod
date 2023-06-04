import { atom } from 'recoil';

import { couponSelector } from './selector';

export const couponState = atom({
  key: 'couponState',
  default: couponSelector,
});
