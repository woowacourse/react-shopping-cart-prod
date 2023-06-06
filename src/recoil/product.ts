import { atom, selector } from "recoil";
import { Product } from "types/domain";
import { getProducts } from "api/products";
import { serverSelectState } from "./server";

const getProductList = selector<Product[]>({
  key: "getProductList",
  get: async ({ get }) => {
    const selectedServer = get(serverSelectState);

    const products = await getProducts(selectedServer);

    return products;
  },
});

export const productListState = atom<Product[]>({
  key: "productList",
  default: getProductList,
});
