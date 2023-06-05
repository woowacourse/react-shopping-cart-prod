import { useMutation, useQuery, useQueryClient } from 'react-query';
import { OrderType } from '../types/types';
import { base64 } from '../service/apiURL';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { appliedCouponState, checkCartListState, serverState } from '../service/atom';

const useOrder = () => {
  const serverURL = useRecoilValue(serverState);

  const resetCheckList = useResetRecoilState(checkCartListState);
  const resetAppliedCoupon = useResetRecoilState(appliedCouponState);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: orderData,
    isFetching,
    isError,
  } = useQuery<OrderType[]>('orders', async () => {
    const res = await fetch(`${serverURL}/orders`, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${base64}`,
      },
    });
    const resData = await res.json();

    if (resData.status && resData.status !== 200) {
      throw new Error('server error');
    }

    return resData;
  });

  const orderAPI = useMutation(
    async ({ selectCartIds, couponId }: { selectCartIds: number[]; couponId?: number }) =>
      await fetch(`${serverURL}/orders`, {
        method: 'POST',
        body: JSON.stringify({ selectCartIds, couponId: couponId ?? null }),
        headers: {
          Authorization: `Basic ${base64}`,
          'Content-Type': 'application/json',
        },
      }),
    {
      onSuccess: (res) => {
        resetCheckList();
        resetAppliedCoupon();

        const orderId = Number(res.headers.get('Location')?.split('/')[2]);
        queryClient.refetchQueries(['cart']);
        queryClient.refetchQueries(['my-coupons']);
        queryClient.refetchQueries(['orders']);

        alert('주문이 완료되었습니다.');

        if (orderId) {
          navigate(`/order/${orderId}`);
        }
      },
    },
  );

  return {
    orderData,
    orderAPI,
    isFetching,
    isError,
  };
};

export default useOrder;
