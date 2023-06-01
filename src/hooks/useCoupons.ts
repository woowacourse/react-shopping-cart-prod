import type { ChangeEventHandler } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { couponOptionSelector, targetCouponIdState } from '../states/coupon';

const useCoupons = () => {
  const couponOptions = useRecoilValue(couponOptionSelector);

  const setTargetCouponId = useSetRecoilState(targetCouponIdState);

  const changeTargetCoupon: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setTargetCouponId(Number(event.currentTarget.value));
  };

  return { couponOptions, changeTargetCoupon };
};

export default useCoupons;
