import { atom, selector, selectorFamily } from 'recoil';
import { fetchCoupons } from '../apis/coupons';

export const selectedCouponsState = atom<number[]>({
  key: 'selectedCouponsState',
  default: [],
});

export const couponsSelector = selector({
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
      const { specificCoupons } = get(couponsSelector);
      return specificCoupons.filter(
        (coupon) => coupon.targetProductId === targetCartItemId
      );
    },
});
