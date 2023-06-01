import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { OrderDetailType } from '../types/types';

const useOrderDetailFetch = (orderId: number) => {
  const navigation = useNavigate();

  const { data: orderDetailData, refetch } = useQuery<OrderDetailType>(
    'orderDetail',
    async () => {
      const res = await fetch(`/orders/${orderId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
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
      await fetch(`/orders/${url}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
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
