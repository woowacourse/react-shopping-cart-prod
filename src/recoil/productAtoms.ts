import { selector } from "recoil";
import type { ProductItem } from "../types/types";
import { fetchProductList } from "../api/api";
import { serverState } from "./serverAtom";

export const productListSelector = selector<ProductItem[]>({
  key: "productListSelector",
  get: async ({ get }) => {
    const server = get(serverState);
    const productList = await fetchProductList(server);
    return productList;
  },
});
