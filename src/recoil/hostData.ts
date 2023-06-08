import { atom, selector } from 'recoil';
import { HostNameType } from '../types/server';
import { cartApi } from '../apis/cartProducts';
import { orderApi } from '../apis/orderProducts';

export const hostNameAtom = atom<HostNameType>({
  key: 'hostNameState',
  default: '도기',
});

export const cartApiAtom = selector({
  key: 'cartApiInstance',
  get: ({ get }) => {
    const hostName = get(hostNameAtom);
    return cartApi(hostName);
  },
});

export const orderApiAtom = selector({
  key: 'orderApiInstance',
  get: ({ get }) => {
    const hostName = get(hostNameAtom);
    return orderApi(hostName);
  },
});
