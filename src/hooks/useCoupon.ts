import { useCallback } from 'react';
import { useRecoilState } from 'recoil';

import { USER_TOKEN } from '../constants';
import { couponListState } from '../store/coupon';
import { CouponItemType, selectedCouponItemType } from '../types';

const useCoupon = () => {
  const [couponList, setCouponList] = useRecoilState(couponListState);

  const fetchCouponList = useCallback(async () => {
    const response = await fetch('/coupons', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${USER_TOKEN}`,
      },
    });

    const result = (await response.json()) as CouponItemType[];

    setCouponList(
      result.map((item) => {
        return {
          ...item,
          isSelected: false,
        };
      })
    );
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

  const fetchMyCoupon = useCallback(
    async (price: number) => {
      const response = await fetch('coupons/active?total=10000', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${USER_TOKEN}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        setCouponList(result);
        return result;
      }
    },
    [setCouponList]
  );

  const setCheckCoupon = useCallback(
    (couponId: number) => {
      const result = couponList.map((coupon) => {
        if (coupon.couponId === couponId) {
          return {
            ...coupon,
            isSelected: true,
          };
        }
        return coupon;
      }) as selectedCouponItemType[];

      setCouponList(result.filter((coupon) => coupon.couponId === couponId));
    },
    [couponList, setCouponList]
  );

  const resetCheckedCoupon = useCallback(() => {
    setCouponList([]);
  }, [setCouponList]);

  return { fetchCouponList, publishCoupon, fetchMyCoupon, setCheckCoupon, resetCheckedCoupon };
};

export default useCoupon;
