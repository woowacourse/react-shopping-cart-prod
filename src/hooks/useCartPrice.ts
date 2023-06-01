import { useRecoilValue } from 'recoil';

import useMultipleChecked from './useMultipleChecked';
import { DELIVERY_FEE } from '../constants/fee';
import { checkedPriceState } from '../states/checkedCartProducts';
import { targetCouponPriceSelector } from '../states/coupon';

const useCartPrice = () => {
  const { isAllUnchecked } = useMultipleChecked();

  const totalProductPrice = useRecoilValue(checkedPriceState);
  const couponPrice = useRecoilValue(targetCouponPriceSelector);
  const deliveryFee = isAllUnchecked ? 0 : DELIVERY_FEE;
  const totalPrice = totalProductPrice + deliveryFee - couponPrice;

  return { totalProductPrice, deliveryFee, couponPrice, totalPrice };
};

export default useCartPrice;
