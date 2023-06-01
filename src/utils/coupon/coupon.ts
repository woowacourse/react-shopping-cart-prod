import { CouponType } from '@type/couponType';

interface GetAvailableCouponsByTotalPriceParams {
  coupons: CouponType[];
  totalItemsPrice: number;
}

export const getAvailableCouponsByTotalPrice = ({
  coupons,
  totalItemsPrice,
}: GetAvailableCouponsByTotalPriceParams) => {
  if (totalItemsPrice === 0) return [];

  return coupons.filter((coupon) => coupon.minimumPrice <= totalItemsPrice);
};

interface GetDiscountPriceParams {
  coupon: CouponType;
  deliveryFee: number;
  totalItemsPrice: number;
}

export const getDiscountPrice = ({
  coupon,
  deliveryFee,
  totalItemsPrice,
}: GetDiscountPriceParams) => {
  if (totalItemsPrice === 0) {
    throw new Error('총 상품 가격이 0원이여서 쿠폰을 사용할 수 없습니다.');
  }

  if (coupon.type === 'delivery') {
    return totalItemsPrice;
  }

  if (coupon.type === 'price') {
    const discountedPrice = Math.max(0, totalItemsPrice - coupon.value);
    return discountedPrice + deliveryFee;
  }

  if (coupon.type === 'percent') {
    const percentage = 1 - coupon.value / 100;
    return totalItemsPrice * percentage + deliveryFee;
  }
};
