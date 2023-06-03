import { AtomEffect } from "recoil";
import {
  getLocalStorage,
  getSessionStorage,
  setLocalStorage,
  setSessionStorage,
} from "../utils/storage.ts";

export const localStorageEffect: <T>(key: string) => AtomEffect<T> =
  (key: string) =>
  ({ setSelf, onSet }) => {
    const savedValue = getLocalStorage(key, null);

    if (savedValue) setSelf(savedValue);

    onSet((newValue) => {
      setLocalStorage(key, newValue);
    });
  };

export const sessionStorageEffect: <T>(key: string) => AtomEffect<T> =
  (key: string) =>
  ({ setSelf, onSet }) => {
    const savedValue = getSessionStorage(key, null);

    if (savedValue) setSelf(savedValue);

    onSet((newValue) => {
      setSessionStorage(key, newValue);
    });
  };
