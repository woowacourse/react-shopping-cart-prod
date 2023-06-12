/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { $CartList, $CheckedCartIdList } from '../recoil/atom';
import useGetQuery from './useGetQuery';
import type { PaymentsData } from '../types';

const usePaymentsData = (currentServerUrl: string) => {
  const cartList = useRecoilValue($CartList(currentServerUrl));
  const checkedCartIdList = useRecoilValue($CheckedCartIdList(currentServerUrl));

  const queryParams = useMemo(() => {
    const params = new URLSearchParams();
    checkedCartIdList.forEach(id => {
      params.append('cartItemIds', String(id));
    });
    return params.toString();
  }, [checkedCartIdList]);

  const { data: paymentsData, refreshQuery: refreshPaymentsData } = useGetQuery<PaymentsData>(
    `${currentServerUrl}/total-cart-price?${queryParams}`,
  );

  useEffect(() => {
    if (checkedCartIdList.length !== 0) {
      refreshPaymentsData(`${currentServerUrl}/total-cart-price?${queryParams}`);
    }
  }, [cartList]);

  if (queryParams === '') {
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
