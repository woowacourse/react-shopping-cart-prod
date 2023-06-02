import { atom } from 'recoil';
import { CouponInfo } from '../types';
import { localStorageEffect } from './effect';

export const couponState = atom<CouponInfo[]>({
  key: 'couponState',
  default: [],
  effects: [localStorageEffect('coupon')],
});
