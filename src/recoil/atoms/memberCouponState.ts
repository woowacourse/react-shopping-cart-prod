import { atom, selector } from 'recoil';

import { MemberCouponType } from '@Types/index';

import { fetchData } from '@Utils/api';

import { FETCH_METHOD, FETCH_URL } from '@Constants/servers';

import serverState from './serverState';

const memberCouponSelector = selector({
  key: 'memberCouponSelector',

  get: ({ get }) => {
    const server = get(serverState);

    return fetchData<MemberCouponType[]>({ url: FETCH_URL.memberCoupon, method: FETCH_METHOD.GET, server });
  },
});

const memberCouponState = atom<MemberCouponType[]>({
  key: 'memberCouponState',
  default: memberCouponSelector,
});

export default memberCouponState;
