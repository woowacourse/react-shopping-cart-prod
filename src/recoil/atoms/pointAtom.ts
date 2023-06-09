import { atom, selector } from 'recoil';
import { base64 } from '../../constants/user';
import { APIAtom } from './serverAtom';

export const pointSelector = selector({
  key: 'pointSelector',
  get: async ({ get }) => {
    const apiEndPoint = get(APIAtom);
    const response = await fetch(`${apiEndPoint}/point`, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${base64}`,
      },
    });
    const point = await response.json();

    return point.point ? Number(point.point) : 0;
  },
});

export const pointState = atom<number>({
  key: 'pointState',
  default: 0,
});
