import { useCallback, useMemo } from 'react';
import { useRecoilValue } from 'recoil';

import useMultipleChecked from './useMultipleChecked';
import { checkedPriceState } from '../states/checkedCartProducts';

const DELIVERY_FEE = 3_000;

const useExpectedPayment = () => {
  const { isAllUnchecked } = useMultipleChecked();

  const totalProductPrice = useRecoilValue(checkedPriceState);

  const deliveryFee = useMemo(
    () => (isAllUnchecked ? 0 : DELIVERY_FEE),
    [isAllUnchecked]
  );

  const calculateTotalPrice = useCallback(
    (discountPrice = 0) => {
      return (totalProductPrice + deliveryFee - discountPrice).toLocaleString(
        'ko-KR'
      );
    },
    [deliveryFee, totalProductPrice]
  );

  return {
    totalProductPrice: totalProductPrice.toLocaleString('ko-KR'),
    deliveryFee: deliveryFee.toLocaleString('ko-KR'),
    calculateTotalPrice,
  };
};

export default useExpectedPayment;
