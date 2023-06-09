import { fetchGet } from '@utils/fetchUtils';
import { ServerName, getCouponPath } from '@constants/serverUrlConstants';
import { UserInformationType } from '@constants/userConstant';
import { ServerCouponType } from '@type/couponType';
import { couponApiWrapper } from './coupon';

interface GetCouponProps {
  serverName: ServerName;
  userInfo: UserInformationType;
}

export const getCouponApi = async ({ serverName, userInfo }: GetCouponProps) => {
  const serverCoupon = await fetchGet<ServerCouponType[]>(getCouponPath(serverName), {
    email: userInfo.email,
    password: userInfo.password,
  });
  const clientCoupon = couponApiWrapper(serverCoupon);

  return clientCoupon;
};
