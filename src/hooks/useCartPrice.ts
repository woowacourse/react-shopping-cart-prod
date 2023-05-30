import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';

import useMultipleChecked from './useMultipleChecked';
import { checkedPriceState } from '../states/checkedCartProducts';
import { DELIVERY_FEE } from '../constants/fee';

const useExpectedPayment = () => {
  const { isAllUnchecked } = useMultipleChecked();

  const totalProductPrice = useRecoilValue(checkedPriceState);

  const deliveryFee = useMemo(
    () => (isAllUnchecked ? 0 : DELIVERY_FEE),
    [isAllUnchecked]
  );

  const totalPrice = useMemo(
    () => totalProductPrice + deliveryFee,
    [deliveryFee, totalProductPrice]
  );

  return {
    totalProductPrice: totalProductPrice.toLocaleString('ko-KR'),
    deliveryFee: deliveryFee.toLocaleString('ko-KR'),
    totalPrice: totalPrice.toLocaleString('ko-KR'),
  };
};

export default useExpectedPayment;
