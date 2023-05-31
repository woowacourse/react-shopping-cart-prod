import { selector } from 'recoil';
import { fetchPoint } from '../../remotes/point';
import { serverOriginState } from '../atoms/common';
import { POINT_BASE_URL } from '../../constants/api';

export const pointQuery = selector<number>({
  key: 'point',
  get: async ({ get }) => {
    const point = await fetchPoint(
      `${get(serverOriginState)}${POINT_BASE_URL}`,
    );

    return point;
  },
});
