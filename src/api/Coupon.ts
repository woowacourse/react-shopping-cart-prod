import { USER_AUTH_TOKEN } from '../constant';
import type { CouponInfo } from '../types/coupon';
import type { ServerName } from '../types/server';
import ServerUtil from '../utils/ServerUrl';

const getPublicList = async (serverName: ServerName): Promise<CouponInfo[]> => {
  const url = ServerUtil.getCouponsUrl(serverName);

  const response = await fetch(url, {
    method: 'GET',
  });

  if (response.status !== 200) throw new Error('전체 쿠폰 조회에 실패했어요.');

  const { coupons }: { coupons: CouponInfo[] } = await response.json();

  return coupons;
};

const getUserList = async (serverName: ServerName): Promise<CouponInfo[]> => {
  const url = ServerUtil.getUserCouponsUrl(serverName);

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Basic ${USER_AUTH_TOKEN}`,
    },
  });

  if (response.status !== 200) throw new Error('전체 쿠폰 조회에 실패했어요.');

  const { coupons }: { coupons: CouponInfo[] } = await response.json();

  return coupons;
};

const download = async (serverName: ServerName, couponId: number) => {
  const url = ServerUtil.getUserCouponsUrl(serverName);

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${USER_AUTH_TOKEN}`,
    },
    body: JSON.stringify({ couponId }),
  });

  if (response.status === 400) throw new Error('이미 발급받은 쿠폰입니다!');
  if (response.status === 500) throw new Error('서버 문제로 쿠폰 발급에 실패했어요.');
  if (!response.ok) throw new Error('쿠폰 발급에 실패했어요');

  return response.ok;
};

const CouponApi = { getPublicList, getUserList, download };

export default CouponApi;
