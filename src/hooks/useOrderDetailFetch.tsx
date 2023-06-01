import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { OrderDetailType } from '../types/types';
import { base64 } from '../service/apiURL';
import { useRecoilValue } from 'recoil';
import { serverState } from '../service/atom';

const useOrderDetailFetch = (orderId: number) => {
  const navigation = useNavigate();
  const serverURL = useRecoilValue(serverState);

  const { data: orderDetailData, refetch } = useQuery<OrderDetailType>(
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
      return data;
    },
    {
      onError: (e) => {
        console.log(e);
      },
    },
  );

  const fetchOrderData = useMutation(
    async ({ method }: { method: 'DELETE' | 'PATCH' }) => {
      const url = method == 'DELETE' ? `${orderId}` : `${orderId}/confirm`;
      await fetch(`${serverURL}/orders/${url}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${base64}`,
        },
      });

      if (method == 'DELETE') navigation('/orders');
    },
    {
      onSuccess: () => {
        refetch();
      },
    },
  );

  const deleteOrderDataAPI = () => {
    fetchOrderData.mutate({ method: 'DELETE' });
  };

  const confirmOrderDataAPI = () => {
    fetchOrderData.mutate({ method: 'PATCH' });
  };

  return { orderDetailData, deleteOrderDataAPI, confirmOrderDataAPI, refetch };
};

export default useOrderDetailFetch;
