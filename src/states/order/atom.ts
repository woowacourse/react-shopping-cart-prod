import { atom } from 'recoil';
import { orderSelector } from './selector';

export const orderState = atom({
  key: 'orderState',
  default: orderSelector,
});
