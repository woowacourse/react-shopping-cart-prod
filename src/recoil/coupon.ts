import { atom, selector } from "recoil";
import { serverSelectState } from "./server";
import { getCoupons } from "api/coupon";
import { UsableCoupon } from "types/domain";
import { cartSelector } from "./cart";

const getCouponList = selector<UsableCoupon[]>({
  key: "getCouponList",
  get: async ({ get }) => {
    const selectedServer = get(serverSelectState);

    const coupons = await getCoupons(selectedServer);

    return coupons.map((coupon) => {
      return { ...coupon, cartItemId: null };
    });
  },
});

export const couponListState = atom<UsableCoupon[]>({
  key: "couponList",
  default: getCouponList,
});

export const selectedCouponList = selector({
  key: "selectedCouponList",
  get: ({ get }) => get(couponListState).filter((coupon) => coupon.cartItemId !== undefined),
});

export const totalCouponDiscount = selector({
  key: "totalCouponDiscount",
  get: ({ get }) =>
    get(couponListState)
      .filter((coupon) => coupon.cartItemId !== null)
      .reduce((sum, coupon) => {
        const product = get(cartSelector(coupon.cartItemId!));
        if (!product) return sum;

        const price = product.product.price * product.quantity;

        if (coupon.discount.type === "rate") return sum + price * (coupon.discount.amount / 100);
        if (coupon.discount.type === "price")
          return price < coupon.discount.amount ? price : coupon.discount.amount;
        return sum;
      }, 0),
});
