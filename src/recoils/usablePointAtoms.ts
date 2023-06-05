import { fetchAPI } from '@api/fetchAPI';
import { selector, useRecoilValue } from 'recoil';
import { baseApiUrlSelector } from './baseApiUrlAtoms';

export const usablePointSelector = selector<number>({
  key: 'usablePointSelector',
  get: async ({ get }) => {
    const baseApiUrl = get(baseApiUrlSelector);
    const { usablePoint } = await fetchAPI(`${baseApiUrl}/point`, {
      headers: {
        Authorization: `Basic ${btoa(process.env.REACT_APP_API_CREDENTIAL!)}`,
      },
    });

    return usablePoint;
  },
});

export const useFetchUsablePoint = () => useRecoilValue(usablePointSelector);
