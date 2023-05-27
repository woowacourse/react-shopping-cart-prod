import type { AtomEffect } from 'recoil';

export const localStorageEffect: <T>(key: string) => AtomEffect<T> =
  (key) =>
  ({ setSelf, onSet }) => {
    const storageValue = localStorage.getItem(key);
    if (storageValue != null) {
      setSelf(JSON.parse(storageValue));
    }

    onSet((newValue, _, isReset) => {
      isReset ? localStorage.removeItem(key) : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };
