import { atom, selector, selectorFamily } from "recoil";
import { serverSelectState } from "./server";
import { getCoupons } from "api/coupons";
import { UsableCoupon } from "types/domain";
import { cartSelector } from "./cart";

const getCouponList = selector<UsableCoupon[]>({
  key: "getCouponList",
  get: async ({ get }) => {
    const selectedServer = get(serverSelectState);

    const coupons = await getCoupons(selectedServer);

    return coupons.map((coupon) => {
      return { ...coupon, productId: null };
    });
  },
});

export const couponListState = atom<UsableCoupon[]>({
  key: "couponList",
  default: getCouponList,
});

export const getDisconutedPriceByProductId = selectorFamily<number | null, number>({
  key: "getDisconutedPriceByProductId",
  get:
    (productId) =>
    ({ get }) => {
      const coupon = get(couponListState).find((coupon) => coupon.productId === productId);
      const cartItem = get(cartSelector(productId));

      if (!coupon || !cartItem) return null;

      const price = cartItem.quantity * cartItem.product.price;
      const amount = coupon.discount.amount;

      if (coupon.discount.type === "price") return price < amount ? 0 : price - amount;
      if (coupon.discount.type === "rate") return price * ((100 - amount) / 100);

      return null;
    },
});

export const totalCouponDiscount = selector({
  key: "totalCouponDiscount",
  get: ({ get }) =>
    get(couponListState)
      .filter((coupon) => coupon.productId !== null)
      .reduce((sum, coupon) => {
        const product = get(cartSelector(coupon.productId!));
        if (!product) return sum;

        const price = product.product.price * product.quantity;

        if (coupon.discount.type === "rate") return sum + price * (coupon.discount.amount / 100);
        if (coupon.discount.type === "price")
          return price < coupon.discount.amount ? sum + price : sum + coupon.discount.amount;
        return sum;
      }, 0),
});
