import { serverState } from '../service/atom';
import { IssuableCouponType } from '../types/types';
import { useRecoilValue } from 'recoil';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { base64 } from '../service/apiURL';

const useCoupon = (type: 'my' | 'issuable') => {
  const serverURL = useRecoilValue(serverState);
  const queryClient = useQueryClient();

  const {
    data: couponData,
    isFetching,
    isError,
    refetch,
  } = useQuery<IssuableCouponType[]>(`${type}-coupons`, async () => {
    const res = await fetch(`${serverURL}${type === 'my' ? '/users/coupons' : '/coupons'}`, {
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

  const issueCouponAPI = useMutation(
    async (couponId: number) =>
      await fetch(`${serverURL}/users/coupons`, {
        method: 'POST',
        body: JSON.stringify({ id: couponId }),
        headers: {
          Authorization: `Basic ${base64}`,
          'Content-Type': 'application/json',
        },
      }),
    {
      onSuccess: () => {
        refetch();
        queryClient.refetchQueries(['issuable-coupons']);
        alert('쿠폰이 발급되었습니다.');
      },
    },
  );

  return {
    couponData,
    issueCouponAPI,
    isError,
    isFetching,
  };
};

export default useCoupon;
