import { useMutation, useQuery, useQueryClient } from 'react-query';
import { OrderDetailType } from '../types/types';
import { base64 } from '../service/apiURL';
import { useRecoilValue } from 'recoil';
import { serverState } from '../service/atom';
import { useNavigate } from 'react-router-dom';

const useOrderDetail = (orderId?: string) => {
  const serverURL = useRecoilValue(serverState);
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const {
    data: orderDetailData,
    isFetching,
    refetch,
  } = useQuery<OrderDetailType>(`order-${orderId}`, async () => {
    const res = await fetch(`${serverURL}/orders/${orderId}`, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${base64}`,
      },
    });
    const resData = await res.json();
    return resData;
  });

  const confirmOrderAPI = useMutation(
    () =>
      fetch(`${serverURL}/orders/${orderId}/confirm`, {
        method: 'PATCH',
        headers: {
          Authorization: `Basic ${base64}`,
        },
      }),
    {
      onSuccess: () => {
        refetch();
        queryClient.refetchQueries(['orders']);
      },
    },
  );

  const deleteOrderAPI = useMutation(
    () =>
      fetch(`${serverURL}/orders/${orderId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Basic ${base64}`,
        },
      }),
    {
      onSuccess: () => {
        alert('삭제되었습니다.');
        queryClient.refetchQueries(['orders']);
        navigate('/order');
      },
    },
  );

  return {
    orderDetailData,
    confirmOrderAPI,
    deleteOrderAPI,
    isFetching,
  };
};

export default useOrderDetail;
