import { selector } from 'recoil';

import { couponState, targetCouponIdState } from './atom';
import couponApis from '../../apis/coupons';

export const couponSelector = selector({
  key: 'couponSelector',
  get: () => couponApis().getCoupons(),
});

export const couponOptionSelector = selector({
  key: 'couponOptionSelector',
  get: ({ get }) =>
    get(couponState).map((coupon) => ({
      value: coupon.id,
      label: coupon.name,
    })),
});

export const targetCouponPriceSelector = selector({
  key: 'targetCouponPriceSelector',
  get: ({ get }) =>
    get(targetCouponIdState)
      ? get(couponState).find(
          (coupon) => coupon.id === get(targetCouponIdState)
        )?.discountPrice ?? 0
      : 0,
});
