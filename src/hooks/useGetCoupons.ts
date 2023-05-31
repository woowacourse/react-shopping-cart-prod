import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { serverNameState } from '../states/serverName';
import { Coupon } from '../types/coupon';
import fetchApis from '../apis/fetchApis';

export const useGetCoupons = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const serverName = useRecoilValue(serverNameState);

  useEffect(() => {
    const { getData } = fetchApis(serverName);
    const getCoupons = async () => {
      try {
        const data = await getData<Coupon[]>('/coupons');
        console.log(data);
        setCoupons(data);
      } catch {
        setCoupons([]);
      }
    };

    getCoupons();
  }, [serverName]);

  return coupons;
};
