import { useRecoilValue } from 'recoil';

import useMultipleChecked from './useMultipleChecked';
import { DELIVERY_FEE } from '../constants/fee';
import { checkedPriceState } from '../states/checkedCartProducts';
import { currentCouponPriceSelector } from '../states/coupon';

const useCartPrice = (currentCouponId: number | undefined) => {
  const { isAllUnchecked } = useMultipleChecked();

  const totalProductPrice = useRecoilValue(checkedPriceState);
  const couponPrice = useRecoilValue(
    currentCouponPriceSelector(currentCouponId)
  );
  const deliveryFee = isAllUnchecked ? 0 : DELIVERY_FEE;
  const totalPrice = totalProductPrice + deliveryFee - couponPrice;

  return { totalProductPrice, deliveryFee, couponPrice, totalPrice };
};

export default useCartPrice;
