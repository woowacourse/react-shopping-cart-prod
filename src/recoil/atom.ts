import { atom, selector } from "recoil";
import { LocalProductType, ProductType } from "../types/domain";
import { fetchProducts } from "../api";
import { makeLocalProducts } from "../utils/domain";

export const productsState = atom<ProductType[]>({
  key: "products",
  default: selector<ProductType[]>({
    key: "initialProducts/default",
    get: async () => {
      const data = await fetchProducts();
      return data;
    },
  }),
});

export const localProductsState = atom<LocalProductType[]>({
  key: "localProducts",
  default: selector<LocalProductType[]>({
    key: "products/default",
    get: async ({ get }) => {
      return await makeLocalProducts(get(productsState));
    },
  }),
});

export const selectedProductsState = atom<LocalProductType[]>({
  key: "selectedProducts",
  default: [],
});
