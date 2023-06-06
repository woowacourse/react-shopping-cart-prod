import { atom } from 'recoil';

type OrderId = number | null;

export const selectedOrderIdState = atom<OrderId>({
  key: 'selectedOrderIdState',
  default: null,
});
