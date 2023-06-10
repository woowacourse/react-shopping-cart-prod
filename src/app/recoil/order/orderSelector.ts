import {selector, selectorFamily} from "recoil";
import {totalPriceSelector} from "../cart/cartSelectors.ts";
import {selectedCouponState} from "./orderAtom.ts";

export const selectedCouponIdSelector = selector<number[]>({
  key: "selectedCouponIdSelector",
  get: ({get}) => {
    const selectedCoupons = get(selectedCouponState);
    return selectedCoupons.map((coupon) => coupon.id);
  },
});

export const discountPriceByCouponSelector = selector<number>({
  key: "discountPriceByCouponSelector",
  get: ({get}) => {
    const totalPrice = get(totalPriceSelector);
    const selectedCoupons = get(selectedCouponState);
    const discount =
      selectedCoupons.length > 0
        ? (totalPrice * selectedCoupons[0]?.discountPercent) / 100 +
        selectedCoupons[0]?.discountAmount
        : 0;
    return discount;
  },
});

export const isCouponSelectedSelector = selectorFamily<boolean, number>({
  key: "selectedCouponSelectedSelector",
  get:
    (couponId: number) =>
      ({get}) => {
        const selectedCouponIds = get(selectedCouponIdSelector);

        return selectedCouponIds.includes(couponId);
      },
});
