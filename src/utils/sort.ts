import { Coupon } from '../types/types';

export const sortCoupons = (coupons: Coupon[], totalPrice: number) => {
  const availableCoupons = coupons.filter((coupon) => totalPrice >= coupon.minAmount);

  availableCoupons.sort((a, b) => {
    if (a.discountAmount === 0 && b.discountAmount === 0)
      return totalPrice * (b.discountPercent / 100) - totalPrice * (a.discountPercent / 100);
    else if (a.discountAmount === 0) return b.discountAmount - totalPrice * (a.discountPercent / 100);
    else if (b.discountAmount === 0) return totalPrice * (b.discountPercent / 100) - a.discountAmount;
    return b.discountAmount - a.discountAmount;
  });

  const unavailableCoupons = coupons
    .filter((coupon) => !availableCoupons.includes(coupon))
    .map((coupon) => ({ ...coupon, available: false }));

  return [...availableCoupons.map((coupon) => ({ ...coupon, available: true })), ...unavailableCoupons];
};
