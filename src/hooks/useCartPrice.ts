import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';

import useMultipleChecked from './useMultipleChecked';
import { checkedPriceState } from '../states/checkedCartProducts';
import { serverNameState } from '../states/serverName';

const DELIVERY_FEE = 3_000;

const useExpectedPayment = () => {
  const serverName = useRecoilValue(serverNameState);
  const { isAllUnchecked } = useMultipleChecked();

  const totalProductPrice = useRecoilValue(checkedPriceState(serverName));

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
