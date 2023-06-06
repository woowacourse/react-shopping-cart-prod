import { ChangeEvent } from 'react';
import { useSetRecoilState } from 'recoil';

import { toastState } from '../states/toast/atom';
import { Coupon } from '../types/coupon';
import { DEFAULT_COUPON_NAME } from '../constants/coupon';
import { TOAST_STATE } from '../constants/toast';

export const useGetSelectedCoupon = () => {
  const setToastState = useSetRecoilState(toastState);

  const getSelectedCoupon = (
    event: ChangeEvent<HTMLSelectElement>,
    coupons: Coupon[]
  ) => {
    const selectedCouponName = event.target.value;

    if (selectedCouponName === DEFAULT_COUPON_NAME) return null;

    const selectedCoupon = coupons.find(
      coupon => coupon.name === selectedCouponName
    );
    if (!selectedCoupon) {
      setToastState({ ...TOAST_STATE.failedSelectCoupon });
      return null;
    }
    setToastState({ ...TOAST_STATE.successSelectCoupon });

    return selectedCoupon;
  };

  return getSelectedCoupon;
};
