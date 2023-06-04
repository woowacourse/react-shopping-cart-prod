import { selector } from 'recoil';
import serverState from '@recoil/server/serverState';
import userState from '@recoil/user/userState';
import { getCouponApi } from '@utils/coupon/fetchCoupon';
import { CouponType } from '@type/couponType';

export const getCouponListSelector = selector<CouponType[]>({
  key: 'getCouponListSelector',
  get: async ({ get }) => {
    const userInfo = get(userState);
    const serverName = get(serverState);
    const couponList = await getCouponApi({ serverName, userInfo });

    return couponList;
  },
  cachePolicy_UNSTABLE: { eviction: 'most-recent' },
});
