import { atom } from 'recoil';

import { selectedCouponItemType } from '../types';

export const couponListState = atom<selectedCouponItemType[]>({
  key: 'couponList',
  default: [],
});
