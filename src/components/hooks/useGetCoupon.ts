import { useSetRecoilState } from 'recoil';
import * as api from '../../api';
import { couponState } from '../../atom/coupon';
import { CouponInfo, ServerNameType } from '../../types';
import useToast from './useToast';
import { API_ERROR_MESSAGE } from '../../constants';

export const useGetCoupon = () => {
  const setCoupons = useSetRecoilState(couponState);
  const { showToast } = useToast();

  const getCouponThroughApi = (
    serverName: ServerNameType,
    loginCredential: string,
    isCouponPage?: boolean,
    useStateCouponSetter?: React.Dispatch<React.SetStateAction<CouponInfo[]>>
  ) => {
    api
      .getCoupon<CouponInfo[]>(serverName, loginCredential)
      .then((coupons) => {
        if (isCouponPage && useStateCouponSetter) useStateCouponSetter(coupons);
        setCoupons(coupons.filter((coupon) => !coupon.isUsed));
      })
      .catch((e: Error) => {
        if (e.name !== 'Error') {
          showToast('error', API_ERROR_MESSAGE.server);
          return;
        }

        showToast('error', e.message);
      });
  };

  return { getCouponThroughApi };
};
