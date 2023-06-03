import { atom } from 'recoil';

const pointState = atom({
  key: 'pointState',
  default: 0,
});

export default pointState;
