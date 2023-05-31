import { selector } from "recoil";
import { LocalProductType } from "../types/domain";
import { localProductsState, selectedProductsState } from "./atom";
import { MIN_QUANTITY } from "../constants";

export const localProductsSelector = selector<LocalProductType[]>({
  key: "localProductsSelector",
  get: ({ get }) =>
    get(localProductsState).filter(
      (localProduct: LocalProductType) => localProduct.quantity !== MIN_QUANTITY
    ),
});

export const cartNumberSelector = selector<number>({
  key: "cartNumberSelector",
  get: ({ get }) => get(localProductsSelector).length,
});

export const totalPriceSelector = selector<number>({
  key: "totalPriceSelector",
  get: ({ get }) =>
    get(selectedProductsState).reduce(
      (accumulator: number, currentValue) =>
        accumulator + currentValue.price * currentValue.quantity,
      0
    ),
});

export const selectedCartItemIdsSelector = selector<number[]>({
  key: "selectedCartItemIdsSelector",
  get: ({ get }) =>
    get(selectedProductsState).map((product) => product.cartItemId),
});
