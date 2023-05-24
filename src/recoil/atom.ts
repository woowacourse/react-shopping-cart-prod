import { atom, atomFamily } from 'recoil';
import type { CartItem, ToastState } from '../types';

const getCartIds = async (url: string) => {
  const response = await fetch(`${url}/cart-items`, {
    headers: {
      Authorization: `Basic ${btoa('a@a.com:1234')}`,
    },
  });

  if (!response.ok) return [];
  const data = (await response.json()) as CartItem[];

  return data.map(item => item.id);
};

export const $CheckedCartIdList = atomFamily<number[], string>({
  key: 'CheckedCartIdList',
  default: async url => await getCartIds(url),
});

export const $CartIdList = atomFamily<number[], string>({
  key: 'CartIdList',
  default: async url => await getCartIds(url),
});

export const $ToastStateList = atom<ToastState[]>({
  key: 'ToastMessageList',
  default: [],
});

export const $CurrentServerUrl = atom<string>({
  key: 'CurrentServerUrl',
  default: process.env.REACT_APP_SERVER_BASE_URL_LOGI,
});
