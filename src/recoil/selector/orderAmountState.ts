import { selector } from 'recoil';

import { CouponType } from '@Types/index';

import convert from '@Utils/convert';

import cartItemsState from '@Atoms/cartItemsState';
import myCouponState from '@Atoms/myCouponState';
import selectedCouponIdState from '@Atoms/selectedCouponIdState';

import { DELIVERY_FEE } from '@Constants/index';

const calculateCouponDiscountAmount = (useCoupon: undefined | CouponType, allPrice: number) => {
  if (!useCoupon) return null;
  if (allPrice < 50000) return null;

  return useCoupon.discountAmount;
};

const calculateDiscountAmount = (allPrice: number) => {
  if (allPrice >= 500000) return Math.floor((allPrice * 5) / 100);
  if (allPrice >= 300000) return Math.floor((allPrice * 3) / 100);
  if (allPrice >= 100000) return Math.floor((allPrice * 1) / 100);

  return 0;
};

const orderAmountState = selector({
  key: 'orderAmountState',

  get: ({ get }) => {
    const cartItems = get(cartItemsState);
    const myCoupons = get(myCouponState);
    const useCouponId = get(selectedCouponIdState);

    if (!cartItems)
      return {
        orderAmount: '0',
        deliveryFee: '0',
        totalOrderPrice: '0',
        discountAmount: null,
        couponDiscountAmount: null,
      };

    const allPrice = cartItems.reduce((acc, cur) => {
      if (!cur.isSelected) return acc;
      return acc + cur.quantity * cur.product.price;
    }, 0);

    const isDiscounted = allPrice >= 100000;

    const orderAmount = convert.toLocalPriceFromNumber(allPrice);

    const discountAmount = calculateDiscountAmount(allPrice);

    const useCoupon = myCoupons.find((coupon) => coupon.id === useCouponId);
    const couponDiscountAmount = calculateCouponDiscountAmount(useCoupon, allPrice);

    const allDiscountAmount = discountAmount + (couponDiscountAmount || 0);

    const deliveryFee = !allPrice ? `0 원` : convert.toLocalPriceFromNumber(DELIVERY_FEE);
    const totalOrderPrice = convert.toLocalPriceFromNumber(
      allPrice - allDiscountAmount + (!allPrice ? 0 : DELIVERY_FEE),
    );

    return {
      orderAmount,
      deliveryFee,
      totalOrderPrice,
      discountAmount: isDiscounted ? `- ${convert.toLocalPriceFromNumber(discountAmount)}` : `0 원`,
      couponDiscountAmount: couponDiscountAmount ? `- ${convert.toLocalPriceFromNumber(couponDiscountAmount)}` : null,
    };
  },
});

export default orderAmountState;
