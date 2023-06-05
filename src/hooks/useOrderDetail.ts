/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import fetchData from 'src/api';
import { USER } from 'src/constants';
import { $CurrentServerUrl } from 'src/recoil/atom';
import { OrderDetail } from 'src/types';
import useFetch from './useFetch';

interface UseOrderDetailProps {
  orderId: string | null;
}

function useOrderDetail({ orderId }: UseOrderDetailProps) {
  const currentServer = useRecoilValue($CurrentServerUrl);

  const { result: orderDetailData, refreshFetch } = useFetch({
    fetch: fetchData<OrderDetail>,
    arg: {
      url: `${currentServer}/orders/${orderId}`,
      options: {
        headers: {
          Authorization: `Basic ${btoa(USER)}`,
          'Content-Type': 'application/json',
        },
      },
    },
    key: `orders/${orderId}`,
    suspense: true,
  });

  useEffect(() => {
    refreshFetch({
      url: `${currentServer}/orders/${orderId}`,
      options: {
        headers: {
          Authorization: `Basic ${btoa(USER)}`,
          'Content-Type': 'application/json',
        },
      },
    });
  }, [currentServer]);

  return { orderDetailData };
}

export default useOrderDetail;
