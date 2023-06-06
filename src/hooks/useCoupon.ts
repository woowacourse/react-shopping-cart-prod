import { useEffect, useState } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import { useRecoilValue } from 'recoil';
import { selectedHostState } from '../recoil/atoms';
import { Coupons, FixedCouponInfo, RateCouponInfo } from '../types';
import { COUPON_BASE_URL } from '../constants';
import APIHandler from '../api/APIHandler';

export const useCoupon = () => {
  const { showBoundary } = useErrorBoundary();
  const host = useRecoilValue(selectedHostState);
  const COUPON_URL = `${host}${COUPON_BASE_URL}`;
  const [rateCoupons, setRateCoupons] = useState<RateCouponInfo[]>([]);
  const [fixedCoupons, setFixedCoupons] = useState<FixedCouponInfo[]>([]);

  useEffect(() => {
    const setFetchedCouponList = async () => {
      const { rateCoupons: fetchedRateCoupons, fixedCoupons: fetchedFixedCoupons } =
        await getCouponList();
      setRateCoupons(fetchedRateCoupons);
      setFixedCoupons(fetchedFixedCoupons);
    };

    setFetchedCouponList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [host]);

  const getCouponList = async () => {
    try {
      const responseResult = await APIHandler.get<Coupons>(COUPON_URL);

      if (responseResult.statusCode !== 200) throw new Error(responseResult.errorMessage);
      if (responseResult.result === undefined) throw new Error(responseResult.errorMessage);

      const { rateCoupon, fixedCoupon } = responseResult.result;

      return { rateCoupons: rateCoupon, fixedCoupons: fixedCoupon };
    } catch (error) {
      showBoundary(error);

      return {
        rateCoupons: [],
        fixedCoupons: [],
      };
    }
  };

  return { rateCoupons, fixedCoupons };
};
