import { useRecoilState } from 'recoil';

import { couponListState } from './../store/coupon';

export const useCoupon = () => {
  const [couponList, setCouponList] = useRecoilState(couponListState);

  const selectCoupon = (id: number) => {
    const checkedCoupon = couponList.map((coupon) => {
      return coupon.couponId === id
        ? {
            ...coupon,
            isChecked: true,
          }
        : {
            ...coupon,
            isChecked: false,
          };
    });

    setCouponList(checkedCoupon);
  };

  const cancelSelectCoupon = () => {
    const notCheckedAllCoupon = couponList.map((coupon) => ({
      ...coupon,
      isChecked: false,
    }));

    setCouponList(notCheckedAllCoupon);
  };

  const publishCoupon = (id: number) => {
    const publishedCoupons = couponList.map((coupon) => {
      return coupon.couponId === id
        ? {
            ...coupon,
            isPublished: true,
          }
        : {
            ...coupon,
          };
    });

    setCouponList(publishedCoupons);
  };

  return { couponList, selectCoupon, cancelSelectCoupon, publishCoupon };
};
