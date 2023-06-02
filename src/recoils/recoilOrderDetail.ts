import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

export const OrderDetailState = atom<number>({
  key: 'orderDetailState',
  default: 0,
});

export const useOrderDetailState = () => useRecoilState(OrderDetailState);

export const useOrderDetailValue = () => useRecoilValue(OrderDetailState);

export const useSetOrderDetail = () => useSetRecoilState(OrderDetailState);
