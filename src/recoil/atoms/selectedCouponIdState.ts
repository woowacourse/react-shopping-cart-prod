import { atom } from 'recoil';

const selectedCouponIdState = atom<null | number>({
  key: 'selectedCouponIdState',
  default: null,
});

export default selectedCouponIdState;
