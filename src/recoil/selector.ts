import { selector } from "recoil";
import { LocalProductType } from "../types/domain";
import { localProductsState } from "./atom";
import { MIN_QUANTITY } from "../constants";

export const localProductsSelector = selector<LocalProductType[]>({
  key: "localProductsSelector",
  get: ({ get }) => {
    return get(localProductsState).filter(
      (localProduct: LocalProductType) => localProduct.quantity !== MIN_QUANTITY
    );
  },
});
