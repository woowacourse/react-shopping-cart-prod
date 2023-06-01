import { ChangeEventHandler, useState } from 'react';
import { useRecoilValue } from 'recoil';

import {
  couponOptionSelector,
  targetCouponPriceSelector,
} from '../states/coupon';

const useCoupons = () => {
  const [targetCouponId, setTargetCouponId] = useState<number | null>(null);

  const couponOptions = useRecoilValue(couponOptionSelector);
  const targetCouponPrice = useRecoilValue(
    targetCouponPriceSelector(targetCouponId)
  );

  const changeTargetCoupon: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setTargetCouponId(Number(event.currentTarget.value));
  };

  return { couponOptions, targetCouponPrice, changeTargetCoupon };
};

export default useCoupons;
