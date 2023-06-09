import { atom, selector } from "recoil";
import {
  LocalProductType,
  ProductType,
  ToastType,
  MemberType,
} from "../types/domain";
import { api } from "../api";
import { makeLocalProducts, makeProducts } from "../utils/domain";
import { getLocalStorage } from "../utils";
import {
  DEFAULT_VALUE_LOGIN_TOKEN,
  KEY_LOCALSTORAGE_LOGIN_TOKEN,
} from "../constants";
import { localStorageEffect } from "./effect";

export const productsState = atom<ProductType[]>({
  key: "products",
  default: selector<ProductType[]>({
    key: "initialProducts/default",
    get: () => {
      return api.get("/products");
    },
  }),
});

export const localProductsState = atom<LocalProductType[]>({
  key: "localProducts",
  default: selector<LocalProductType[]>({
    key: "products/default",
    get: ({ get }) => {
      return get(loginState) ? makeLocalProducts() : makeProducts();
    },
  }),
});

export const selectedProductsState = atom<LocalProductType[]>({
  key: "selectedProducts",
  default: [],
  effects: [localStorageEffect("orderProducts")],
});

export const toastState = atom<ToastType>({
  key: "toastState",
  default: {
    type: "success",
    isShown: false,
    message: "",
  },
});

export const loginState = atom<boolean>({
  key: "loginState",
  default:
    getLocalStorage(KEY_LOCALSTORAGE_LOGIN_TOKEN, DEFAULT_VALUE_LOGIN_TOKEN) &&
    true,
});

export const memberState = atom<MemberType>({
  key: "memberState",
  default: selector<MemberType>({
    key: "memberState/default",
    get: async ({ get }) => {
      if (get(loginState)) {
        return await api.get("/members/profile");
      }
    },
  }),
});
