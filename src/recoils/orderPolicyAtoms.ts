import { selector, useRecoilValue } from 'recoil';
import { fetchAPI } from '@api/fetchAPI';

import { baseApiUrlSelector } from './baseApiUrlAtoms';

import { FETCH_URL, RECOIL_KEY } from '@constants/index';
import type { OrderPolicy } from '../types';

export const orderPolicySelector = selector<OrderPolicy>({
  key: RECOIL_KEY.ORDER_POLICY_SELECTOR,
  get: async ({ get }) => {
    const baseApiUrl = get(baseApiUrlSelector);
    const orderPolicy = await fetchAPI(baseApiUrl + FETCH_URL.ORDER_POLICY);

    return orderPolicy;
  },
});

export const useFetchOrderPolicy = () => useRecoilValue(orderPolicySelector);
