import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { localStorageEffect } from './localStorageEffect';

export const OrderDetailState = atom<number>({
  key: 'orderDetailState',
  default: 0,
  effects: [localStorageEffect('orderDetailNumber')],
});

export const useOrderDetailState = () => useRecoilState(OrderDetailState);

export const useOrderDetailValue = () => useRecoilValue(OrderDetailState);

export const useSetOrderDetail = () => useSetRecoilState(OrderDetailState);
