import { AtomEffect, atom } from "recoil";
import { LocalProductType } from "../types/domain";

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
  key: "serverOwner",
  default: "애쉬",
  effects: [localStorageEffect<string>("owner")],
});

export const localProductsState = atom<LocalProductType[]>({
  key: "localProducts",
  default: [],
});

export const selectedProductsState = atom<LocalProductType[]>({
  key: "selectedProducts",
  default: [],
});
