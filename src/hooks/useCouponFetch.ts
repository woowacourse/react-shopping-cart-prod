import { useMutation, useQuery } from 'react-query';
import { CouponType, IssuableCouponType } from '../types/types';
import { base64 } from '../service/apiURL';
import { useRecoilValue } from 'recoil';
import { serverState } from '../service/atom';

const useCouponFetch = () => {
  const serverURL = useRecoilValue(serverState);

  const {
    data: allCoupon,
    refetch: issuableRefetch,
    isFetching,
  } = useQuery<IssuableCouponType[]>('allCoupon', async () => {
    const res = await fetch(`${serverURL}/coupons`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${base64}`,
      },
    });
    const data = await res.json();
    return data;
  });

  const { data: userCoupon, refetch: userCouponRefetch } = useQuery<CouponType[]>(
    'userCoupon',
    async () => {
      const res = await fetch(`${serverURL}/users/coupons`, {
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
      onError: () => {
        alert('오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      },
    },
  );

  const fetchAddCouponData = useMutation(
    async ({ body }: { body?: object }) => {
      const res = await fetch(`${serverURL}/users/coupons`, {
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
      onSuccess: () => {
        userCouponRefetch();
        issuableRefetch();
      },
      onError: () => {
        alert('오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      },
    },
  );

  const addCouponAPI = (body?: object) => {
    fetchAddCouponData.mutate({ body });
  };

  return { allCoupon, isFetching, addCouponAPI, userCoupon };
};

export default useCouponFetch;
