import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { COUPON_URL } from '../constants/url';
import { serverState } from '../recoil';
import { CouponItem } from '../types';
import { useFetchData } from './useFetchData';

export const useGetCouponList = () => {
  const server = useRecoilValue(serverState);
  const { api } = useFetchData();
  const [coupons, setCoupons] = useState<CouponItem[]>([]);

  useEffect(() => {
    api
      .get(`${server}${COUPON_URL}`, {
        Authorization: 'Basic YUBhLmNvbToxMjM0',
        'Content-Type': 'application/json',
      })
      .then((data) => {
        setCoupons(data);
      });
  }, [server]);

  return coupons;
};
