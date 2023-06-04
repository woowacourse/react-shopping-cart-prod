import { SpecificCoupon } from './../types/coupon';
import { fetchCoupons } from './../apis/coupon';
import { selector, selectorFamily } from 'recoil';
import { ProductCouponMap } from '../types/coupon';

export const couponsSelector = selector({
  key: 'couponsSelector',
  get: async () => {
    const { allCoupons, specificCoupons } = await fetchCoupons();
    const productCoupons = specificCoupons.reduce<ProductCouponMap>(
      (productCoupons, coupon) => ({
        ...productCoupons,
        [coupon.targetProductId]: [
          ...(productCoupons[coupon.targetProductId] ?? []),
          coupon,
        ],
      }),

      Object.create(Object.prototype)
    );

    return { allCoupons, productCoupons };
  },
});

export const productCouponsSelector = selectorFamily({
  key: 'productCouponsSelector',
  get:
    (id: SpecificCoupon['targetProductId']) =>
    ({ get }) =>
      get(couponsSelector).productCoupons[id],
});

export const allCouponsSelector = selector({
  key: 'allCouponsSelector',
  get: ({ get }) => get(couponsSelector).allCoupons,
});
