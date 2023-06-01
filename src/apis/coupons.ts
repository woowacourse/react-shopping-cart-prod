import type { Coupon } from '../types/coupon';
import { getData } from './utils';

const couponApis = () => {
  const url = '/coupons';

  const getCoupons = () => {
    return getData<Coupon[]>({ url });
  };

  return { getCoupons };
};

export default couponApis;
