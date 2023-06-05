import { selector, useRecoilValue } from 'recoil';
import { fetchAPI } from '@api/fetchAPI';

import type { OrderPolicy } from '../types';
import { baseApiUrlSelector } from './baseApiUrlAtoms';

export const orderPolicySelector = selector<OrderPolicy>({
  key: 'orderPolicySelector',
  get: async ({ get }) => {
    const baseApiUrl = get(baseApiUrlSelector);
    const orderPolicy = await fetchAPI(`${baseApiUrl}/order-policy`);

    return orderPolicy;
  },
});

export const useFetchOrderPolicy = () => useRecoilValue(orderPolicySelector);
