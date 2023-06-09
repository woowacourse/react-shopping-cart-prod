import { atom } from 'recoil';

const memberState = atom({
  key: 'memberState',
  default: {
    id: 0,
    email: '',
    money: 0,
    point: 0,
  },
});

export default memberState;
