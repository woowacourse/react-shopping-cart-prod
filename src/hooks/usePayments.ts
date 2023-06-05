/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-syntax */

import { Payments } from 'src/types';
import { useRecoilValue } from 'recoil';
import { $CartList, $CheckedCartIdList, $CurrentServerUrl } from 'src/recoil/atom';
import { USER } from 'src/constants';
import { useEffect } from 'react';
import fetchData from 'src/api';
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
  const BASE_URL = `${currentServer}/total-cart-price`;

  const { result: payments, refreshFetch } = useFetch({
    fetch: fetchData<Payments>,
    arg: {
      url: `${BASE_URL}?${urlParams}`,
      options: {
        headers: {
          Authorization: `Basic ${btoa(USER)}`,
        },
      },
    },
    key: 'payments',
  });

  useEffect(() => {
    const updatedUrlParams = getUrlParams(cartCheckedIdList, 'cartItemIds');

    if (updatedUrlParams.length > 0) {
      refreshFetch({
        url: `${BASE_URL}?${updatedUrlParams}`,
        options: {
          headers: {
            Authorization: `Basic ${btoa(USER)}`,
          },
        },
      });
    }
  }, [cartList, cartCheckedIdList]);

  return { payments };
}

export default usePayments;
