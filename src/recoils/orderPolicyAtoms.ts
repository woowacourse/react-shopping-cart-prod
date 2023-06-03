import { selector, useRecoilValue } from 'recoil';
import { fetchData } from '@api/fetchData';

import type { OrderPolicy } from '../types';

export const orderPolicySelector = selector<OrderPolicy>({
  key: 'orderPolicySelector',
  get: async () => {
    const orderPolicy = await fetchData('/order-policy');

    return orderPolicy;
  },
});

export const useFetchOrderPolicy = () => useRecoilValue(orderPolicySelector);
