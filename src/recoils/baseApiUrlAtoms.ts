import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';

import { RECOIL_KEY } from '@constants/index';

const baseApiUrlState = atom({
  key: RECOIL_KEY.API_BASE_URL_STATE,
  default: process.env.REACT_APP_API_DEFAULT,
});

export const baseApiUrlSelector = selector({
  key: 'apiUrlSelector',
  get: ({ get }) => {
    const urlState = get(baseApiUrlState);
    if (urlState === 'MSW') return '';

    if (urlState === '이리내') return process.env.REACT_APP_API_IRINAE;

    if (urlState === '채채') return process.env.REACT_APP_API_CHACHA;
  },
});

export const useBaseApiUrlState = () => useRecoilState(baseApiUrlState);

export const useBaseApiUrlValue = () => useRecoilValue(baseApiUrlSelector);
