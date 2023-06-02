import { atom, useRecoilValue } from 'recoil';
import { base64 } from '../../constants/user';
import { APIAtom } from './serverAtom';

interface Point {
  point: number;
}

export const pointState = atom<Point>({
  key: 'pointState',
  default: { point: 0 },
  effects: [
    ({ setSelf, trigger }) => {
      const apiEndPoint = useRecoilValue(APIAtom);
      const getPoint = async () => {
        const response = await fetch(`${apiEndPoint}/point`, {
          method: 'GET',
          headers: {
            Authorization: `Basic ${base64}`,
          },
        });
        const point = await response.json();

        setSelf(point ?? 0);
      };

      if (trigger === 'get') getPoint();
    },
  ],
});
