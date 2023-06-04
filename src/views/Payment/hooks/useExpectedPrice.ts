import { CouponType } from 'types/CouponType';
import { DELIVERY_FEE_BASIC } from '../constants/orderConstants';
import { useTotalPrice } from '@views/Cart/recoil/cartState';

interface GetExpectedPriceParams {
  totalPrice: number;
  deliveryFee: number;
  discountPrice: number;
}

const getDiscount = (coupon: CouponType | null, totalPrice: number) => {
  if (!coupon || !totalPrice) {
    return 0;
  }

  switch (coupon.type) {
    case 'delivery': {
      return coupon.value;
    }

    case 'price': {
      return totalPrice >= coupon.value ? coupon.value : totalPrice;
    }

    case 'percent': {
      return (coupon.value / 100) * totalPrice;
    }
  }
};

const getDeliveryFee = (totalPrice: number) => (totalPrice ? DELIVERY_FEE_BASIC : 0);

const useExpectedPriceContent = (coupon: CouponType | null) => {
  const totalPrice = useTotalPrice();

  const discountPrice = getDiscount(coupon, totalPrice);
  const deliveryFee = getDeliveryFee(totalPrice);

  return {
    totalPrice,
    discountPrice,
    deliveryFee,
    expectedPrice: totalPrice + deliveryFee - discountPrice,
  };
};

export default useExpectedPriceContent;
