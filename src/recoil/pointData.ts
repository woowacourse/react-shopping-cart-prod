import type { PointType } from '../types/point';

import { atom, selector } from 'recoil';
import { api } from '../apis/order';
import { hostNameAtom } from './hostData';

export const userPointAtom = atom<PointType>({
  key: 'userPointatom',
  default: selector({
    key: 'userPointState/Default',
    get: async ({ get }) => {
      const hostName = get(hostNameAtom);
      const response = await (await api(hostName)).getPoints();

      return response;
    },
  }),
});
