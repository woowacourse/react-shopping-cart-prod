import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { selectedHostState } from '../recoil/atoms';
import { Coupons, FixedCouponInfo, RateCouponInfo } from '../types';
import { COUPON_BASE_URL } from '../constants';
import APIHandler from '../api/APIHandler';

export const useCoupon = () => {
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
    const responseResult = await APIHandler.get<Coupons>(COUPON_URL);

    if (responseResult.statusCode !== 200) console.error(responseResult.errorMessage);
    if (responseResult.result === undefined) {
      return {
        rateCoupons: [],
        fixedCoupons: [],
      };
    }

    const { rateCoupon, fixedCoupon } = responseResult.result;

    return { rateCoupons: rateCoupon, fixedCoupons: fixedCoupon };
  };

  return { rateCoupons, fixedCoupons };
};
