import { Coupon } from '../types/coupon';

export const getDiscountPrice = (coupon: Coupon, targetPrice: number) => {
  const getDiscountPriceByRate = (base: number, rate: number) => {
    return Math.floor(base * (rate / 100));
  };

  if (coupon.discountType === 'RATE') {
    return getDiscountPriceByRate(targetPrice, coupon.value);
  }
  return coupon.value;
};
