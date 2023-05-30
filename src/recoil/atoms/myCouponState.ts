import { atom, selector } from 'recoil';

import { MyCouponType } from '@Types/index';

import { fetchData } from '@Utils/api';

import { FETCH_METHOD, FETCH_URL } from '@Constants/servers';

import serverState from './serverState';

export const myCouponStateSelector = selector({
  key: 'myCouponStateSelector',

  get: ({ get }) => {
    const server = get(serverState);

    return fetchData<MyCouponType[]>({ url: FETCH_URL.myCoupon, method: FETCH_METHOD.GET, server });
  },
});

const myCouponState = atom<MyCouponType[]>({
  key: 'myCouponState',
  default: myCouponStateSelector,
});

export default myCouponState;
