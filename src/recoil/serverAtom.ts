import { AtomEffect, atom } from "recoil";
import { getLocalStorage, setLocalStorage } from "../utils/localStorage";

const localStorageEffect: <T>(key: string) => AtomEffect<T> =
  (key: string) =>
    ({ setSelf, onSet }) => {
      const savedValue = getLocalStorage(key, null);

      if (savedValue) setSelf(savedValue);

      onSet((newValue) => {
        setLocalStorage(key, newValue);
      });
    };

export const serverState = atom<string>({
  key: "serverState",
  default: "테스트",
  effects: [localStorageEffect<string>('server')],
});
