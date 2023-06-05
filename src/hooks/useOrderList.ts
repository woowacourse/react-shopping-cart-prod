/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import fetchData from 'src/api';
import { USER } from 'src/constants';
import { $CurrentServerUrl } from 'src/recoil/atom';
import { Order } from 'src/types';
import useFetch from './useFetch';

function useOrderList() {
  const currentServer = useRecoilValue($CurrentServerUrl);

  const { result: orderList, refreshFetch } = useFetch({
    fetch: fetchData<Order[]>,
    arg: {
      url: `${currentServer}/orders/`,
      options: {
        headers: {
          Authorization: `Basic ${btoa(USER)}`,
          'Content-Type': 'application/json',
        },
      },
    },
    key: `orders`,
    suspense: true,
  });

  useEffect(() => {
    refreshFetch({
      url: `${currentServer}/orders/`,
      options: {
        headers: {
          Authorization: `Basic ${btoa(USER)}`,
          'Content-Type': 'application/json',
        },
      },
    });
  }, [currentServer]);

  return { orderList };
}

export default useOrderList;
