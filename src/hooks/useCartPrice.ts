import { useCallback, useMemo } from 'react';
import { useRecoilValue } from 'recoil';

import useMultipleChecked from './useMultipleChecked';
import { checkedPriceState } from '../states/checkedCartProducts';

export const DELIVERY_FEE = 3_000;

const useExpectedPayment = () => {
  const { isAllUnchecked } = useMultipleChecked();

  const totalProductPrice = useRecoilValue(checkedPriceState);

  const deliveryFee = useMemo(
    () => (isAllUnchecked ? 0 : DELIVERY_FEE),
    [isAllUnchecked]
  );

  const calculateTotalPrice = useCallback(
    (discountPrice = 0) => totalProductPrice + deliveryFee - discountPrice,
    [deliveryFee, totalProductPrice]
  );

  return {
    totalProductPrice: totalProductPrice,
    deliveryFee: deliveryFee,
    calculateTotalPrice,
  };
};

export default useExpectedPayment;
