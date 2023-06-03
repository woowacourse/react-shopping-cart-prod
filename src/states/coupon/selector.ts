import { selector } from 'recoil';

import { couponState, targetCouponIdState } from './atom';
import couponApis from '../../apis/coupons';
import { serverNameState } from '../serverName';

export const couponSelector = selector({
  key: 'couponSelector',
  get: ({ get }) => couponApis(get(serverNameState)).getCoupons(),
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

export const updateCouponSelector = selector({
  key: 'updateCouponSelector',
  get: ({ get, getCallback }) => {
    const serverName = get(serverNameState);
    const { getCoupons } = couponApis(serverName);

    const updateCoupon = getCallback(({ set }) => async () => {
      const newCoupons = await getCoupons();
      set(couponState, newCoupons);
    });

    return updateCoupon;
  },
});
