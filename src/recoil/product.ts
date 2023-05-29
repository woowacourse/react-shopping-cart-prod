import { atom, selector, selectorFamily } from "recoil";
import { Product } from "types/domain";
import { getProducts } from "api/products";
import { serverSelectState } from "./server";

const getProductList = selector<Product[]>({
  key: "getProductList",
  get: async ({ get }) => {
    const selectedServer = get(serverSelectState);

    const products = await getProducts(selectedServer);

    if (!products) {
      alert("상품 정보 불러오기 실패!");
      return [];
    }

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
