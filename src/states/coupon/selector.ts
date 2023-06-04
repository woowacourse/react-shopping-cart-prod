import { selector, selectorFamily } from 'recoil';

import { couponState } from './atom';
import couponApis from '../../apis/coupons';
import { serverNameState } from '../serverName';
import { checkedPriceState } from '../checkedCartProducts';

export const couponSelector = selector({
  key: 'couponSelector',
  get: ({ get }) => couponApis(get(serverNameState)).getCoupons(),
});

export const couponOptionSelector = selector({
  key: 'couponOptionSelector',
  get: ({ get }) =>
    get(couponState).map((coupon) => ({
      value: coupon.id,
      text: coupon.name,
      disabled: coupon.discountPrice >= get(checkedPriceState),
    })),
});

export const currentCouponPriceSelector = selectorFamily({
  key: 'currentCouponPriceSelector',
  get:
    (currentCouponId: number | undefined) =>
    ({ get }) =>
      currentCouponId
        ? get(couponState).find((coupon) => coupon.id === currentCouponId)
            ?.discountPrice ?? 0
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
