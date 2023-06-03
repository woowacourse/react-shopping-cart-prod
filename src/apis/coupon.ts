import { waitFor, WaitForOptions } from '../utils/waitFor';
import { AllCoupon, SpecificCoupon } from './../types/coupon';
import { authFetchQuery } from './api';

export interface FetchCouponsRes {
  allCoupons: AllCoupon[];
  specificCoupons: SpecificCoupon[];
}

export const fetchCoupons = async (
  options?: WaitForOptions<FetchCouponsRes>
) => {
  const promise = authFetchQuery.get<FetchCouponsRes>(`/coupons`);
  const { data } = await waitFor(promise, options);

  return data;
};
