import { fetchData } from '@api/fetchData';
import { selector, useRecoilValue } from 'recoil';

import type { UsablePoint } from '../types';

export const usablePointSelector = selector<UsablePoint>({
  key: 'orderPolicySelector',
  get: async () => {
    const usablePoint = await fetchData('/point', {
      headers: {
        Authorization: `Basic ${btoa(process.env.REACT_APP_API_CREDENTIAL!)}`,
      },
    });

    return usablePoint;
  },
});

export const useFetchUsablePoint = () => useRecoilValue(usablePointSelector);
