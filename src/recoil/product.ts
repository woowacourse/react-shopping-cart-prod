import { atom, selector, selectorFamily } from "recoil";
import { Product } from "api/products";
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

export const productSelector = selectorFamily<Product, number>({
  key: "productSelector",
  get:
    (id) =>
    ({ get }) =>
      get(productListState).find((product) => product.id === id)!,
});
