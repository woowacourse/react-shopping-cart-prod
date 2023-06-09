import { atom } from 'recoil';
import { CouponType } from '@type/couponType';
import { getCouponListSelector } from './selector/getCouponListSelector';

const couponState = atom<CouponType[]>({
  key: 'couponState',
  default: getCouponListSelector,
});

export default couponState;
