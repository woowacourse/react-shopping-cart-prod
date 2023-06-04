import { fetchAPI } from '@api/fetchAPI';
import { selector, useRecoilValue } from 'recoil';

export const usablePointSelector = selector<number>({
  key: 'usablePointSelector',
  get: async () => {
    const { usablePoint } = await fetchAPI('/point', {
      headers: {
        Authorization: `Basic ${btoa(process.env.REACT_APP_API_CREDENTIAL!)}`,
      },
    });

    return usablePoint;
  },
});

export const useFetchUsablePoint = () => useRecoilValue(usablePointSelector);
