import { atom, selector } from 'recoil';
import { HostNameType } from '../types/server';
import { cartApi } from '../apis/cartProducts';

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
