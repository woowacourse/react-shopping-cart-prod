import { authFetchQuery } from './api';
import type { FetchCouponsRes } from './api.type';

export const fetchCoupons = async () => {
  return authFetchQuery.get<FetchCouponsRes>('/coupons');
};
