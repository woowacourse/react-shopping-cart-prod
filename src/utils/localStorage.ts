import { AtomEffect } from 'recoil';

export const getLocalStorage = <T>(key: string, initialValue: T): T => {
  const item = localStorage.getItem(key);

  return item ? (JSON.parse(item) as T) : initialValue;
};

export const setLocalStorage = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const localStorageEffect: <T>(key: string) => AtomEffect<T> =
  (key: string) =>
  ({ setSelf, onSet }) => {
    const savedValue = getLocalStorage(key, null);

    if (savedValue) setSelf(savedValue);

    onSet((newValue) => {
      setLocalStorage(key, newValue);
    });
  };
