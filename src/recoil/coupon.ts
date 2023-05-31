import { getCoupons } from "api/coupons";
import { DefaultValue, atom, selector, selectorFamily } from "recoil";
import { Coupon } from "types/domain";

const getCouponList = selector<Coupon[]>({
  key: "getCouponList",
  get: async ({ get }) => {
    const coupons = await getCoupons();

    return coupons.map((coupon) => {
      const newCoupon: Coupon = {
        ...coupon,
        isSelected: false,
      };

      return newCoupon;
    });
  },
});

export const couponListState = atom<Coupon[]>({
  key: "couponList",
  default: getCouponList,
});

export const selectedCoupon = selectorFamily({
  key: "cartCouponSelector",
  get: () => {
    return ({ get }) => {
      const couponList = get(couponListState);
      return couponList;
    };
  },
  set:
    (previousCouponId: number | undefined) =>
    ({ get, set }, currentCouponId) => {
      if (currentCouponId instanceof DefaultValue) return;

      const couponList = [...get(couponListState)].map((coupon) => {
        if (
          coupon.couponId !== currentCouponId &&
          coupon.couponId !== previousCouponId
        )
          return coupon;

        return {
          ...coupon,
          isSelected: coupon.couponId === currentCouponId,
        };
      });

      return set(couponListState, couponList);
    },
});
