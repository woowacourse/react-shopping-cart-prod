import { atom, selector } from "recoil";
import { LocalProductType, ProductType } from "../types/domain";
import { fetchProducts } from "../api";
import { makeLocalProducts } from "../utils/domain";
import { SERVERS } from "../constants";

export const productsState = atom<ProductType[]>({
  key: "products",
  default: selector<ProductType[]>({
    key: "initialProducts/default",
    get: async ({ get }) => {
      try {
        const response = await fetchProducts(get(serverOwnerState));

        if (!response.ok) throw new Error(response.status.toString());

        return await response.json();
      } catch (error) {
        console.log(error);
      }
    },
  }),
});

export const localProductsState = atom<LocalProductType[]>({
  key: "localProducts",
  default: selector<LocalProductType[]>({
    key: "products/default",
    get: ({ get }) => {
      return makeLocalProducts(get(productsState), get(serverOwnerState));
    },
  }),
});

export const selectedProductsState = atom<LocalProductType[]>({
  key: "selectedProducts",
  default: [],
});

export const serverOwnerState = atom<string>({
  key: "serverOwner",
  default: "루카",
});
