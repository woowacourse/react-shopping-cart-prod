import { SERVER, ServerKey } from '../constants/server';
import type { Coupon } from '../types/coupon';
import { getData } from './utils';

const couponApis = (serverName: ServerKey) => {
  const url = `${SERVER[serverName].url}/coupons`;

  const base64 = btoa(
    SERVER[serverName].id + ':' + SERVER[serverName].password
  );

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Basic ${base64}`,
  };

  const getCoupons = () => {
    return getData<Coupon[]>({ url, headers });
  };

  return { getCoupons };
};

export default couponApis;
