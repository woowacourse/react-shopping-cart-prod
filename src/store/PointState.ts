import { atom } from 'recoil';

const PointState = atom({
  key: 'pointState',
  default: 3000,
});

export default PointState;
