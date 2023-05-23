import { selector } from "recoil";
import type { ProductItem } from "../types/types";
import { fetchProductList } from "../api/api";

export const productListSelector = selector<ProductItem[]>({
  key: "productListSelector",
  get: async () => {
    const productList = await fetchProductList("");
    return productList;
  },
});
