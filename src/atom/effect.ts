import type { AtomEffect } from 'recoil';

export const localStorageEffect: <T>(key: string) => AtomEffect<T> =
  (key) =>
  ({ setSelf, onSet }) => {
    const serverName = localStorage.getItem(key);
    if (serverName != null) {
      setSelf(JSON.parse(serverName));
    }

    onSet((newValue, _, isReset) => {
      isReset ? localStorage.removeItem(key) : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };
