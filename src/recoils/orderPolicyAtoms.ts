import { selector, useRecoilValue } from 'recoil';
import { fetchAPI } from '@api/fetchAPI';

import type { OrderPolicy } from '../types';

export const orderPolicySelector = selector<OrderPolicy>({
  key: 'orderPolicySelector',
  get: async () => {
    const orderPolicy = await fetchAPI('/order-policy');

    return orderPolicy;
  },
});

export const useFetchOrderPolicy = () => useRecoilValue(orderPolicySelector);
