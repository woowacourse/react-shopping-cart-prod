import { selector, selectorFamily } from 'recoil';

import { couponState } from './atom';
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

export const targetCouponPriceSelector = selectorFamily({
  key: 'targetCouponPriceSelector',
  get:
    (targetId: number | null) =>
    ({ get }) =>
      targetId
        ? get(couponState).find((coupon) => coupon.id === targetId)
            ?.discountPrice ?? 0
        : 0,
});
