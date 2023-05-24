import { atom, selector } from 'recoil';
import type { CartItem, ToastState } from '../types';

export const $CheckedCartIdList = atom<number[]>({
  key: 'CheckStateList',
  default: [],
});

export const $CartIdList = atom<number[]>({
  key: 'CartIdList',
  default: selector({
    key: 'CatIdListSelector',
    get: async ({ get }) => {
      const currentUrl = get($CurrentServerUrl);
      const response = await fetch(`${currentUrl}/cart-items`, {
        headers: {
          Authorization: `Basic ${btoa('a@a.com:1234')}`,
        },
      });

      if (!response.ok) return [];
      const data = (await response.json()) as CartItem[];

      return data.map(item => item.id);
    },
  }),
});

export const $ToastStateList = atom<ToastState[]>({
  key: 'ToastMessageList',
  default: [],
});

export const $CurrentServerUrl = atom<string>({
  key: 'CurrentServerUrl',
  default: process.env.REACT_APP_SERVER_BASE_URL_LOGI,
});
