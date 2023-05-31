import { Coupon, SpecificCoupon } from '../types/coupon';
import { authFetchQuery } from './api';

interface FetchCouponsRes {
  allCoupons: Coupon[];
  specificCoupons: SpecificCoupon[];
}

export const fetchCoupons = async () => {
  return authFetchQuery.get<FetchCouponsRes>('/coupons');
};
