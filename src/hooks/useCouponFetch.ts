import { useQuery } from 'react-query';
import { IssuableCouponType } from '../types/types';

const useCouponFetch = () => {
  const fetchAllCouponData = async () => {
    const res = await fetch(`/coupons`, {
      method: 'GET',
    });
    const data = await res.json();
    return data;
  };

  const { data: allCoupon, refetch } = useQuery<IssuableCouponType[]>(
    'coupons',
    fetchAllCouponData,
    {
      onError: (e) => {
        console.log(e);
      },
    },
  );

  return { allCoupon };
};

export default useCouponFetch;
