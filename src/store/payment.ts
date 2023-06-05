import { atom, selector } from 'recoil';

import { cartTotalAmountState } from './cart';
import { couponDiscountState } from './coupon';

export const cartPaymentState = atom({
  key: 'cartPayment',
  default: 0,
});

export const cartPaymentResultState = selector({
  key: 'cartPaymentResult',
  get: ({ get }) => {
    const cartTotalAmount = get(cartTotalAmountState);
    const couponDiscount = get(couponDiscountState);

    return cartTotalAmount + 3000 - couponDiscount;
  },
});
