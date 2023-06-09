import { atom, useRecoilState } from 'recoil';
import { RegisterOrderType } from '../types';
import { localStorageEffect } from './localStorageEffect';

export const OrderState = atom<RegisterOrderType>({
  key: 'registerOrderState',
  default: {
    totalProductsPrice: 0,
    shippingFee: 0,
    usedPoint: 0,
    order: [],
  },
  effects: [localStorageEffect('registerOrder')],
});

export const useRegisterOrderState = () => useRecoilState(OrderState);
