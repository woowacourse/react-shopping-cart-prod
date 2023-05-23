import { selector } from "recoil";
import { LocalProductType } from "../types/domain";
import { localProductsState } from "./atom";
import { MIN_QUANTITY } from "../constants";

export const cartProductsSelector = selector<LocalProductType[]>({
  key: "cartProducts",
  get: ({ get }) => {
    return get(localProductsState).filter(
      (localProduct: LocalProductType) => localProduct.quantity !== MIN_QUANTITY
    );
  },
});
