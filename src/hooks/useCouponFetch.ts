import { useMutation, useQuery } from 'react-query';
import { CouponType, IssuableCouponType } from '../types/types';

const useCouponFetch = () => {
  const {
    data: allCoupon,
    refetch: issuableRefetch,
    isFetching,
  } = useQuery<IssuableCouponType[]>(
    'allCoupon',
    async () => {
      const res = await fetch(`/coupons`, {
        method: 'GET',
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
    const res = await fetch(`/users/coupons`, {
      method: 'GET',
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
      const res = await fetch(`/users/coupons`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
  return { allCoupon, isFetching, addCouponAPI, userCoupon, userCouponRefetch };
};

export default useCouponFetch;
