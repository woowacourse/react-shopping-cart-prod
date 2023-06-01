import { fetchGet } from '@utils/fetchUtils';
import { ServerName, getCouponPath } from '@constants/serverUrlConstants';
import { ServerCouponType } from '@type/couponType';
import { couponApiWrapper } from './coupon';

export const getCoupon = async (serverName: ServerName) => {
  const serverCoupon = await fetchGet<ServerCouponType[]>(getCouponPath(serverName));
  const clientCoupon = couponApiWrapper(serverCoupon);

  return clientCoupon;
};
