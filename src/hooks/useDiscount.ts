import { useRecoilState, useRecoilValue } from 'recoil';

import { cartTotalAmountState } from '../store/cart';
import { couponDiscountState } from '../store/coupon';
import { cartPaymentState } from '../store/payment';

export const useDiscount = () => {
  const cartTotalAmount = useRecoilValue(cartTotalAmountState);
  const couponDiscount = useRecoilValue(couponDiscountState);
  const [cartPayment, setCartPayment] = useRecoilState(cartPaymentState);

  const calForSelectedCartItem = () => {
    if (cartTotalAmount === 0) {
      setCartPayment(cartTotalAmount);
      return;
    }

    setCartPayment(cartTotalAmount);
  };

  const calForSelectedCoupon = () => {
    setCartPayment(cartTotalAmount - couponDiscount);
  };

  return { cartPayment, calForSelectedCartItem, calForSelectedCoupon };
};
