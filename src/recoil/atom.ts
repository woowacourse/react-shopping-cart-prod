import { atom, selector } from "recoil";
import { LocalProductType, ProductType } from "../types/domain";
import { fetchProducts } from "../api";
import { makeLocalProducts } from "../utils/domain";

export const productsState = atom<ProductType[]>({
  key: "products",
  default: selector<ProductType[]>({
    key: "initialProducts/default",
    get: async () => {
      const response = await fetchProducts();
      if (!response.ok) throw new Error(response.status.toString());
      return await response.json();
    },
  }),
});

export const localProductsState = atom<LocalProductType[]>({
  key: "localProducts",
  default: selector<LocalProductType[]>({
    key: "products/default",
    get: () => makeLocalProducts(),
  }),
});

export const selectedProductsState = atom<LocalProductType[]>({
  key: "selectedProducts",
  default: [],
});
