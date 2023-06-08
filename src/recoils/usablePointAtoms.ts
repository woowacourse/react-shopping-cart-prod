import { selector, useRecoilValue } from 'recoil';

import { fetchAPI } from '@api/fetchAPI';
import { baseApiUrlSelector } from './baseApiUrlAtoms';

import { FETCH_URL, RECOIL_KEY } from '@constants/index';

export const usablePointSelector = selector<number>({
  key: RECOIL_KEY.USABLE_POINT_SELECTOR,
  get: async ({ get }) => {
    const baseApiUrl = get(baseApiUrlSelector);
    const { usablePoint } = await fetchAPI(baseApiUrl + FETCH_URL.POINT, {
      headers: {
        Authorization: `Basic ${btoa(process.env.REACT_APP_API_CREDENTIAL!)}`,
      },
    });

    return usablePoint;
  },
});

export const useFetchUsablePoint = () => useRecoilValue(usablePointSelector);
