import { selector } from 'recoil';

import { CouponType } from '@Types/index';

import { fetchData } from '@Utils/api';

import myCouponState from '@Atoms/myCouponState';
import serverState from '@Atoms/serverState';

import { FETCH_METHOD, FETCH_URL } from '@Constants/servers';

const allCouponState = selector({
  key: 'allCouponState',

  get: async ({ get }) => {
    const server = get(serverState);
    const myCoupon = get(myCouponState);
    const allCoupon = await fetchData<CouponType[]>({ url: FETCH_URL.allCoupon, method: FETCH_METHOD.GET, server });

    const myCouponIds = myCoupon.map((coupon) => coupon.id);

    return allCoupon.filter((coupon) => !myCouponIds.includes(coupon.id));
  },
});

export default allCouponState;
