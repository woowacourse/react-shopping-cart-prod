import { selector } from "recoil";
import type { ProductItem } from "../../types/types.ts";
import { fetchProductList } from "../api/api.ts";
import { serverState } from "./serverAtom.ts";

export const productListSelector = selector<ProductItem[]>({
  key: "productListSelector",
  get: async ({ get }) => {
    const server = get(serverState);
    const productList = await fetchProductList(server);
    return productList;
  },
});
