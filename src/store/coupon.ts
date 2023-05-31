import { atom } from 'recoil';

export type UsableCouponType = {
  couponId: number;
  couponName: string;
  minAmount: string;
  isPublished: boolean;
};

export const usableCouponState = atom<UsableCouponType[]>({
  key: 'couponList',
  default: [],
});
