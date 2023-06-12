import {
  atom,
  selector,
  useRecoilRefresher_UNSTABLE,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
} from "recoil";
import type { CartItemType } from "../../../types/ProductType";

import serverUrlState from "@recoil/server/serverUrlState";

import generateFetchCart from "../remote/generateFetchCart";
import credentialState from "@recoil/server/credentialState";

import { CART_PATH } from "@constants/urlConstants";

const cartRefresher = atom({
  key: "cartRefresher",
  default: 0,
});

const cartQuery = selector({
  key: "cartState/default",
  get: async ({ get }) => {
    get(cartRefresher);
    const serverUrl = get(serverUrlState);
    const credential = get(credentialState);
    const fetchCart = generateFetchCart({
      resource: `${serverUrl}/${CART_PATH}`,
      credential,
    });

    const response = await fetchCart.GET();
    if (!response.ok) throw Error();

    const cartProducts: CartItemType[] = await response.json();

    return cartProducts.map((cartProduct) => {
      cartProduct.checked = true;
      return cartProduct;
    });
  },

  cachePolicy_UNSTABLE: {
    eviction: "most-recent",
  },
});

export const cartState = atom<CartItemType[]>({
  key: "cartState",
  default: cartQuery,
});

export const cartTotalPrice = selector({
  key: "cartTotalPrice",
  get: ({ get }) => {
    return get(cartState).reduce((totalPrice, cartItem) => {
      return cartItem.checked
        ? totalPrice + cartItem.product.price * cartItem.quantity
        : totalPrice;
    }, 0);
  },
});

export default cartState;

export const useTotalPrice = () => useRecoilValue(cartTotalPrice);

export const useResetCart = () => useResetRecoilState(cartState);

export const useRefreshCart = () => {
  const resetCart = useResetRecoilState(cartState);
  const [refreshCount, setRefresher] = useRecoilState(cartRefresher);

  return () => {
    resetCart();
    setRefresher(refreshCount + 1);
  };
};
