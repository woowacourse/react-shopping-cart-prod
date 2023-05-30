/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-syntax */

import { Payments } from 'src/types';
import { useRecoilValue } from 'recoil';
import { $CartList, $CheckedCartIdList, $CurrentServerUrl } from 'src/recoil/atom';
import { USER } from 'src/constants';
import { useEffect } from 'react';
import useGetQuery from './useGetQuery';

const getUrlParams = (data: number[], key: string) => {
  const urlParams = new URLSearchParams();

  for (const item of data) {
    urlParams.append(key, String(item));
  }
  return urlParams.toString();
};

function usePayments() {
  const currentServer = useRecoilValue($CurrentServerUrl);
  const cartList = useRecoilValue($CartList(currentServer));
  const cartCheckedIdList = useRecoilValue($CheckedCartIdList(currentServer));

  const urlParams = getUrlParams(cartCheckedIdList, 'cartItemIds');
  const BASE_URL = `${currentServer}/total-cart-price`;

  const { data: payments, refreshQuery } = useGetQuery<Payments>(`${BASE_URL}?${urlParams}`, {
    Authorization: `Basic ${btoa(USER)}`,
  });

  useEffect(() => {
    const updatedUrlParams = getUrlParams(cartCheckedIdList, 'cartItemIds');

    refreshQuery(`${BASE_URL}?${updatedUrlParams}`);
  }, [cartList]);

  return { payments };
}

export default usePayments;
