import { useCallback } from 'react';
import { useRecoilState } from 'recoil';

import { USER_TOKEN } from '../constants';
import { couponListState } from '../store/coupon';

const useCoupon = () => {
  const [couponList, setCouponList] = useRecoilState(couponListState);

  const fetchCouponList = useCallback(async () => {
    const response = await fetch('/coupons', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${USER_TOKEN}`,
      },
    });

    const result = await response.json();
    setCouponList(result);
    return result;
  }, [setCouponList]);

  const publishCoupon = useCallback(
    async (couponId: number) => {
      const response = await fetch('/coupons/1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${USER_TOKEN}`,
        },
      });

      if (response.ok) {
        setCouponList(
          couponList.map((item) => {
            if (item.couponId === couponId) {
              return {
                ...item,
                isPublished: true,
              };
            }
            return item;
          })
        );
      }
    },
    [couponList, setCouponList]
  );

  return { fetchCouponList, publishCoupon };
};

export default useCoupon;
