import {atom} from "recoil";
import {Coupon, Point} from "../../../types/types.ts";

export const deliveryFeeState = atom({
  key: "deliveryFeeState",
  default: 3000,
});

export const couponState = atom<Coupon[]>({
  key: "couponState",
  default: [],
});

export const pointState = atom<Point>({
  key: "pointState",
  default: {
    pointHistories: [],
    totalPoint: 0,
  },
});

export const selectedCouponState = atom<Coupon[]>({
  key: "selectedCouponState",
  default: [],
});

export const selectedPointState = atom({
  key: "selectedPointState",
  default: 0,
});

export const expectedOrderPriceState = atom({
  key: "expectedOrderPriceState",
  default: 0,
});
