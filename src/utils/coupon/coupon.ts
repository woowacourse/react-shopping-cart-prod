import { getPercentageNumber } from '@utils/common';
import { CouponType, ServerCouponType } from '@type/couponType';

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

interface GetDiscountedTotalPriceParams {
  coupon: CouponType;
  deliveryFee: number;
  totalItemsPrice: number;
}

export const getDiscountedTotalPrice = ({
  coupon,
  deliveryFee,
  totalItemsPrice,
}: GetDiscountedTotalPriceParams) => {
  if (totalItemsPrice === 0) {
    throw new Error('총 상품 가격이 0원이여서 쿠폰을 사용할 수 없습니다.');
  }

  return (
    totalItemsPrice +
    deliveryFee -
    Math.min(totalItemsPrice, getDiscountPrice({ totalItemsPrice, coupon }))
  );
};

interface GetDiscountPriceParams {
  totalItemsPrice: number;
  coupon: CouponType;
}

export const getDiscountPrice = ({ totalItemsPrice, coupon }: GetDiscountPriceParams) => {
  if (totalItemsPrice === 0) return 0;
  if (totalItemsPrice < coupon.minimumPrice) return 0;

  if (coupon.type === 'percent') {
    const result = getPercentageNumber({ total: totalItemsPrice, percent: coupon.value });

    return result ?? 0;
  }

  if (coupon.type === 'price') {
    return Math.min(coupon.value, totalItemsPrice);
  }

  return coupon.value;
};

export const couponApiWrapper = (coupons: ServerCouponType[]): CouponType[] => {
  return coupons.map((coupon) => ({
    id: coupon.id,
    name: coupon.name,
    type: coupon.type,
    value: coupon.value,
    minimumPrice: coupon.minimumPrice,
  }));
};
