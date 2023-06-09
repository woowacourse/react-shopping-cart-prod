import { SERVER, ServerKey } from '../constants/server';
import type { Coupon } from '../types/coupon';
import { fetchData } from './utils';

const couponApis = (serverName: ServerKey) => {
  const url = `${SERVER[serverName].url}/coupons`;

  const base64 = btoa(
    SERVER[serverName].id + ':' + SERVER[serverName].password
  );

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Basic ${base64}`,
  };

  const getCoupons = async () => {
    const response = await fetchData({ url, method: 'GET', headers });
    const coupons: Coupon[] = await response.json();
    return coupons;
  };

  return { getCoupons };
};

export default couponApis;
