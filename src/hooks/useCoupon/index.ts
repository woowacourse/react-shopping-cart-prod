import { useRecoilValue, useSetRecoilState } from 'recoil';

import { CouponType } from '@Types/index';

import { fetchData } from '@Utils/api';

import myCouponState from '@Atoms/myCouponState';
import serverState from '@Atoms/serverState';

import { FETCH_METHOD, FETCH_URL } from '@Constants/servers';

const useCoupon = () => {
  const server = useRecoilValue(serverState);
  const setMyCoupons = useSetRecoilState(myCouponState);

  const deleteMyCoupon = async (couponId: number) => {
    await fetchData({ url: `${FETCH_URL.allCoupon}/${couponId}`, method: FETCH_METHOD.DELETE, server });

    renewMyCoupon();
  };

  const renewMyCoupon = async () => {
    const newMyCoupons = await fetchData<CouponType[]>({ url: FETCH_URL.myCoupon, method: FETCH_METHOD.GET, server });
    setMyCoupons(newMyCoupons);
  };

  return { deleteMyCoupon, renewMyCoupon };
};

export default useCoupon;
