import { selector } from 'recoil';
import pointQuery from '../queries/pointQuery';

const pointState = selector({
  key: 'pointState',
  get: ({ get }) => {
    return get(pointQuery);
  },
});

export default pointState;
