import { ChangeEventHandler, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { couponOptionSelector } from '../../states/coupon';

export const useCoupons = () => {
  const [currentCouponId, setCurrentCouponId] = useState<number>();
  const couponOptions = useRecoilValue(couponOptionSelector);

  const changeTargetCoupon: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setCurrentCouponId(Number(event.currentTarget.value));
  };

  return { couponOptions, currentCouponId, changeTargetCoupon };
};
