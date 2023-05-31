import { atom } from 'recoil';

import { CouponItemType } from '../types';

export const couponListState = atom<CouponItemType[]>({
  key: 'couponList',
  default: [],
});
