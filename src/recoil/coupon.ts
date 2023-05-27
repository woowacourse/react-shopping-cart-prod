import { getCoupons } from "api/coupons";
import { atom, selector } from "recoil";
import { Coupon } from "types/domain";

const getProductList = selector<Coupon[]>({
  key: "getCouponList",
  get: async ({ get }) => {
    const coupons = await getCoupons();

    if (!coupons) {
      alert("상품 정보 불러오기 실패!");
      return [];
    }

    return coupons.map((coupon) => {
      const newCoupon: Coupon = {
        ...coupon,
        selected: false,
      };

      return newCoupon;
    });
  },
});

export const couponListState = atom<Coupon[]>({
  key: "couponList",
  default: getProductList,
});
