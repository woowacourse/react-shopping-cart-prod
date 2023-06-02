import { useState } from 'react';

const useCoupons = (couponIds: number[]) => {
  if (!couponIds) return null;

  const initialState = couponIds.reduce(
    (obj, couponId) => ({ ...obj, [couponId]: false }),
    {}
  );
  const [couponsState, setCouponState] = useState(initialState);

  const checkCoupon = (id: number) => {
    setCouponState((prev) => ({ ...prev, [id]: true }));
  };

  const unCheckCoupon = (id: number) => {
    setCouponState((prev) => ({ ...prev, [id]: false }));
  };

  return { couponsState, checkCoupon, unCheckCoupon };
};

export default useCoupons;
