import { Coupon, SpecificCoupon } from '../types/coupon';
import { Product } from '../types/products';

type DiscountInfo = Pick<SpecificCoupon, 'discountType' | 'value'>;
type OriginPrice = Product['price'];

export const getDiscountInfo = (
  price: OriginPrice,
  { discountType, value }: DiscountInfo
) => {
  switch (discountType) {
    case 'FIX':
      return {
        dcMsg: `${value}원 할인`,
        discountedPrice: price - value,
      };
    case 'RATE':
      return {
        dcMsg: `${value}% 할인`,
        discountedPrice: price * ((100 - value) / 100),
      };
  }
};

export const calculateDiscountedPrice = <T extends Coupon>(
  price: Product['price'],
  selectedCoupon: T
) => {
  const { discountType, value } = selectedCoupon;
  return getDiscountInfo(price, {
    discountType,
    value,
  }).discountedPrice;
};
