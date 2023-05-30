import { atom } from 'recoil';
import { base64 } from '../../constants/user';
import { getPoint } from '../../utils/localStorage';

export interface Point {
  point: number;
}

export const pointState = atom<Point>({
  key: 'pointState',
  default: getPoint(),
});
