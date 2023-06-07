import { AtomEffect, atom } from 'recoil';
import { LocalProduct } from '../types/domain';
import { DEFAULT_VALUE_SERVER_OWNER, KEY_LOCALSTORAGE_SERVER_OWNER } from '../constants';

const localStorageEffect: <T>(key: string) => AtomEffect<T> =
  (key: string) =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue !== null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue, _, isReset) => {
      if (isReset) return localStorage.removeItem(key);

      return localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const serverOwnerState = atom<string>({
  key: 'serverOwner',
  default: DEFAULT_VALUE_SERVER_OWNER,
  effects: [localStorageEffect<string>(KEY_LOCALSTORAGE_SERVER_OWNER)],
});

export const localProductsState = atom<LocalProduct[]>({
  key: 'localProducts',
  default: [],
});

export const selectedProductsState = atom<LocalProduct[]>({
  key: 'selectedProducts',
  default: [],
});
