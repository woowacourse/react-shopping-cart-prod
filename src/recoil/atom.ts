/* eslint-disable @typescript-eslint/return-await */
import { atom, atomFamily } from 'recoil';
import { USER } from 'src/constants';
import userServerUrlList from 'src/data/serverData';
import { getLocalStorage } from 'src/utils/localStorage';
import type { CartItem, ToastState } from 'src/types';

const getCart = async (url: string) => {
  const response = await fetch(`${url}/cart-items`, {
    headers: {
      Authorization: `Basic ${btoa(USER)}`,
    },
  });

  if (!response.ok) return [];
  const data = (await response.json()) as CartItem[];

  return data;
};

export const $CheckedCartIdList = atomFamily<number[], string>({
  key: 'CheckedCartIdList',
  default: async url => (await getCart(url)).map(({ id }) => id),
});

export const $ToastStateList = atom<ToastState[]>({
  key: 'ToastMessageList',
  default: [],
});

export const $CurrentServerUrl = atom<string>({
  key: 'CurrentServerUrl',
  default: userServerUrlList[getLocalStorage('name', 'msw')],
});

export const $CartList = atomFamily<CartItem[], string>({
  key: 'CartList',
  default: async url => await getCart(url),
});

export const $ModalState = atom({
  key: 'ModalState',
  default: false,
});
