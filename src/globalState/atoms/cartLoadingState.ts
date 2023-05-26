import { atom } from 'recoil';

const cartLoadingState = atom({
  key: 'cartLoadingState',
  default: false,
});

export default cartLoadingState;
