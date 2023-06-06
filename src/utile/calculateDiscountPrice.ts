import { Coupon } from "types/domain";

export const calculateDiscountPrice = (
  prise: number,
  quantity: number,
  coupon: Coupon
) => {
  const { type, amount } = coupon.discount;

  if (type === "price") return prise * quantity - amount;
  return (prise * quantity * (100 - amount)) / 100;
};
