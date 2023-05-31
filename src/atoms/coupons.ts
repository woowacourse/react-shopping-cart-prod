import { atom, selector, selectorFamily } from 'recoil';
import { fetchCoupons } from '../apis/coupons';

export const coupons = selector({
  key: 'couponsSelector',
  get: async () => {
    const { data } = await fetchCoupons();
    return data;
  },
});

export const specificCouponSelector = selectorFamily({
  key: 'specificCouponSelector',
  get:
    (targetCartItemId: number) =>
    ({ get }) => {
      const { specificCoupons } = get(coupons);
      return specificCoupons.filter(
        (coupon) => coupon.targetProductId === targetCartItemId
      );
    },
});

export const selectedCouponsState = atom<number[]>({
  key: 'selectedCouponsState',
  default: [],
});
