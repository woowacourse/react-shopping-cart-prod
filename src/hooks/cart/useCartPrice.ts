import { useRecoilValue } from 'recoil';

import { useMultipleChecked } from '../checked';
import { checkedPriceSelector } from '../../states/checkedCartProducts';
import { currentCouponPriceSelector } from '../../states/coupon';

const DELIVERY_FEE = 3_000;

export const useCartPrice = (currentCouponId: number | undefined) => {
  const { isAllUnchecked } = useMultipleChecked();

  const totalProductPrice = useRecoilValue(checkedPriceSelector);
  const couponPrice = useRecoilValue(
    currentCouponPriceSelector(currentCouponId)
  );
  const deliveryFee = isAllUnchecked ? 0 : DELIVERY_FEE;
  const totalPrice = totalProductPrice + deliveryFee - couponPrice;

  return { totalProductPrice, deliveryFee, couponPrice, totalPrice };
};
