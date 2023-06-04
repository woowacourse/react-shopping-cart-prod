import { atom } from "recoil";
import { LocalProductType } from "../types/domain";

export const localProductsState = atom<LocalProductType[]>({
  key: "localProducts",
  default: [],
});

export const selectedProductsState = atom<LocalProductType[]>({
  key: "selectedProducts",
  default: [],
});
