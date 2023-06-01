import { getCoupons } from "api/coupons";
import { atom, selector } from "recoil";
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
