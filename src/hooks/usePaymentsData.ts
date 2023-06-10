/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { $CartList, $CheckedCartIdList } from '../recoil/atom';
import useGetQuery from './useGetQuery';
import type { PaymentsData } from '../types';

const usePaymentsData = (currentServerUrl: string) => {
  const cartList = useRecoilValue($CartList(currentServerUrl));
  const checkedCartIdList = useRecoilValue($CheckedCartIdList(currentServerUrl));

  const queryParams = new URLSearchParams();
  checkedCartIdList.forEach(id => {
    queryParams.append('cartItemIds', String(id));
  });

  const { data: paymentsData, refreshQuery: refreshPaymentsData } = useGetQuery<PaymentsData>(
    `${currentServerUrl}/total-cart-price?${queryParams.toString()}`,
  );

  useEffect(() => {
    if (checkedCartIdList.length !== 0) {
      refreshPaymentsData(`${currentServerUrl}/total-cart-price?${queryParams.toString()}`);
    }
  }, [cartList]);

  if (queryParams.toString() === '') {
    return {
      originalPrice: 0,
      discounts: [],
      discountedPrice: 0,
      deliveryFee: 0,
      finalPrice: 0,
    };
  }

  return paymentsData;
};

export default usePaymentsData;
