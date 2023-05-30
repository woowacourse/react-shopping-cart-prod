import { useMutation, useQuery } from 'react-query';
import { CouponType, IssuableCouponType } from '../types/types';

const useCouponFetch = () => {
  const fetchAllCouponData = async () => {
    const res = await fetch(`/coupons`, {
      method: 'GET',
    });
    const data = await res.json();
    return data;
  };

  const { data: allCoupon } = useQuery<IssuableCouponType[]>('allCoupon', fetchAllCouponData, {
    onError: (e) => {
      console.log(e);
    },
  });

  const fetchUserCouponData = async () => {
    const res = await fetch(`/users/coupons`, {
      method: 'GET',
    });
    const data = await res.json();
    return data;
  };

  const { data: userCoupon, refetch } = useQuery<CouponType[]>('userCoupon', fetchUserCouponData, {
    onError: (e) => {
      console.log(e);
    },
  });

  const fetchAddCoupon = useMutation(
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
        refetch();
      },
      onError: (e) => {
        console.log(e);
      },
    },
  );

  const addCouponAPI = (body?: object) => {
    fetchAddCoupon.mutate({ body });
  };
  return { allCoupon, addCouponAPI, userCoupon };
};

export default useCouponFetch;
