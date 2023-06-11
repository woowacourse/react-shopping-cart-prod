import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';

import { RECOIL_KEY } from '@constants/index';

interface ApiUrlMappings {
  MSW: string;
  이리내: string;
  채채: string;
  [key: string]: string;
}

const apiUrlMappings: ApiUrlMappings = {
  MSW: '',
  이리내: process.env.REACT_APP_API_IRINAE!,
  채채: process.env.REACT_APP_API_CHACHA!,
};

const baseApiUrlState = atom({
  key: RECOIL_KEY.API_BASE_URL_STATE,
  default: process.env.REACT_APP_API_DEFAULT!,
});

export const baseApiUrlSelector = selector({
  key: RECOIL_KEY.API_BASE_URL_SELECTOR,
  get: ({ get }) => {
    const urlState = get(baseApiUrlState);

    return apiUrlMappings[urlState];
  },
});

export const useBaseApiUrlState = () => useRecoilState(baseApiUrlState);

export const useBaseApiUrlValue = () => useRecoilValue(baseApiUrlSelector);
