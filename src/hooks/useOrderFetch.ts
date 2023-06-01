import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { OrderListType } from '../types/types';
import { base64 } from '../service/apiURL';
import { useRecoilValue } from 'recoil';
import { serverState } from '../service/atom';

export const useOrderFetch = () => {
  const serverURL = useRecoilValue(serverState);

  const {
    data: orderListData,
    isError,
    isFetching,
  } = useQuery<OrderListType[]>(
    'orderList',
    async () => {
      const res = await fetch(`${serverURL}/orders`, {
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

  return { orderListData, isError, isFetching };
};

export const useAddOrderFetch = () => {
  const navigation = useNavigate();
  const serverURL = useRecoilValue(serverState);
  const queryClient = useQueryClient();

  const fetchAddOrderData = useMutation(
    async ({ body }: { body?: object }) => {
      const res = await fetch(`${serverURL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${base64}`,
        },
        body: JSON.stringify(body),
      });
      return res;
    },
    {
      onSuccess: async (res) => {
        queryClient.refetchQueries({ queryKey: ['cart'] });
        queryClient.refetchQueries({ queryKey: ['userCoupon'] });
        queryClient.refetchQueries({ queryKey: ['orderList'] });
        const orderLocation = res.headers.get('Location');
        navigation(`${orderLocation}`);
      },
      onError: (e) => {
        console.log(e);
      },
    },
  );

  const addOrderDataAPI = (body?: object) => {
    fetchAddOrderData.mutate({ body });
  };

  return {
    addOrderDataAPI,
  };
};
