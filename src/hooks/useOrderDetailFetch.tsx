import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { OrderDetailType } from '../types/types';
import { base64 } from '../service/apiURL';
import { useRecoilValue } from 'recoil';
import { serverState } from '../service/atom';
import { useEffect } from 'react';

const useOrderDetailFetch = (orderId: number) => {
  const navigation = useNavigate();
  const serverURL = useRecoilValue(serverState);
  const queryClient = useQueryClient();

  const {
    data: orderDetailData,
    refetch,
    isError,
    isFetching,
  } = useQuery<OrderDetailType>(
    'orderDetail',
    async () => {
      const res = await fetch(`${serverURL}/orders/${orderId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${base64}`,
        },
      });

      const data = await res.json();

      if (data.status && data.status !== 200) throw new Error();
      return data;
    },

    {
      onError: (e) => {
        console.log(e);
      },
    },
  );

  useEffect(() => {
    refetch();
  }, [orderId]);

  const fetchOrderPatch = useMutation(
    async () => {
      await fetch(`${serverURL}/orders/${orderId}/confirm`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${base64}`,
        },
      });
    },
    {
      onSuccess: () => {
        refetch();
      },
    },
  );

  const fetchOrderDelete = useMutation(
    async () => {
      await fetch(`${serverURL}/orders/${orderId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${base64}`,
        },
      });

      navigation('/orders');
    },
    {
      onSuccess: () => {
        queryClient.refetchQueries({ queryKey: ['orderList'] });
      },
    },
  );

  const deleteOrderDataAPI = () => {
    fetchOrderDelete.mutate();
  };

  const confirmOrderDataAPI = () => {
    fetchOrderPatch.mutate();
  };

  return { orderDetailData, deleteOrderDataAPI, confirmOrderDataAPI, isError, isFetching };
};

export default useOrderDetailFetch;
