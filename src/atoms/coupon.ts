import { fetchCoupons } from './../apis/coupon';
import { selector } from 'recoil';
import { ProductCouponMap } from '../types/coupon';

export const couponsSelector = selector({
  key: 'couponsSelector',
  get: async () => {
    const { allCoupons, specificCoupons } = await fetchCoupons();
    const productCoupons = specificCoupons.reduce<ProductCouponMap>(
      (productCoupon, { targetProductId, ...restInfo }) => ({
        ...productCoupon,
        [targetProductId]: [...(productCoupon.targetProductId ?? []), restInfo],
      }),
      Object.create(Object.prototype)
    );

    return { allCoupons, productCoupons };
  },
});

export const productCouponsSelector = selector({
  key: 'productCouponsSelector',
  get: ({ get }) => get(couponsSelector).productCoupons,
});

export const allCouponsSelector = selector({
  key: 'allCouponsSelector',
  get: ({ get }) => get(couponsSelector).allCoupons,
});
