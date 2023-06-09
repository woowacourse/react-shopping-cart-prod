import { atom, selector } from 'recoil';

import { CouponType } from '@Types/index';

import { fetchData } from '@Utils/api';

import { FETCH_METHOD, FETCH_URL } from '@Constants/servers';

import serverState from './serverState';

const totalCouponSelector = selector({
  key: 'totalCouponSelector',

  get: ({ get }) => {
    const server = get(serverState);

    return fetchData<CouponType[]>({ url: FETCH_URL.totalCoupon, method: FETCH_METHOD.GET, server });
  },
});

const totalCouponState = atom<CouponType[]>({
  key: 'totalCouponState',
  default: totalCouponSelector,
});

export default totalCouponState;
