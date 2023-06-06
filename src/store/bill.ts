import { atom, selector } from 'recoil';
import { DELIVERY_FEE, FREE_DELIVERY_BOUNDARY } from '../constants/policy';
import getDiscountAmount from '../util/getDiscountAmount';

export const totalProductPriceAtom = atom({
  key: 'total-product-price',
  default: 0,
});

export const billSelector = selector({
  key: 'bill-selector',
  get: ({ get }) => {
    const totalProductPrice = get(totalProductPriceAtom);

    const deliveryFee =
      totalProductPrice >= FREE_DELIVERY_BOUNDARY ? 0 : DELIVERY_FEE;

    const discountAmount = getDiscountAmount(totalProductPrice);

    const totalOrderAmount = totalProductPrice - discountAmount + deliveryFee;

    return { deliveryFee, discountAmount, totalOrderAmount };
  },
});
