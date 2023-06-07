/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-syntax */

import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import fetchData from 'src/api';
import { API_URL, USER } from 'src/constants';
import { $CartList, $CheckedCartIdList, $CurrentServerUrl } from 'src/recoil/atom';
import { Payments } from 'src/types';
import useFetch from './useFetch';

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
  const BASE_URL = `${currentServer}${API_URL.TOTAL_CART_PRICE}`;

  const { result: payments, refreshFetch } = useFetch({
    fetch: fetchData<Payments>,
    arg: {
      url: `${BASE_URL}?${urlParams}`,
      options: {
        headers: {
          Authorization: `Basic ${btoa(USER)}`,
          'Content-Type': 'application/json',
        },
      },
    },
    key: 'payments',
  });

  useEffect(() => {
    const updatedUrlParams = getUrlParams(cartCheckedIdList, 'cartItemIds');

    if (cartCheckedIdList.length > 0) {
      refreshFetch({
        url: `${BASE_URL}?${updatedUrlParams}`,
        options: {
          headers: {
            Authorization: `Basic ${btoa(USER)}`,
            'Content-Type': 'application/json',
          },
        },
      });
    }
  }, [cartList, cartCheckedIdList]);

  return { payments };
}

export default usePayments;
