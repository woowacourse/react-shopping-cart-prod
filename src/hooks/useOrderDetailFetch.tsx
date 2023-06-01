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

  const fetchOrderDelete = useMutation(async () => {
    await fetch(`${serverURL}/orders/${orderId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${base64}`,
      },
    });

    navigation('/orders');
  });

  const deleteOrderDataAPI = () => {
    fetchOrderDelete.mutate();
  };

  const confirmOrderDataAPI = () => {
    fetchOrderPatch.mutate();
  };

  return { orderDetailData, deleteOrderDataAPI, confirmOrderDataAPI, refetch };
};

export default useOrderDetailFetch;
