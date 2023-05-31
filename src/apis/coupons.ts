import { authFetchQuery } from './api';

interface Coupon {
  id: number;
  name: string;
  ownerMemberId: number;
  discountType: 'RATE' | 'FIX';
  target: 'ALL' | 'SPECIFIC';
  value: number;
}

interface SpecificCoupon extends Coupon {
  targetProductId: number;
}

interface FetchCouponsRes {
  allCoupons: Coupon[];
  specificCoupons: SpecificCoupon[];
}

export const fetchCoupons = async () => {
  return authFetchQuery.get<FetchCouponsRes>('/coupons');
};
