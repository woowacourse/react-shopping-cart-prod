import type { Point } from '../types/point';

import { atom, selector } from 'recoil';
import { api } from '../apis/point';
import { hostNameAtom } from './hostData';

export const userPointAtom = atom<Point>({
  key: 'userPointatom',
  default: selector({
    key: 'userPointState/Default',
    get: async ({ get }) => {
      const hostName = get(hostNameAtom);
      const response = api(hostName).then((apiInstance) => {
        return apiInstance.getPoints();
      });
      return response;
    },
  }),
});
