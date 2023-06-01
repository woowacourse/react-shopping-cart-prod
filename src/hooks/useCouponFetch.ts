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
  } = useQuery<IssuableCouponType[]>(
    'allCoupon',
    async () => {
      const res = await fetch(`${serverURL}/coupons`, {
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

  const fetchUserCouponData = async () => {
    const res = await fetch(`${serverURL}/users/coupons`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${base64}`,
      },
    });
    const data = await res.json();
    return data;
  };

  const { data: userCoupon, refetch: userCouponRefetch } = useQuery<CouponType[]>(
    'userCoupon',
    fetchUserCouponData,
    {
      onError: (e) => {
        console.log(e);
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
      onError: (e) => {
        console.log(e);
      },
    },
  );

  const addCouponAPI = (body?: object) => {
    fetchAddCouponData.mutate({ body });
  };
  return { allCoupon, isFetching, addCouponAPI, userCoupon };
};

export default useCouponFetch;
